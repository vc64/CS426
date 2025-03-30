import { createContext, useState } from 'react';
import { foodItems, foodItemType } from '../data/foodItems';

type FoodCardsContextType = {
  foodCards: foodItemType[];
  setFoodCards: (cards: foodItemType[]) => void;
  addCard: (foodItem: foodItemType) => void;
}

const FoodCardsContext = createContext<FoodCardsContextType | undefined>(undefined);

const FoodCardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foodCards, setFoodCards] = useState<foodItemType[]>([]);
  let curr_idx = foodItems.reduce((max, e) => Math.max(e.id, max), -1) + 1;
  const addCard = (foodItem: foodItemType) => {
    foodItem.id = curr_idx++;
    setFoodCards([...foodCards, foodItem]);
  };

  return (
    <FoodCardsContext.Provider value={{foodCards, setFoodCards, addCard}}>
      {children}
    </FoodCardsContext.Provider>
  )
}

export { FoodCardsContext, FoodCardsProvider };