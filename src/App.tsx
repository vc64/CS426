import FoodCard from './FoodCard';
import FilterButton from './FilterButton';
import './App.css';
import { useTag } from './contexts/TagContext.tsx';

function App() {

  // Mock data for the cards
  const foodItems = [
    {
      foodName: "Pepperoni Pizza",
      restaurantName: "Worcester Dining Commons",
      imageUrl: "Pizza.jpg",
      distance: "Worcester Dining Commons, 0.1 miles away",
      pickupTime: "Today, 5:00 PM - 6:30 PM",
      tags: ["Italian"],
      active: true,
      isFavorite: false
    },
    {
      foodName: "Chocolate Cookies",
      restaurantName: "UMASO",
      imageUrl: "Chocolate-Cookies.jpg",
      distance: "Hasbrouck Laboratories, 0.3 miles away",
      pickupTime: "Today, 8:30 PM - 9:30 PM",
      tags: ["Dessert"],
      active: true,
      isFavorite: false
    },
    {
      foodName: "Chicken Biryani",
      restaurantName: "Cooking Club",
      imageUrl: "Chicken-Biryani.jpg",
      distance: "Chenoweth Laboratory, 0.5 miles away",
      pickupTime: "Today, 9:00 PM - 10:00 PM",
      tags: ["South Asian", "Gluten-Free", "Student-Made"],
      active: false,
      isFavorite: false
    },
    {
      foodName: "Garden Salad",
      restaurantName: "CICS",
      imageUrl: "Salad.jpg",
      distance: "Computer Science Building, 1.1 miles away",
      pickupTime: "Tomorrow, 11:30 AM - 1:00 PM",
      tags: ["Vegetarian", "Vegan", "Dairy-Free", "Organic"],
      active: true,
      isFavorite: false
    },
    {
      foodName: "Dalgona Coffee",
      restaurantName: "Korean Students Association",
      imageUrl: "Coffee.jpg",
      distance: "Student Union, 0.2 miles away",
      pickupTime: "Tomorrow, 2:00 PM - 3:00 PM",
      tags: ["Drink", "Vegetarian", "Student-Made"],
      active: true,
      isFavorite: false
    },
    {
      foodName: "Assorted Candy",
      restaurantName: "Positive Presence",
      imageUrl: "Candy.jpg",
      distance: "Worcester Dining Commons, 0.1 miles away",
      pickupTime: "Today, 2:00 PM - 4:00 PM",
      tags: ["Dessert"],
      active: false,
      isFavorite: false
    },
    {
      foodName: "Mac & Cheese",
      restaurantName: "Harvest Market",
      imageUrl: "Mac-and-Cheese.jpg",
      distance: "Harvest Market, 0.1 miles away",
      pickupTime: "Tomorrow, 11:00 PM - 12:00 AM",
      tags: ["Vegetarian"],
      active: true,
      isFavorite: false
    },
    {
      foodName: "Gluten-Free Brownies",
      restaurantName: "Yum! Bakery",
      imageUrl: "Brownies.jpg",
      distance: "Blue Wall, 0.2 miles away",
      pickupTime: "Today, 8:00 PM - 9:00 PM",
      tags: ["Dessert", "Gluten-Free"],
      active: true,
      isFavorite: false
    },
  ];

  const { selectedTag } = useTag();
  const filteredItems = selectedTag === 'All' ? foodItems : foodItems.filter(item => item.tags.includes(selectedTag));

  return (
    <div className="absolute inset-0 bg-white w-full min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Minuteman Meals</h1>
          <p className="text-gray-600 text-center mt-2">Save food and money by rescuing these meals</p>
        </header>
        <div>
          <FilterButton/>
        </div>
        {/* 
        Method to make this display as a grid - map it into an array of cards.
        When it comes to the homepage, have an array of all the food listings, and then sort the array based on the appropriate filters
        This way, we can just map them to easily put them into a grid - we need to implement this into an actual homepage
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <FoodCard key={index} food={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
