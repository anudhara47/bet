
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
interface UserContextType {
  uid: string | null;
  nickname: string;
  setNickname: (name: string) => void;
  avatar: string | null;
  setAvatar: (url: string | null) => void;
  balance: number;
  setBalance: (balance: number) => void;
  usedCodes: string[];
  addUsedCode: (code: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [nickname, setNickname] = useState('DEVIL47K');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [balance, setBalance] = useState(305.77);
    const [usedCodes, setUsedCodes] = useState<string[]>([]);
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

        // Used Codes
        const storedUsedCodes = localStorage.getItem('user-used-codes');
        if (storedUsedCodes) {
            setUsedCodes(JSON.parse(storedUsedCodes));
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
        localStorage.setItem('user-used-codes', JSON.stringify(usedCodes));
    }, [usedCodes, isInitialLoad]);


    const handleSetNickname = (name: string) => {
        setNickname(name);
    };

    const handleSetAvatar = (url: string | null) => {
        setAvatar(url);
    };

    const handleSetBalance = (newBalance: number) => {
        setBalance(newBalance);
    };

    const addUsedCode = (code: string) => {
        setUsedCodes(prev => [...prev, code]);
    };

    const value = {
        uid,
        nickname,
        setNickname: handleSetNickname,
        avatar,
        setAvatar: handleSetAvatar,
        balance,
        setBalance: handleSetBalance,
        usedCodes,
        addUsedCode
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
