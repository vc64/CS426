import { createContext, useState, useEffect } from 'react';
import { foodItemType } from '../data/foodItems';
import axios from 'axios';

type FoodCardsContextType = {
  foodCards: foodItemType[];
  allFoodItems: foodItemType[];
  setFoodCards: React.Dispatch<React.SetStateAction<foodItemType[]>>;
  addCard: (foodItem: foodItemType) => void;
}

const FoodCardsContext = createContext<FoodCardsContextType | undefined>(undefined);

const FoodCardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foodCards, setFoodCards] = useState<foodItemType[]>([]);
  const [allFoodItems, setFoodItems] = useState<foodItemType[]>([]);
  const [maxIdx, setMaxIdx] = useState(0);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/listings', {
          headers: {
            'x-auth-token': localStorage.getItem('token') || ''
          }
        });        
  
        console.log('res.data:', res.data);
  
        if (!Array.isArray(res.data)) {
          throw new Error('Expected an array of listings but got: ' + JSON.stringify(res.data));
        }
  
        const adapted: foodItemType[] = res.data.map((item: any, index: number) => ({
          id: index,
          foodName: item.foodName,
          restaurantName: item.restaurantName,
          imageUrl: item.imageUrl,
          distance: item.distance,
          pickupTime: item.pickupTime,
          tags: item.tags,
          active: true,
          isFavorite: false,
        }));
  
        setFoodCards(adapted);
        setFoodItems(adapted);
        setMaxIdx(adapted.length);
      } catch (err) {
        console.error('Error fetching food items:', err);
      }
    };
  
    fetchListings();
  }, []);
  
  const addCard = (foodItem: foodItemType) => {
    foodItem.id = maxIdx;
    setMaxIdx(prev => prev + 1);
    setFoodCards(prev => [...prev, foodItem]);
    setFoodItems(prev => [...prev, foodItem]);
  };

  return (
    <FoodCardsContext.Provider value={{ foodCards, allFoodItems, setFoodCards, addCard }}>
      {children}
    </FoodCardsContext.Provider>
  );
};

export { FoodCardsContext, FoodCardsProvider };
