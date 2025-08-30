
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

// Types
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
  login: (mobile: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

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

    const clearLocalStorage = () => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('user-')) {
                localStorage.removeItem(key);
            }
        });
    };
    
    // Load from localStorage on initial render
    useEffect(() => {
        const storedUid = localStorage.getItem('user-uid');
        if (storedUid) {
            setUid(storedUid);
            setEmail(localStorage.getItem('user-email'));
            setNickname(localStorage.getItem('user-nickname') || 'Gamer');
            setAvatar(localStorage.getItem('user-avatar'));
            setBalance(parseFloat(localStorage.getItem('user-balance') || '0'));
            setThirdPartyBalance(parseFloat(localStorage.getItem('user-third-party-balance') || '0'));
            setExperience(parseInt(localStorage.getItem('user-experience') || '0', 10));
            setUsedCodes(JSON.parse(localStorage.getItem('user-used-codes') || '[]'));
            setClaimedLevels(JSON.parse(localStorage.getItem('user-claimed-levels') || '[]'));
            setExpHistory(JSON.parse(localStorage.getItem('user-exp-history') || '[]'));
            setLastMonthlyClaim(JSON.parse(localStorage.getItem('user-last-monthly-claim') || 'null'));
            setTotalDepositAmount(parseFloat(localStorage.getItem('user-total-deposit') || '0'));
            setTotalWithdrawalAmount(parseFloat(localStorage.getItem('user-total-withdrawal') || '0'));
            setInvitees(JSON.parse(localStorage.getItem('user-invitees') || '{"count":0, "rechargedCount":0}'));
            setClaimedInvitationBonuses(JSON.parse(localStorage.getItem('user-claimed-invitation-bonuses') || '[]'));
        }
        setIsInitialLoad(false);
    }, []);

    const login = useCallback((mobile: string) => {
        const newUid = Math.floor(100000 + Math.random() * 900000).toString();
        const newNickname = `User${newUid.substring(0, 4)}`;
        const newEmail = `${newNickname}@example.com`;
        
        localStorage.setItem('user-uid', newUid);
        setUid(newUid);
        
        localStorage.setItem('user-email', newEmail);
        setEmail(newEmail);

        localStorage.setItem('user-nickname', newNickname);
        setNickname(newNickname);
        
        // Reset other fields to default for a new user
        setAvatar(null);
        localStorage.removeItem('user-avatar');
        setBalance(305.77);
        localStorage.setItem('user-balance', '305.77');
        setThirdPartyBalance(150.00);
        localStorage.setItem('user-third-party-balance', '150.00');
        setExperience(0);
        localStorage.setItem('user-experience', '0');
        setUsedCodes([]);
        localStorage.setItem('user-used-codes', '[]');
        setClaimedLevels([]);
        localStorage.setItem('user-claimed-levels', '[]');
        setExpHistory([]);
        localStorage.setItem('user-exp-history', '[]');
        setLastMonthlyClaim(null);
        localStorage.removeItem('user-last-monthly-claim');
        setTotalDepositAmount(0);
        localStorage.setItem('user-total-deposit', '0');
        setTotalWithdrawalAmount(0);
        localStorage.setItem('user-total-withdrawal', '0');
        setInvitees({ count: 1, rechargedCount: 1 });
        localStorage.setItem('user-invitees', JSON.stringify({ count: 1, rechargedCount: 1 }));
        setClaimedInvitationBonuses([1]);
        localStorage.setItem('user-claimed-invitation-bonuses', JSON.stringify([1]));
    }, []);

    const logout = useCallback(() => {
        clearLocalStorage();
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
    }, []);

    const handleSetNickname = (name: string) => {
        setNickname(name);
        localStorage.setItem('user-nickname', name);
    };
    const handleSetAvatar = (url: string | null) => {
        setAvatar(url);
        if (url) localStorage.setItem('user-avatar', url); else localStorage.removeItem('user-avatar');
    };
    const transferToMainWallet = () => {
        setBalance(prev => prev + thirdPartyBalance);
        setThirdPartyBalance(0);
        localStorage.setItem('user-balance', (balance + thirdPartyBalance).toString());
        localStorage.setItem('user-third-party-balance', '0');
    };
    const addExperience = (amount: number, reason: string) => {
        const newExp = experience + amount;
        setExperience(newExp);
        localStorage.setItem('user-experience', newExp.toString());
        const newHistoryItem: ExpHistoryItem = {
            title: reason,
            type: "Betting EXP",
            date: new Date().toLocaleString(),
            amount: `+${amount} EXP`
        };
        const newHistory = [newHistoryItem, ...expHistory];
        setExpHistory(newHistory);
        localStorage.setItem('user-exp-history', JSON.stringify(newHistory));
    };
    const addUsedCode = (code: string) => {
        const newCodes = [...usedCodes, code];
        setUsedCodes(newCodes);
        localStorage.setItem('user-used-codes', JSON.stringify(newCodes));
    }
    const hasClaimedLevel = (level: number) => claimedLevels.includes(level);
    const addClaimedLevel = (level: number) => {
        if (!claimedLevels.includes(level)) {
            const newLevels = [...claimedLevels, level];
            setClaimedLevels(newLevels);
            localStorage.setItem('user-claimed-levels', JSON.stringify(newLevels));
        }
    }
    const claimMonthlyReward = () => {
        const now = Date.now();
        setLastMonthlyClaim(now);
        localStorage.setItem('user-last-monthly-claim', JSON.stringify(now));
    }
    const addDepositAmount = (amount: number) => {
        const newTotal = totalDepositAmount + amount;
        setTotalDepositAmount(newTotal);
        localStorage.setItem('user-total-deposit', newTotal.toString());
    };
    const addWithdrawalAmount = (amount: number) => {
        const newTotal = totalWithdrawalAmount + amount;
        setTotalWithdrawalAmount(newTotal);
        localStorage.setItem('user-total-withdrawal', newTotal.toString());
    }
    const addClaimedInvitationBonus = (tierId: number) => {
        const newBonuses = [...claimedInvitationBonuses, tierId];
        setClaimedInvitationBonuses(newBonuses);
        localStorage.setItem('user-claimed-invitation-bonuses', JSON.stringify(newBonuses));
    }

    const value = {
        uid,
        email,
        nickname,
        setNickname: handleSetNickname,
        avatar,
        setAvatar: handleSetAvatar,
        balance,
        setBalance,
        thirdPartyBalance,
        transferToMainWallet,
        experience,
        addExperience,
        usedCodes,
        addUsedCode,
        hasClaimedLevel,
        addClaimedLevel,
        expHistory,
        lastMonthlyClaim,
        claimMonthlyReward,
        totalDepositAmount,
        addDepositAmount,
        totalWithdrawalAmount,
        addWithdrawalAmount,
        invitees,
        claimedInvitationBonuses,
        addClaimedInvitationBonus,
        login,
        logout
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
