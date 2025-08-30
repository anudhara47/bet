

'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
export interface ExpHistoryItem {
    title: string;
    type: string;
    date: string;
    amount: string;
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
  experience: number;
  addExperience: (amount: number, reason: string) => void;
  usedCodes: string[];
  addUsedCode: (code: string) => void;
  hasClaimedLevel: (level: number) => boolean;
  addClaimedLevel: (level: number) => void;
  expHistory: ExpHistoryItem[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>('bdhara47@gmail.com'); // Hardcoded for admin demo
    const [nickname, setNickname] = useState('DEVIL47K');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [balance, setBalance] = useState(305.77);
    const [experience, setExperience] = useState(0);
    const [usedCodes, setUsedCodes] = useState<string[]>([]);
    const [claimedLevels, setClaimedLevels] = useState<number[]>([]);
    const [expHistory, setExpHistory] = useState<ExpHistoryItem[]>([]);
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


        setIsInitialLoad(false);
    }, []);

    // Save to localStorage whenever a value changes
    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('user-nickname', nickname);
    }, [nickname, isInitialLoad]);

    useEffect(() => {
        if (isInitialLoad) return;
        if (avatar) {
            localStorage.setItem('user-avatar', avatar);
        } else {
            localStorage.removeItem('user-avatar');
        }
    }, [avatar, isInitialLoad]);

    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('user-balance', balance.toString());
    }, [balance, isInitialLoad]);

    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('user-experience', experience.toString());
    }, [experience, isInitialLoad]);

    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('user-used-codes', JSON.stringify(usedCodes));
    }, [usedCodes, isInitialLoad]);
    
    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('user-claimed-levels', JSON.stringify(claimedLevels));
    }, [claimedLevels, isInitialLoad]);
    
    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('user-exp-history', JSON.stringify(expHistory));
    }, [expHistory, isInitialLoad]);


    const handleSetNickname = (name: string) => {
        setNickname(name);
    };

    const handleSetAvatar = (url: string | null) => {
        setAvatar(url);
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

    const addUsedCode = (code: string) => {
        setUsedCodes(prev => [...prev, code]);
    };
    
    const hasClaimedLevel = (level: number) => {
        return claimedLevels.includes(level);
    }
    
    const addClaimedLevel = (level: number) => {
        if (!claimedLevels.includes(level)) {
            setClaimedLevels(prev => [...prev, level]);
        }
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
        experience,
        addExperience,
        usedCodes,
        addUsedCode,
        hasClaimedLevel,
        addClaimedLevel,
        expHistory
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
