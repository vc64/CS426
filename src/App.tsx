import FoodCard from './FoodCard';
import { foodItems } from './data/foodItems';
import './App.css';

function App() {

  // Mock data for the cards
  // Todo:
  // Sort by distance, time open, favorites, active 

  return (
    <div className="absolute inset-0 bg-white w-full min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Minuteman Meals</h1>
          <p className="text-gray-600 text-center mt-2">Save food and money by rescuing these meals</p>
        </header>
        
        {/* 
        Method to make this display as a grid - map it into an array of cards.
        When it comes to the homepage, have an array of all the food listings, and then sort the array based on the appropriate filters
        This way, we can just map them to easily put them into a grid - we need to implement this into an actual homepage
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foodItems.map((item, index) => (
            <FoodCard key={index} food={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
