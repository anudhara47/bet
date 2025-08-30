'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Types
interface GameResult {
    period: string;
    number: number;
    size: 'Big' | 'Small';
    color: string;
}

interface WingoGameContextType {
  gameInterval: number;
  setGameInterval: (interval: number) => void;
  timeLeft: number;
  periodId: string | null;
  gameHistory: GameResult[];
  isRefreshing: boolean;
  handleRefresh: () => void;
}

// This function generates a random result
const generateHistoryResult = (pId: string): GameResult => {
    const number = Math.floor(Math.random() * 10);
    let color: string = 'gray';
    let size: 'Big' | 'Small' = 'Small';

    if ([1, 3, 7, 9].includes(number)) color = 'green';
    else if ([2, 4, 6, 8].includes(number)) color = 'red';
    else if (number === 5) color = 'green-violet';
    else if (number === 0) color = 'red-violet';

    if (number >= 5) size = 'Big';
    else size = 'Small';
    
    return { period: pId, number, size, color };
}

const WingoGameContext = createContext<WingoGameContextType | undefined>(undefined);

export const WingoGameProvider = ({ children }: { children: ReactNode }) => {
  const [gameInterval, setGameInterval] = useState(30);
  const [timeLeft, setTimeLeft] = useState(0);
  const [periodId, setPeriodId] = useState<string | null>(null);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const basePeriod = BigInt("20250830100050967");
  const [baseTime, setBaseTime] = useState<number>(Date.now());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateCurrentPeriod = useCallback(() => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - baseTime) / 1000);
    const periodsPassed = Math.floor(diffInSeconds / gameInterval);
    const currentPeriodId = basePeriod + BigInt(periodsPassed);
    
    const secondsIntoCurrentPeriod = diffInSeconds % gameInterval;
    const newTimeLeft = gameInterval - secondsIntoCurrentPeriod;

    return { currentPeriodId: currentPeriodId.toString(), newTimeLeft };
  }, [basePeriod, baseTime, gameInterval]);

  useEffect(() => {
    if (!isClient) return;

    const updateTimer = () => {
        const { currentPeriodId, newTimeLeft } = calculateCurrentPeriod();
        if (periodId !== currentPeriodId) {
             setPeriodId(currentPeriodId);
        }
        setTimeLeft(newTimeLeft);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [isClient, gameInterval, periodId, calculateCurrentPeriod]);
  
  useEffect(() => {
      if (!periodId || !isClient) return;

      const history = [];
      const currentPeriodBigInt = BigInt(periodId);

      for (let i = 1; i <= 10; i++) {
           const pastPeriodId = (currentPeriodBigInt - BigInt(i)).toString();
           if (BigInt(pastPeriodId) > 0) {
               history.push(generateHistoryResult(pastPeriodId));
           }
      }
      setGameHistory(history);
  }, [periodId, isClient]);

  const handleRefresh = () => {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 1000);
  };

  const value = {
    gameInterval,
    setGameInterval,
    timeLeft,
    periodId,
    gameHistory,
    isRefreshing,
    handleRefresh,
  };

  return (
    <WingoGameContext.Provider value={value}>
      {children}
    </WingoGameContext.Provider>
  );
};

export const useWingoGame = () => {
  const context = useContext(WingoGameContext);
  if (context === undefined) {
    throw new Error('useWingoGame must be used within a WingoGameProvider');
  }
  return context;
};
