
'use client';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Types
export interface Notification {
    id: string;
    type: 'login' | 'deposit' | 'withdrawal' | 'info';
    title: string;
    message: string;
    timestamp: number;
    read: boolean;
}

type NewNotification = Omit<Notification, 'id' | 'timestamp' | 'read'>;

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: NewNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const generateInitialNotifications = (): Notification[] => {
    return [
        {
            id: '1',
            type: 'deposit',
            title: 'Deposit Successful',
            message: 'Your deposit of ₹500.00 has been successfully processed.',
            timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
            read: true,
        },
        {
            id: '2',
            type: 'withdrawal',
            title: 'Withdrawal Processed',
            message: 'Your withdrawal of ₹200.00 has been sent.',
            timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
            read: true,
        },
    ]
}


const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>(generateInitialNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const addNotification = useCallback((notification: NewNotification) => {
        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: Date.now(),
            read: false,
        };

        // Avoid duplicate login notifications close together
        if (notification.type === 'login') {
            const lastLoginNotification = notifications.find(n => n.type === 'login');
            if (lastLoginNotification && (Date.now() - lastLoginNotification.timestamp) < 1000 * 60) { // 1 minute
                return;
            }
        }
        
        setNotifications(prev => [newNotification, ...prev]);
    }, [notifications]);

    const markAsRead = useCallback((id: string) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, read: true }))
        );
    }, []);

    const value = {
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
