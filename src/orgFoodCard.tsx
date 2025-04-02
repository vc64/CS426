import { Clock, Tag, Utensils } from 'lucide-react';
import { foodItemType } from './data/foodItems';
import { useContext } from 'react';
import { FoodListingContext } from './contexts/FoodListingContext';
import { defaultFood, foodCardButtonStyle, handleMouseEnter, handleMouseLeave, foodCardImage, foodCardText, foodCardTags } from './FoodCardComponents';


// Food Card component
const OrgFoodCard = ({ food }: {food: foodItemType}) => {
    // Allows us to have default values for the card
  const foodData = { ...defaultFood, ...food };

  const foodListingContext = useContext(FoodListingContext)!;
  
  const {
    id,
    foodName,
    restaurantName,
    imageUrl,
    distance,
    pickupTime,
    tags,
    active,
    isFavorite
  } = foodData;
  
  return (
    // Used many Tailwind CSS classes to have the styling applied
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        {foodCardImage({ imageUrl, foodName, active })}
      </div>
      
      <div className="p-4">

        {foodCardText({ foodName, restaurantName, distance, pickupTime, isUser: false })}

        {foodCardTags({ tags })}
        
        <button style={foodCardButtonStyle} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)}>Edit</button>

      </div>
    </div>
  );
};

export default OrgFoodCard;