import { createContext, useState } from 'react';

type FoodListingContextType = {
  isOpen: boolean;
  toggleOpen: () => void;
}

const FoodListingContext = createContext<FoodListingContextType | undefined>(undefined);

const FoodListingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <FoodListingContext.Provider value={{isOpen, toggleOpen}}>
      {children}
    </FoodListingContext.Provider>
  )
}

export { FoodListingProvider, FoodListingContext };