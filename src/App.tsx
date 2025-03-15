import FoodCard from './FoodCard';
import './App.css';

function App() {

  // Mock data for the cards
  const foodItems = [
    {
      foodName: "Assorted Pastries",
      restaurantName: "Bella Bakery",
      originalPrice: 15.99,
      discountedPrice: 5.99,
      imageUrl: "Pastries.png",
      distance: "0.7 miles away",
      pickupTime: "Today, 5:00 PM - 6:30 PM",
      tags: ["Vegetarian", "Bakery"],
      itemsLeft: 3
    },
    {
      foodName: "Sushi Platter",
      restaurantName: "Sakura Japanese",
      originalPrice: 24.99,
      discountedPrice: 9.99,
      imageUrl: "Sushi.jpg",
      distance: "1.2 miles away",
      pickupTime: "Today, 8:30 PM - 9:30 PM",
      tags: ["Japanese", "Fish"],
      itemsLeft: 2
    },
    {
      foodName: "Pizza Combo",
      restaurantName: "Mario's Pizzeria",
      originalPrice: 19.50,
      discountedPrice: 7.99,
      imageUrl: "Pizza.jpg",
      distance: "0.5 miles away",
      pickupTime: "Today, 9:00 PM - 10:00 PM",
      tags: ["Italian", "Dairy"],
      itemsLeft: 1
    },
    {
      foodName: "Salad Box",
      restaurantName: "Green Leaf",
      originalPrice: 12.99,
      discountedPrice: 4.99,
      imageUrl: "Salad.jpg",
      distance: "1.8 miles away",
      pickupTime: "Tomorrow, 11:30 AM - 1:00 PM",
      tags: ["Vegan", "Organic"],
      itemsLeft: 5
    }
  ];

  return (
    <div className="absolute inset-0 bg-white w-full min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Minuteman Meals</h1>
          <p className="text-gray-600 text-center mt-2">Save food and money by rescuing these meals</p>
        </header>
        
        {/* Method to make this display as a grid - map it into an array of cards */}
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
