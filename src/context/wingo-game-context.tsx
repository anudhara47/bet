
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useUser } from './user-context';

// Types
interface GameResult {
    period: string;
    number: number;
    size: 'Big' | 'Small';
    color: string;
}

export interface Bet {
    period: string;
    selection: string; // e.g., 'Red', '5', 'Big'
    amount: number;
    status: 'Win' | 'Loss' | 'Pending';
    result?: GameResult;
}


interface WingoGameContextType {
  gameInterval: number;
  setGameInterval: (interval: number) => void;
  timeLeft: number;
  periodId: string | null;
  gameHistory: GameResult[];
  isRefreshing: boolean;
  handleRefresh: () => void;
  placeBet: (selection: string, amount: number) => void;
  myBets: Bet[];
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
  const { addExperience, setBalance } = useUser();
  const [gameInterval, setGameInterval] = useState(30);
  const [timeLeft, setTimeLeft] = useState(0);
  const [periodId, setPeriodId] = useState<string | null>(null);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isClient, setIsClient] = useState(false);
  const [myBets, setMyBets] = useState<Bet[]>([]);
  
  const basePeriod = BigInt("20250830100050967");
  const baseTime = 1724985600000; // A fixed timestamp in the past

  useEffect(() => {
    setIsClient(true);
    const storedBets = localStorage.getItem('myBets');
    if (storedBets) {
        setMyBets(JSON.parse(storedBets));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
        localStorage.setItem('myBets', JSON.stringify(myBets));
    }
  }, [myBets, isClient]);


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
        setPeriodId(currentPeriodId);
        setTimeLeft(newTimeLeft);
    };

    updateTimer(); // Initial call
    const timer = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(timer);
  }, [isClient, gameInterval, calculateCurrentPeriod]);

  const addGameTransaction = (type: 'win' | 'loss', amount: number) => {
    const newTransaction = { type, amount, timestamp: Date.now() };
    const existingTransactions = JSON.parse(localStorage.getItem('gameTransactions') || '[]');
    localStorage.setItem('gameTransactions', JSON.stringify([...existingTransactions, newTransaction]));
    window.dispatchEvent(new Event('local-storage'));
  };

  const getPayout = (selection: string, amount: number, result: GameResult): number => {
    if (selection.toLowerCase() === result.size.toLowerCase()) return amount * 2; // ~2x
    if (result.color.toLowerCase().includes(selection.toLowerCase())) {
        if (selection.toLowerCase() === 'violet') return amount * 4.5; // ~4.5x
        return amount * 2; // ~2x
    }
    if (selection === result.number.toString()) return amount * 9; // ~9x
    
    return 0; // Loss
  };


  const checkBetStatus = useCallback((bet: Bet, result: GameResult): 'Win' | 'Loss' => {
      if (bet.selection.toLowerCase() === result.size.toLowerCase()) return 'Win';
      if (result.color.toLowerCase().includes(bet.selection.toLowerCase())) return 'Win';
      if (bet.selection === result.number.toString()) return 'Win';

      return 'Loss';
  }, []);


  useEffect(() => {
      if (!periodId || !isClient) return;

      const newHistory: GameResult[] = [];
      const last10Periods: string[] = [];
      const currentPeriodBigInt = BigInt(periodId);
      
      for (let i = 1; i <= 10; i++) {
           const pastPeriodId = (currentPeriodBigInt - BigInt(i));
           if (pastPeriodId > 0) {
               last10Periods.push(pastPeriodId.toString());
               newHistory.push(generateHistoryResult(pastPeriodId.toString()));
           }
      }
      setGameHistory(newHistory);

      // Update status of pending bets
      setMyBets(prevBets => {
          return prevBets.map(bet => {
              if (bet.status === 'Pending' && last10Periods.includes(bet.period)) {
                  const result = newHistory.find(r => r.period === bet.period);
                  if (result) {
                      const status = checkBetStatus(bet, result);
                      if (status === 'Win') {
                          addExperience(bet.amount, `WinGo ${gameInterval}s Win`);
                          const payout = getPayout(bet.selection, bet.amount, result);
                          setBalance(prev => prev + payout);
                          addGameTransaction('win', payout - bet.amount); // Net win
                      } else {
                          addGameTransaction('loss', bet.amount);
                      }
                      return { ...bet, status: status, result: result };
                  }
              }
              return bet;
          });
      });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodId, isClient]);

  const placeBet = (selection: string, amount: number) => {
    if (periodId && timeLeft > 3) { // Prevent betting in last 3 seconds
        setMyBets(prevBets => [...prevBets, { period: periodId, selection, amount, status: 'Pending' }]);
    } else {
        console.log("Betting is closed for this period.");
    }
  };

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
    placeBet,
    myBets
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
