import FoodCard from "./foodCard/UserFoodCard.tsx";
import { useState, useEffect, useContext, lazy } from "react";
import FilterButton from "./components/FilterButton.tsx";
import "./App.css";
import AppBanner from "./components/Banner.tsx";
import { foodItemType } from "./data/foodItems.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/userContext.tsx";
import { OrgProvider } from './contexts/orgContext.tsx';
import { FoodForm } from './components/FoodForm.tsx';
import { FoodListingContext } from "./contexts/FoodListingContext.tsx";
import { FoodCardsContext } from "./contexts/FoodCardsContext.tsx";
import { useTag } from "./contexts/ExportContexts.tsx";
import ToggleSwitch from "./components/Toggle.tsx";
import LoginRegister from './profile/LoginRegister.tsx';
import ProtectedRoute from "./profile/ProtectedRoute.tsx";


function App() {
  // Mock data for the cards
  // Shows only the cards with the selected tag from the filtering button. Default tag on startup is 'All' which shows all cards.
  const { selectedTag } = useTag();

  // const [foodCards, setFoodCards] = useState<foodItemType[]>([]);
  const { foodCards, allFoodItems, setFoodCards } = useContext(FoodCardsContext)!;

  // Used for setting context to either user or organization.
  const [isOrg, setIsOrg] = useState(false);

  // React Router code splitting
  const OrgView = lazy(() => import('./profile/OrgProfile.tsx'));
  const UserView = lazy(() => import('./profile/UserProfile.tsx'));

  const isLoggedIn = (): boolean => {
    return !!localStorage.getItem('token');
  }
  

  const cardMap = new Map<number, foodItemType>();
  foodCards.forEach((e) => cardMap.set(e.id, e));
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

  // update food cards whenever selectedTag changes
  useEffect(() => {
    console.log(selectedTag);
    setFoodCards(sortCards());
  }, [selectedTag, allFoodItems]);

  const sortCards = () => {
    const active = allFoodItems.filter((e) => e.active);
    const notActive = allFoodItems.filter((e) => !e.active);
    const activeList = sortFood(active);
    const notActiveList = sortFood(notActive);
    return activeList.concat(notActiveList);
  };

  const handleFavChange = (id: number) => {
    // const foodCard = cardMap.get(id);
    const foodCard = foodCards.find(item => item.id === id);
    foodCard!.isFavorite = !foodCard!.isFavorite;
    setFoodCards(sortCards());
  };

  function AppContent() {
    const foodListingContext = useContext(FoodListingContext)!;
    return (
      <Router>
      <div
        style={{
          backgroundColor: "var(--color-palecream)",
          // minHeight: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: 0,
          left: 0,
          // right: 0,
          // bottom: 0,
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
                    isOrg={isOrg}
                  />
                  <div className="px-4 py-4 relative flex items-center w-full">
                    <div className="absolute left-10">
                      <ToggleSwitch value={isOrg} onToggle={setIsOrg} onLabel="Org" offLabel="User" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <FilterButton />
                    </div>
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
                  <div className="flex flex-wrap gap-5 justify-center items-stretch">
                    {foodCards.map((item, index) => {
                      return (
                      <FoodCard
                        key={index}
                        food={item}
                        favToggle={handleFavChange}
                      />
                    )})}
                  </div>
                </>
              }
            />
            <Route path="/auth" element={<LoginRegister />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  {<UserView />}
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
    )
  }

  return (
    <div>
      {isOrg ? (
        <OrgProvider>
          <AppContent />
        </OrgProvider>
      ) : (
        <UserProvider>
          <AppContent />
        </UserProvider>
      )}
    </div>
  );
}

export default App;
