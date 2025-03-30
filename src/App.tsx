import FoodCard from "./foodCard";
import { useState, useEffect, useContext } from "react";
import FilterButton from "./FilterButton";
import "./App.css";
import { useTag } from "./contexts/TagContext.tsx";
import AppBanner from "./Banner.tsx";
import { foodItems, foodItemType } from "./data/foodItems.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./userProfile";
import { UserProvider } from "./contexts/userContext";
import { FoodForm } from './FoodForm.tsx';
import { FoodListingContext } from "./contexts/FoodListingContext.tsx";

function App() {
  // Mock data for the cards
  // Shows only the cards with the selected tag from the filtering button. Default tag on startup is 'All' which shows all cards.
  const { selectedTag } = useTag();

  const [foodCards, setFoodCards] = useState<foodItemType[]>([]);

  const cardMap = new Map<number, foodItemType>();
  foodItems.forEach((e) => cardMap.set(e.id, e));
  // We want to separate first into two groups - active or not active
  // Then order first by favorites, then by distance
  const sortFood = (arr: foodItemType[]) => {
    const favorites = arr.filter((e) => e.isFavorite);
    const notFavorites = arr.filter((e) => !e.isFavorite);
    favorites.sort((a, b) => a.distance - b.distance);
    notFavorites.sort((a, b) => a.distance - b.distance);
    const sortedCards = favorites.concat(notFavorites);
    // Need to implement functionality so user can choose this
    return selectedTag === "All"
      ? sortedCards
      : sortedCards.filter((item) => item.tags.includes(selectedTag));
  };

  // Use useEffect to set initial cards only once
  useEffect(() => {
    setFoodCards(sortCards());
  }, []); // Empty dependency array means this runs only once on mount

  const sortCards = () => {
    const active = foodItems.filter((e) => e.active);
    const notActive = foodItems.filter((e) => !e.active);

    const activeList = sortFood(active);
    const notActiveList = sortFood(notActive);
    return activeList.concat(notActiveList);
  };

  const handleFavChange = (id: number) => {
    const foodCard = cardMap.get(id);
    foodCard!.isFavorite = !foodCard!.isFavorite;
    setFoodCards(sortCards());
  };

  const foodListingContext = useContext(FoodListingContext)!;

  return (
    <div className="absolute inset-0 bg-white w-full min-h-screen">
      <div className="mx-auto px-4 py-8">
        <AppBanner
          logoSrc="/src/assets/logo.png"
          name="Minuteman Meals"
          desc="Find free food on campus!"
          profileSrc="/src/assets/profile.png"
        />
        <div>
          <FilterButton/>
        </div>
        {/* 
        Method to make this display as a grid - map it into an array of cards.
        When it comes to the homepage, have an array of all the food listings, and then sort the array based on the appropriate filters
        This way, we can just map them to easily put them into a grid - we need to implement this into an actual homepage
        */}
        <div id="overlay" className={`fixed inset-0 w-full h-full bg-black/[0.65] z-2 ${foodListingContext.isOpen ? "" : "hidden"}`}></div>
        <div className={`fixed inset-0 w-full h-full flex justify-center items-center z-3 ${foodListingContext.isOpen ? "" : "hidden"}`}>
          <FoodForm></FoodForm>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> */}
        <div className="flex flex-wrap gap-10 justify-center">
          {foodCards.map((item, index) => (
            <FoodCard key={index} food={item} favToggle={handleFavChange} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
