import { Clock, MapPin, Tag, Utensils, Heart, HeartOff } from 'lucide-react';
import { foodItemType } from './data/foodItems';
import { useContext, useState } from 'react';
import { FoodListingContext } from './contexts/FoodListingContext';

const defaultFood = {
   foodName: "Assorted Pastries",
   restaurantName: "Bella Bakery",
   imageUrl: "/api/placeholder/300/200",
   pickupTime: "Today, 5:00 PM - 6:30 PM",
   tags: ["Vegetarian", "Bakery"],
   active: true,
 };


const reserveButtonStyle = {
    backgroundColor: '#16a34a', // Tailwind green-600
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    width: '100%',
    transition: 'background-color 200ms',
  };

  const handleMouseEnter = (e) => e.target.style.backgroundColor = '#15803d';
  
  const handleMouseLeave = (e) => e.target.style.backgroundColor = '#16a34a';


// Food Card component
const OrgFoodCard = ({ food }: {food: foodItemType}) => {
    // Allows us to have default values for the card
  const foodData = { ...defaultFood, ...food };
  const [showEditPopup, setShowEditPopup] = useState(false);

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
        <img 
          src={"/src/assets/" + imageUrl} 
          alt={foodName} 
          className="w-full h-48 object-cover"
        />
        {active ? 
        (<div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">Active</div>)
        : (<div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">Closed</div>)}

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{foodName}</h3>
        </div>
        
        <div className="flex items-center mb-3">
          <Utensils size={16} className="text-gray-500 mr-1" />
          <span className="text-gray-700">{restaurantName}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <Clock size={16} className="text-gray-500 mr-1" />
          <span className="text-gray-600 text-sm">{pickupTime}</span>
        </div>
        
        {/* This is how I got the tags to display in that way */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs">
              <Tag size={12} className="text-gray-500 mr-1" />
              <span className="text-gray-700">{tag}</span>
            </div>
          ))}
        </div>
        
      <button 
        style={reserveButtonStyle} 
        onMouseEnter={(e) => handleMouseEnter(e)} 
        onMouseLeave={(e) => handleMouseLeave(e)} 
        onClick={foodListingContext.toggleOpen}
      >
        Edit
      </button >
      </div>
    </div>
    </div>
  );
};

export default OrgFoodCard;