import { foodItemType } from '../data/foodItems';
import { FoodCardImage, FoodCardText, FoodCardTags } from './FoodCardComponents';
import { defaultFood, foodCardButtonStyle, handleMouseEnter, handleMouseLeave } from './FoodCardConstants';


// Food Card component
const OrgFoodCard = ({ food }: {food: foodItemType}) => {
    // Allows us to have default values for the card
  const foodData = { ...defaultFood, ...food };
  
  const {
    foodName,
    restaurantName,
    imageUrl,
    distance,
    pickupTime,
    tags,
    active,
  } = foodData;
  
  return (
    // Used many Tailwind CSS classes to have the styling applied
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        {FoodCardImage({ imageUrl, foodName, active })}
      </div>
      
      <div className="p-4">

        {FoodCardText({ foodName, restaurantName, distance, pickupTime, isUser: false })}

        {FoodCardTags({ tags })}
        
        <button style={foodCardButtonStyle} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)}>Edit</button>

      </div>
    </div>
  );
};

export default OrgFoodCard;