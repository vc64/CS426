import { Clock, MapPin, Tag, Utensils } from 'lucide-react';
// Found this within lucide-react package, super useful to leverage within our food cards
const defaultFood = {
  foodName: "Assorted Pastries",
  restaurantName: "Bella Bakery",
  originalPrice: 15.99,
  discountedPrice: 5.99,
  imageUrl: "/api/placeholder/300/200",
  distance: "0.7 miles away",
  pickupTime: "Today, 5:00 PM - 6:30 PM",
  tags: ["Vegetarian", "Bakery"],
  itemsLeft: 3
};

const FoodCard = ({ food = {} }) => {
  const foodData = { ...defaultFood, ...food };
  
  const {
    foodName,
    restaurantName,
    originalPrice,
    discountedPrice,
    imageUrl,
    distance,
    pickupTime,
    tags,
    itemsLeft
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
        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">
          {itemsLeft} left
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{foodName}</h3>
          <div className="flex flex-col items-end">
            <span className="text-gray-500 line-through text-sm">${originalPrice.toFixed(2)}</span>
            <span className="text-green-600 font-bold text-lg">${discountedPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <Utensils size={16} className="text-gray-500 mr-1" />
          <span className="text-gray-700">{restaurantName}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <MapPin size={16} className="text-gray-500 mr-1" />
          <span className="text-gray-600 text-sm">{distance}</span>
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
        
        <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-200">
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default FoodCard;