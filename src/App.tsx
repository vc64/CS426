import FoodCard from "./foodCard";
import { useState, useEffect } from "react";
import FilterButton from "./FilterButton";
import "./App.css";
import { useTag } from "./contexts/TagContext.tsx";
import AppBanner from "./Banner.tsx";
import { foodItems, foodItemType } from "./data/foodItems.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./userProfile";
import { UserProvider } from "./contexts/userContext";

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

  return (
    <UserProvider>
      <Router>
        <div
          style={{
            backgroundColor: "var(--color-palecream)",
            minHeight: "100vh",
            width: "100%",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div style={{ width: "100%", margin: 0, padding: 0 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <AppBanner
                      logoSrc="/src/assets/logo.png"
                      name="Minuteman Meals"
                      desc="Find free food on campus!"
                      profileSrc="/src/assets/profile.png"
                    />
                    <div className="px-4 py-4">
                      <FilterButton />
                    </div>
                    {/* 
        Method to make this display as a grid - map it into an array of cards.
        When it comes to the homepage, have an array of all the food listings, and then sort the array based on the appropriate filters
        This way, we can just map them to easily put them into a grid - we need to implement this into an actual homepage
        */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-8">
                      {foodCards.map((item, index) => (
                        <FoodCard
                          key={index}
                          food={item}
                          favToggle={handleFavChange}
                        />
                      ))}
                    </div>
                  </>
                }
              />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
