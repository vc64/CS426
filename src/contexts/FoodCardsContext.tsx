import { createContext, useState } from 'react';
import { foodItems, foodItemType } from '../data/foodItems';

type FoodCardsContextType = {
  foodCards: foodItemType[];
  allFoodItems: foodItemType[];
  setFoodCards: React.Dispatch<React.SetStateAction<foodItemType[]>>;
  addCard: (foodItem: foodItemType) => void;
}

const FoodCardsContext = createContext<FoodCardsContextType | undefined>(undefined);

const FoodCardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foodCards, setFoodCards] = useState<foodItemType[]>(foodItems);
  const [allFoodItems, setFoodItems] = useState<foodItemType[]>(foodItems);
  const [maxIdx, setMaxIdx] = useState(Math.max(...foodItems.map(item => item.id)) + 1);
  const addCard = (foodItem: foodItemType) => {
    foodItem.id = maxIdx;
    setMaxIdx(maxIdx+1);
    setFoodCards(prevCards => {
      console.log([...prevCards, foodItem]);
      return [...prevCards, foodItem];
    });
    setFoodItems([...allFoodItems, foodItem]);
    console.log(foodCards);
  };

  return (
    <FoodCardsContext.Provider value={{foodCards, allFoodItems, setFoodCards, addCard}}>
      {children}
    </FoodCardsContext.Provider>
  )
}

export { FoodCardsContext, FoodCardsProvider };