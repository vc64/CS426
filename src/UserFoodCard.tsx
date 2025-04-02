import { Heart, HeartOff } from 'lucide-react';
import { foodItemType } from './data/foodItems';
import { defaultFood, foodCardButtonStyle, handleMouseEnter, handleMouseLeave, foodCardImage, foodCardText, foodCardTags } from './FoodCardComponents';

// Food Card component
const FoodCard = ({ food, favToggle }: {food: foodItemType, favToggle: (index: number) => void}) => {
    // Allows us to have default values for the card
  const foodData = { ...defaultFood, ...food };
  
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

  // In future, may want to re-render food cards so that those favorited pop up first...
  // So need to take this into account when mapping grid
  const handleFavoriteClick = () => favToggle(id);

  return (
    // Used many Tailwind CSS classes to have the styling applied
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 w-[350px]">
      <div className="relative">
        {foodCardImage({ imageUrl, foodName, active })}
        <div className="absolute top-0 left-0 m-2" onClick={handleFavoriteClick}>
          {isFavorite ? (
            <div className="bg-white p-2 rounded-full shadow-md">
              <Heart size={20} color="#ef4444" fill="#ef4444" />
            </div>
          ) : (
            <div className="bg-white p-2 rounded-full shadow-md opacity-70 hover:opacity-100">
              <HeartOff size={20} color="#6b7280" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4">

        {foodCardText({ foodName, restaurantName, distance, pickupTime, isUser: true })}

        {foodCardTags({ tags })}
        
        <button style={foodCardButtonStyle} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)}>Reserve Now</button>

      </div>
    </div>
  );
};

export default FoodCard;