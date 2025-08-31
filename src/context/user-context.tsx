
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

// Types
export interface BankDetails {
    bankName: string;
    accountNumber: string;
    holderName: string;
    phone: string;
    ifsc: string;
}

export interface UpiDetails {
    holderName: string;
    upiId: string;
}


export interface UserData {
    uid: string;
    email: string | null;
    phone: string | null;
    password?: string;
    nickname: string;
    avatar: string | null;
    balance: number;
    thirdPartyBalance: number;
    experience: number;
    usedCodes: string[];
    claimedLevels: number[];
    lastMonthlyClaim: number | null;
    totalDepositAmount: number;
    totalWithdrawalAmount: number;
    invitees: Invitees;
    claimedInvitationBonuses: number[];
    blocked: boolean;
    hasDeposited: boolean;
    bankDetails: BankDetails | null;
    upiDetails: UpiDetails | null;
}

export interface ExpHistoryItem {
    title: string;
    type: string;
    date: string;
    amount: string;
}

interface Invitees {
    count: number;
    rechargedCount: number;
}

interface UserContextType {
  uid: string | null;
  email: string | null;
  nickname: string;
  setNickname: (name: string) => void;
  avatar: string | null;
  setAvatar: (url: string | null) => void;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  thirdPartyBalance: number;
  transferToMainWallet: () => void;
  experience: number;
  addExperience: (amount: number, reason: string) => void;
  usedCodes: string[];
  addUsedCode: (code: string) => void;
  redeemGlobalCode: (code: string) => void;
  hasClaimedLevel: (level: number) => boolean;
  addClaimedLevel: (level: number) => void;
  expHistory: ExpHistoryItem[];
  lastMonthlyClaim: number | null;
  claimMonthlyReward: () => void;
  totalDepositAmount: number;
  addDepositAmount: (amount: number) => void;
  totalWithdrawalAmount: number;
  addWithdrawalAmount: (amount: number) => void;
  invitees: Invitees;
  claimedInvitationBonuses: number[];
  addClaimedInvitationBonus: (tierId: number) => void;
  isBlocked: boolean;
  blockUser: (uid: string) => void;
  unblockUser: (uid: string) => void;
  login: (identifier: string, password?: string) => 'success' | 'blocked' | 'not_found';
  logout: () => void;
  hasDeposited: boolean;
  markAsDeposited: () => void;
  bankDetails: BankDetails | null;
  upiDetails: UpiDetails | null;
  saveBankDetails: (details: BankDetails) => void;
  saveUpiDetails: (details: UpiDetails) => void;
  verifyPassword: (password: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const loadFromLocalStorage = (key: string, defaultValue: any) => {
    if (typeof window === 'undefined') return defaultValue;
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const saveToLocalStorage = (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
};


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [nickname, setNickname] = useState('Gamer');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [balance, setBalance] = useState(0);
    const [thirdPartyBalance, setThirdPartyBalance] = useState(0);
    const [experience, setExperience] = useState(0);
    const [usedCodes, setUsedCodes] = useState<string[]>([]);
    const [claimedLevels, setClaimedLevels] = useState<number[]>([]);
    const [expHistory, setExpHistory] = useState<ExpHistoryItem[]>([]);
    const [lastMonthlyClaim, setLastMonthlyClaim] = useState<number | null>(null);
    const [totalDepositAmount, setTotalDepositAmount] = useState(0);
    const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState(0);
    const [invitees, setInvitees] = useState<Invitees>({ count: 0, rechargedCount: 0 });
    const [claimedInvitationBonuses, setClaimedInvitationBonuses] = useState<number[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isBlocked, setIsBlocked] = useState(false);
    const [hasDeposited, setHasDeposited] = useState(false);
    const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
    const [upiDetails, setUpiDetails] = useState<UpiDetails | null>(null);

    const clearLocalStorage = () => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('user-')) {
                localStorage.removeItem(key);
            }
        });
    };
    
    const loadUser = (user: UserData) => {
        setUid(user.uid);
        setEmail(user.email);
        setNickname(user.nickname);
        setAvatar(user.avatar);
        setBalance(user.balance);
        setThirdPartyBalance(user.thirdPartyBalance);
        setExperience(user.experience);
        setUsedCodes(user.usedCodes);
        setClaimedLevels(user.claimedLevels);
        setLastMonthlyClaim(user.lastMonthlyClaim);
        setTotalDepositAmount(user.totalDepositAmount);
        setTotalWithdrawalAmount(user.totalWithdrawalAmount);
        setInvitees(user.invitees);
        setClaimedInvitationBonuses(user.claimedInvitationBonuses);
        setIsBlocked(user.blocked);
        setHasDeposited(user.hasDeposited);
        setBankDetails(user.bankDetails || null);
        setUpiDetails(user.upiDetails || null);
    }
    
    useEffect(() => {
        const storedUid = localStorage.getItem('user-uid');
        if (storedUid) {
            const allUsers = loadFromLocalStorage('allUsers', []);
            const currentUser = allUsers.find((u: UserData) => u.uid === storedUid);
            if (currentUser) {
                loadUser(currentUser);
            }
        }
        setIsInitialLoad(false);
    }, []);

    const saveUser = (updatedUser: UserData) => {
        const allUsers = loadFromLocalStorage('allUsers', []);
        const userIndex = allUsers.findIndex((u: UserData) => u.uid === updatedUser.uid);
        if (userIndex !== -1) {
            allUsers[userIndex] = updatedUser;
        } else {
            allUsers.push(updatedUser);
        }
        saveToLocalStorage('allUsers', allUsers);
    };

    const login = useCallback((identifier: string, password = 'password') => {
        const allUsers = loadFromLocalStorage('allUsers', []);
        let existingUser = allUsers.find((u: UserData) => u.email === identifier || u.phone === identifier);

        if(existingUser) {
             if (existingUser.blocked) {
                return 'blocked';
            }
            localStorage.setItem('user-uid', existingUser.uid);
            loadUser(existingUser);
            return 'success';
        } else {
            const newUid = Math.floor(100000 + Math.random() * 900000).toString();
            const isEmail = identifier.includes('@');
            
            const newUser: UserData = {
                uid: newUid,
                email: isEmail ? identifier : null,
                phone: !isEmail ? identifier : null,
                password: password,
                nickname: `User${newUid.substring(0, 4)}`,
                avatar: null,
                balance: 30.00,
                thirdPartyBalance: 0,
                experience: 0,
                usedCodes: [],
                claimedLevels: [1],
                lastMonthlyClaim: null,
                totalDepositAmount: 0,
                totalWithdrawalAmount: 0,
                invitees: { count: 1, rechargedCount: 1 },
                claimedInvitationBonuses: [1],
                blocked: false,
                hasDeposited: false,
                bankDetails: null,
                upiDetails: null,
            };
            
            saveUser(newUser);
            localStorage.setItem('user-uid', newUser.uid);
            loadUser(newUser);
            return 'success';
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user-uid');
        setUid(null);
        setEmail(null);
        setNickname('Gamer');
        setAvatar(null);
        setBalance(0);
        setThirdPartyBalance(0);
        setExperience(0);
        setUsedCodes([]);
        setClaimedLevels([]);
        setExpHistory([]);
        setLastMonthlyClaim(null);
        setTotalDepositAmount(0);
        setTotalWithdrawalAmount(0);
        setInvitees({ count: 0, rechargedCount: 0 });
        setClaimedInvitationBonuses([]);
        setIsBlocked(false);
        setHasDeposited(false);
        setBankDetails(null);
        setUpiDetails(null);
    }, []);

    const verifyPassword = (password: string): boolean => {
        if (!uid) return false;
        const allUsers = loadFromLocalStorage('allUsers', []);
        const currentUser = allUsers.find((u: UserData) => u.uid === uid);
        return currentUser?.password === password;
    };


    const getUserData = (): UserData | null => {
        if(!uid) return null;
        return {
            uid, email, nickname, avatar, balance, thirdPartyBalance, experience, usedCodes, claimedLevels,
            lastMonthlyClaim, totalDepositAmount, totalWithdrawalAmount, invitees, claimedInvitationBonuses, blocked: isBlocked, hasDeposited,
            bankDetails, upiDetails
        };
    };
    
    const updateUser = (updates: Partial<UserData>) => {
        const currentUser = getUserData();
        if(currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            loadUser(updatedUser);
            saveUser(updatedUser);
        }
    };


    const handleSetNickname = (name: string) => updateUser({ nickname: name });
    const handleSetAvatar = (url: string | null) => updateUser({ avatar: url });
    const handleSetBalance = (newBalance: React.SetStateAction<number>) => {
        const value = typeof newBalance === 'function' ? newBalance(balance) : newBalance;
        updateUser({ balance: value });
    };
    const transferToMainWallet = () => {
        updateUser({ balance: balance + thirdPartyBalance, thirdPartyBalance: 0 });
    };
    const addExperience = (amount: number, reason: string) => {
        const newHistoryItem: ExpHistoryItem = {
            title: reason,
            type: "Betting EXP",
            date: new Date().toLocaleString(),
            amount: `+${amount} EXP`
        };
        updateUser({ 
            experience: experience + amount,
        });
        setExpHistory(prev => [newHistoryItem, ...prev]);
    };
    const addUsedCode = (code: string) => updateUser({ usedCodes: [...usedCodes, code] });
    const redeemGlobalCode = (code: string) => {
        const validCodes = loadFromLocalStorage('validGiftCodes', []);
        const updatedCodes = validCodes.filter((c: string) => c.toUpperCase() !== code.toUpperCase());
        saveToLocalStorage('validGiftCodes', updatedCodes);
    };
    const hasClaimedLevel = (level: number) => claimedLevels.includes(level);
    const addClaimedLevel = (level: number) => {
        if (!claimedLevels.includes(level)) {
            updateUser({ claimedLevels: [...claimedLevels, level] });
        }
    }
    const claimMonthlyReward = () => updateUser({ lastMonthlyClaim: Date.now() });
    const addDepositAmount = (amount: number) => {
       updateUser({ 
           totalDepositAmount: totalDepositAmount + amount,
           hasDeposited: true 
        });
    };
    const addWithdrawalAmount = (amount: number) => {
        updateUser({ totalWithdrawalAmount: totalWithdrawalAmount + amount });
    }
    const addClaimedInvitationBonus = (tierId: number) => {
        updateUser({ claimedInvitationBonuses: [...claimedInvitationBonuses, tierId] });
    }
    
    const blockUser = (userUid: string) => {
        const allUsers = loadFromLocalStorage('allUsers', []);
        const updatedUsers = allUsers.map((u: UserData) => u.uid === userUid ? { ...u, blocked: true } : u);
        saveToLocalStorage('allUsers', updatedUsers);
        if (userUid === uid) {
            logout();
        }
    }

    const unblockUser = (userUid: string) => {
        const allUsers = loadFromLocalStorage('allUsers', []);
        const updatedUsers = allUsers.map((u: UserData) => u.uid === userUid ? { ...u, blocked: false } : u);
        saveToLocalStorage('allUsers', updatedUsers);
    }
    const markAsDeposited = () => {
        updateUser({ hasDeposited: true });
    }
    const saveBankDetails = (details: BankDetails) => updateUser({ bankDetails: details });
    const saveUpiDetails = (details: UpiDetails) => updateUser({ upiDetails: details });


    const value = {
        uid, email, nickname, setNickname: handleSetNickname, avatar, setAvatar: handleSetAvatar,
        balance, setBalance: handleSetBalance, thirdPartyBalance, transferToMainWallet, experience, addExperience,
        usedCodes, addUsedCode, redeemGlobalCode, hasClaimedLevel, addClaimedLevel, expHistory,
        lastMonthlyClaim, claimMonthlyReward, totalDepositAmount, addDepositAmount, totalWithdrawalAmount,
        addWithdrawalAmount, invitees, claimedInvitationBonuses, addClaimedInvitationBonus,
        isBlocked, blockUser, unblockUser, login, logout, hasDeposited, markAsDeposited,
        bankDetails, upiDetails, saveBankDetails, saveUpiDetails, verifyPassword
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
