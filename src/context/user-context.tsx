

'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>('bdhara47@gmail.com'); // Hardcoded for admin demo
    const [nickname, setNickname] = useState('DEVIL47K');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [balance, setBalance] = useState(305.77);
    const [thirdPartyBalance, setThirdPartyBalance] = useState(150.00); // Demo amount
    const [experience, setExperience] = useState(0);
    const [usedCodes, setUsedCodes] = useState<string[]>([]);
    const [claimedLevels, setClaimedLevels] = useState<number[]>([]);
    const [expHistory, setExpHistory] = useState<ExpHistoryItem[]>([]);
    const [lastMonthlyClaim, setLastMonthlyClaim] = useState<number | null>(null);
    const [totalDepositAmount, setTotalDepositAmount] = useState(0);
    const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState(0);
    const [invitees, setInvitees] = useState<Invitees>({ count: 1, rechargedCount: 1 });
    const [claimedInvitationBonuses, setClaimedInvitationBonuses] = useState<number[]>([1]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Load from localStorage on initial render
    useEffect(() => {
        // UID
        let storedUid = localStorage.getItem('user-uid');
        if (!storedUid) {
            storedUid = Math.floor(100000 + Math.random() * 900000).toString();
            localStorage.setItem('user-uid', storedUid);
        }
        setUid(storedUid);

        // Nickname
        const storedNickname = localStorage.getItem('user-nickname');
        if (storedNickname) {
            setNickname(storedNickname);
        }

        // Avatar
        const storedAvatar = localStorage.getItem('user-avatar');
        if (storedAvatar) {
            setAvatar(storedAvatar);
        }
        
        // Balance
        const storedBalance = localStorage.getItem('user-balance');
        if (storedBalance) {
            setBalance(parseFloat(storedBalance));
        }

        // Third Party Balance
        const storedThirdPartyBalance = localStorage.getItem('user-third-party-balance');
        if (storedThirdPartyBalance) {
            setThirdPartyBalance(parseFloat(storedThirdPartyBalance));
        }
        
        // Experience
        const storedExperience = localStorage.getItem('user-experience');
        if (storedExperience) {
            setExperience(parseInt(storedExperience, 10));
        }

        // Used Codes
        const storedUsedCodes = localStorage.getItem('user-used-codes');
        if (storedUsedCodes) {
            setUsedCodes(JSON.parse(storedUsedCodes));
        }
        
        // Claimed Levels
        const storedClaimedLevels = localStorage.getItem('user-claimed-levels');
        if (storedClaimedLevels) {
            setClaimedLevels(JSON.parse(storedClaimedLevels));
        }

        // EXP History
        const storedExpHistory = localStorage.getItem('user-exp-history');
        if (storedExpHistory) {
            setExpHistory(JSON.parse(storedExpHistory));
        }

        const storedLastMonthlyClaim = localStorage.getItem('user-last-monthly-claim');
        if (storedLastMonthlyClaim) {
            setLastMonthlyClaim(JSON.parse(storedLastMonthlyClaim));
        }

        const storedTotalDeposit = localStorage.getItem('user-total-deposit');
        if (storedTotalDeposit) {
            setTotalDepositAmount(parseFloat(storedTotalDeposit));
        }

        const storedTotalWithdrawal = localStorage.getItem('user-total-withdrawal');
        if (storedTotalWithdrawal) {
            setTotalWithdrawalAmount(parseFloat(storedTotalWithdrawal));
        }
        
        const storedInvitees = localStorage.getItem('user-invitees');
        if (storedInvitees) {
            setInvitees(JSON.parse(storedInvitees));
        }

        const storedClaimedBonuses = localStorage.getItem('user-claimed-invitation-bonuses');
        if (storedClaimedBonuses) {
            setClaimedInvitationBonuses(JSON.parse(storedClaimedBonuses));
        }

        setIsInitialLoad(false);
    }, []);

    // Save to localStorage whenever a value changes
    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('user-nickname', nickname);
        if (avatar) localStorage.setItem('user-avatar', avatar); else localStorage.removeItem('user-avatar');
        localStorage.setItem('user-balance', balance.toString());
        localStorage.setItem('user-third-party-balance', thirdPartyBalance.toString());
        localStorage.setItem('user-experience', experience.toString());
        localStorage.setItem('user-used-codes', JSON.stringify(usedCodes));
        localStorage.setItem('user-claimed-levels', JSON.stringify(claimedLevels));
        localStorage.setItem('user-exp-history', JSON.stringify(expHistory));
        if(lastMonthlyClaim) localStorage.setItem('user-last-monthly-claim', JSON.stringify(lastMonthlyClaim)); else localStorage.removeItem('user-last-monthly-claim');
        localStorage.setItem('user-total-deposit', totalDepositAmount.toString());
        localStorage.setItem('user-total-withdrawal', totalWithdrawalAmount.toString());
        localStorage.setItem('user-invitees', JSON.stringify(invitees));
        localStorage.setItem('user-claimed-invitation-bonuses', JSON.stringify(claimedInvitationBonuses));
    }, [
        nickname, avatar, balance, thirdPartyBalance, experience, usedCodes, 
        claimedLevels, expHistory, lastMonthlyClaim, totalDepositAmount, 
        totalWithdrawalAmount, invitees, claimedInvitationBonuses, isInitialLoad
    ]);

    const handleSetNickname = (name: string) => setNickname(name);
    const handleSetAvatar = (url: string | null) => setAvatar(url);
    const transferToMainWallet = () => {
        setBalance(prev => prev + thirdPartyBalance);
        setThirdPartyBalance(0);
    };
    const addExperience = (amount: number, reason: string) => {
        setExperience(prev => prev + amount);
        const newHistoryItem: ExpHistoryItem = {
            title: reason,
            type: "Betting EXP",
            date: new Date().toLocaleString(),
            amount: `+${amount} EXP`
        };
        setExpHistory(prev => [newHistoryItem, ...prev]);
    };
    const addUsedCode = (code: string) => setUsedCodes(prev => [...prev, code]);
    const hasClaimedLevel = (level: number) => claimedLevels.includes(level);
    const addClaimedLevel = (level: number) => {
        if (!claimedLevels.includes(level)) setClaimedLevels(prev => [...prev, level]);
    }
    const claimMonthlyReward = () => setLastMonthlyClaim(Date.now());
    const addDepositAmount = (amount: number) => setTotalDepositAmount(prev => prev + amount);
    const addWithdrawalAmount = (amount: number) => setTotalWithdrawalAmount(prev => prev + amount);
    const addClaimedInvitationBonus = (tierId: number) => setClaimedInvitationBonuses(prev => [...prev, tierId]);

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
        addClaimedInvitationBonus
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
