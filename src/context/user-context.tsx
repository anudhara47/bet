
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { app } from '@/lib/firebase'; // Import your Firebase app instance

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
  login: (email: string, password?: string) => Promise<'success' | 'blocked' | 'not_found' | 'error'>;
  register: (email: string, password?: string) => Promise<'success' | 'error'>;
  logout: () => void;
  hasDeposited: boolean;
  markAsDeposited: () => void;
  bankDetails: BankDetails | null;
  upiDetails: UpiDetails | null;
  saveBankDetails: (details: BankDetails) => void;
  saveUpiDetails: (details: UpiDetails) => void;
  verifyPassword: (password: string) => Promise<boolean>;
}

const auth = getAuth(app);
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
    const [currentUser, setCurrentUser] = useState<User | null>(null);
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
    const [isBlocked, setIsBlocked] = useState(false);
    const [hasDeposited, setHasDeposited] = useState(false);
    const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
    const [upiDetails, setUpiDetails] = useState<UpiDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            if (user) {
                const userData = loadFromLocalStorage(`user-${user.uid}`, null);
                if (userData) {
                    loadUser(userData);
                } else {
                    // Create new user profile if it doesn't exist
                    const newUser: UserData = {
                        uid: user.uid,
                        email: user.email,
                        phone: user.phoneNumber,
                        nickname: `User${user.uid.substring(0, 4)}`,
                        avatar: user.photoURL,
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
                    saveToLocalStorage(`user-${user.uid}`, newUser);
                    loadUser(newUser);
                }
            } else {
                setUid(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const saveUser = (userUid: string, updatedData: Partial<UserData>) => {
        const existingData = loadFromLocalStorage(`user-${userUid}`, {});
        const newData = { ...existingData, ...updatedData };
        saveToLocalStorage(`user-${userUid}`, newData);
    };

    const login = async (email: string, password = 'password') => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = loadFromLocalStorage(`user-${user.uid}`, {});
            if (userData.blocked) {
                await signOut(auth);
                return 'blocked';
            }
            loadUser({ ...userData, uid: user.uid, email: user.email });
            return 'success';
        } catch (error) {
            console.error("Login error:", error);
            return 'error';
        }
    };

    const register = async (email: string, password = 'password') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const newUser: UserData = {
                uid: user.uid,
                email: user.email,
                phone: null,
                nickname: `User${user.uid.substring(0, 4)}`,
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
            saveToLocalStorage(`user-${user.uid}`, newUser);
            loadUser(newUser);
            return 'success';
        } catch(error) {
            console.error("Registration error:", error);
            return 'error';
        }
    }


    const logout = async () => {
        await signOut(auth);
        setUid(null);
        setEmail(null);
    };

    const verifyPassword = async (password: string): Promise<boolean> => {
        if (!currentUser || !currentUser.email) return false;
        try {
            await signInWithEmailAndPassword(auth, currentUser.email, password);
            return true;
        } catch (error) {
            return false;
        }
    };


    const updateUser = (updates: Partial<UserData>) => {
        if (uid) {
            const currentData = loadFromLocalStorage(`user-${uid}`, {});
            const updatedData = { ...currentData, ...updates };
            loadUser(updatedData); // Update state
            saveToLocalStorage(`user-${uid}`, updatedData); // Persist to localStorage
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
    
    const blockUser = (userUidToBlock: string) => {
        const allUsers = loadFromLocalStorage('allUsers', []);
        const updatedUsers = allUsers.map((u: UserData) => u.uid === userUidToBlock ? { ...u, blocked: true } : u);
        saveToLocalStorage('allUsers', updatedUsers);
        if (userUidToBlock === uid) {
            logout();
        }
    }

    const unblockUser = (userUidToUnblock: string) => {
        const allUsers = loadFromLocalStorage('allUsers', []);
        const updatedUsers = allUsers.map((u: UserData) => u.uid === userUidToUnblock ? { ...u, blocked: false } : u);
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
        isBlocked, blockUser, unblockUser, login, register, logout, hasDeposited, markAsDeposited,
        bankDetails, upiDetails, saveBankDetails, saveUpiDetails, verifyPassword
    };

    return (
        <UserContext.Provider value={value}>
            {!isLoading && children}
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

    