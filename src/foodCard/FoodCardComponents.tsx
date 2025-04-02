import { Clock, Tag, MapPin, Utensils } from 'lucide-react';

export const FoodCardImage = ({ imageUrl, foodName, active }: { imageUrl: string; foodName: string; active: boolean }) => (
   <div>
      <img 
         src={"/src/assets/" + imageUrl} 
         alt={foodName} 
         className="w-full h-48 object-cover"
      />
      {active ? 
      (<div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">Active</div>)
      : (<div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">Closed</div>)}
   </div>
);

export const FoodCardText = ({ foodName, restaurantName, distance, pickupTime, isUser }: { foodName: string; restaurantName: string; distance: number; pickupTime: string; isUser: boolean }) => (
   <div>
      <div className="flex justify-between items-start mb-2">
         <h3 className="text-xl font-bold text-gray-800">{foodName}</h3>
      </div>
      
      <div className="flex items-center mb-3">
         <Utensils size={16} className="text-gray-500 mr-1" />
         <span className="text-gray-700">{restaurantName}</span>
      </div>
      
      {isUser && <div className="flex items-center mb-3">
         <MapPin size={16} className="text-gray-500 mr-1" />
         <span className="text-gray-600 text-sm">{distance + " miles away"}</span>
      </div>}
      
      <div className="flex items-center mb-3">
         <Clock size={16} className="text-gray-500 mr-1" />
         <span className="text-gray-600 text-sm">{pickupTime}</span>
      </div>
   </div>
);

export const FoodCardTags = ({ tags }: { tags: string[] }) => (
   <div className="flex flex-wrap gap-1 mb-3">
      {tags.map((tag, index) => (
      <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs">
         <Tag size={12} className="text-gray-500 mr-1" />
         <span className="text-gray-700">{tag}</span>
      </div>
      ))}
   </div>
);