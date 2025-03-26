import FoodCard from "./foodCard";
import "./App.css";
import AppBanner from "./Banner.tsx";

function App() {
  // Mock data for the cards
  const foodItems = [
    {
      foodName: "Assorted Pastries",
      restaurantName: "Bella Bakery",
      imageUrl: "Pastries.png",
      distance: "0.7 miles away",
      pickupTime: "Today, 5:00 PM - 6:30 PM",
      tags: ["Vegetarian", "Bakery"],
      active: true,
      isFavorite: true,
    },
    {
      foodName: "Sushi Platter",
      restaurantName: "Sakura Japanese",
      imageUrl: "Sushi.jpg",
      distance: "1.2 miles away",
      pickupTime: "Today, 8:30 PM - 9:30 PM",
      tags: ["Japanese", "Fish"],
      active: true,
      isFavorite: true,
    },
    {
      foodName: "Pizza Combo",
      restaurantName: "Mario's Pizzeria",
      imageUrl: "Pizza.jpg",
      distance: "0.5 miles away",
      pickupTime: "Today, 9:00 PM - 10:00 PM",
      tags: ["Italian", "Dairy"],
      active: false,
      isFavorite: false,
    },
    {
      foodName: "Salad Box",
      restaurantName: "Green Leaf",
      imageUrl: "Salad.jpg",
      distance: "1.8 miles away",
      pickupTime: "Tomorrow, 11:30 AM - 1:00 PM",
      tags: ["Vegan", "Organic"],
      active: false,
      isFavorite: false,
    },
  ];

  return (
    <div className="app-wrapper">
      <AppBanner
        logoSrc="/src/assets/logo.png"
        name="Minuteman Meals"
        desc="Find free food on campus!"
        profileSrc="/src/assets/profile.png"
      />

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
  );
}

export default App;
