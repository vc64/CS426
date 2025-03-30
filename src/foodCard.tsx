import { Clock, MapPin, Tag, Utensils, Heart, HeartOff } from 'lucide-react';
import { foodItemType } from './data/foodItems';
// Found this within lucide-react package, super useful to leverage within our food cards
const defaultFood = {
  foodName: "Assorted Pastries",
  restaurantName: "Bella Bakery",
  imageUrl: "/api/placeholder/300/200",
  distance: 0.7,
  pickupTime: "Today, 5:00 PM - 6:30 PM",
  tags: ["Vegetarian", "Bakery"],
  active: true,
  isFavorite: true
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
  const handleFavoriteClick = (e) => favToggle(id);

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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{foodName}</h3>
        </div>
        
        <div className="flex items-center mb-3">
          <Utensils size={16} className="text-gray-500 mr-1" />
          <span className="text-gray-700">{restaurantName}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <MapPin size={16} className="text-gray-500 mr-1" />
          <span className="text-gray-600 text-sm">{distance + " miles away"}</span>
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
        
        <button style={reserveButtonStyle} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)}>Reserve Now</button>
      </div>
    </div>
  );
};

export default FoodCard;