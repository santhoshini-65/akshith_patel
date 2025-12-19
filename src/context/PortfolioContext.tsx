import React, { createContext, useContext, useState, ReactNode } from 'react';

type PortfolioCategory = "all" | "wedding" | "portrait" | "commercial" | "event";

interface PortfolioContextType {
  activeCategory: PortfolioCategory;
  setActiveCategory: (category: PortfolioCategory) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");

  return (
    <PortfolioContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </PortfolioContext.Provider>
  );
};