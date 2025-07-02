
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockCurrentUser } from '../data/mockPointData';

interface PointContextType {
  userPoints: number;
  setUserPoints: (points: number) => void;
  user: typeof mockCurrentUser;
  updateUser: (updates: Partial<typeof mockCurrentUser>) => void;
}

const PointContext = createContext<PointContextType | undefined>(undefined);

export const usePointContext = () => {
  const context = useContext(PointContext);
  if (!context) {
    throw new Error('usePointContext must be used within a PointProvider');
  }
  return context;
};

interface PointProviderProps {
  children: ReactNode;
}

export const PointProvider = ({ children }: PointProviderProps) => {
  const [userPoints, setUserPoints] = useState(mockCurrentUser.points);
  const [user, setUser] = useState(mockCurrentUser);

  const updateUser = (updates: Partial<typeof mockCurrentUser>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <PointContext.Provider value={{ userPoints, setUserPoints, user, updateUser }}>
      {children}
    </PointContext.Provider>
  );
};
