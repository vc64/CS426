import { Star, StarHalf, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrg } from "../contexts/orgContext.tsx";
import OrgFoodCard from "../foodCard/OrgFoodCard.tsx";
import { FoodForm } from '../components/FoodForm.tsx';
import { FoodListingContext } from '../contexts/FoodListingContext.tsx';
import { useContext, useEffect } from "react";
import FilterButton from "../components/FilterButton.tsx";
import { foodItemType } from "../data/foodItems.ts";
import { useTag } from "../contexts/TagContext.tsx";
import { ProfileBackButton, ProfileImage, ProfileUsername, ProfileLocation } from "./ProfileComponents.tsx";

const OrgProfile = () => {
  const { org } = useOrg();

  const stars = org.totalRatings / org.numRatings;

  const { selectedTag } = useTag();

  const foodListingContext = useContext(FoodListingContext)!;

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
    org.listings = sortCards();
  }, []); // Empty dependency array means this runs only once on mount

  // update food cards whenever selectedTag changes
  useEffect(() => {
    org.listings = sortCards();
  }, [selectedTag, org.listings]);

  const sortCards = () => {
    // const active = foodItems.filter((e) => e.active);
    // const notActive = foodItems.filter((e) => !e.active);
    const active = org.listings.filter((e) => e.active);
    const notActive = org.listings.filter((e) => !e.active);
    const activeList = sortFood(active);
    const notActiveList = sortFood(notActive);
    return activeList.concat(notActiveList);
  };

  return (
   <div
   style={{
     backgroundColor: "var(--color-cream)",
     minHeight: "100vh",
     padding: "20px",
   }}
  >
    {" "}
    <ProfileBackButton/>

    {/* profile content - using proper spacing and colors to match the wireframe */}
    <div className="max-w-lg mx-auto px-4">
      {/* org info card with white background */}
      <div className="bg-white rounded-lg p-8 mb-6 flex flex-col items-center text-center shadow-sm">
        <ProfileImage profileImage={org.profileImage} username={org.username} />
        <ProfileUsername username={org.username} isVerified={org.isVerified} />

        {/* Star Ratings */}
        <div className="flex space-x-2">
          <div className="relative">
              <div className="flex gap-1">
              { Array.from({ length: 5 }, () => (
                <Star fill="#111" strokeWidth={0} />
              ))}
              </div>
              <div className="absolute top-0 flex space-x-1">
                {[...Array(Math.ceil(stars))].map((_, index) => {
                    const starValue = index + 1;
                    return starValue === Math.ceil(stars) ? (
                    <StarHalf
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                    ) : (
                    <Star
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                    );
                })}
              </div>
          </div>
        </div>
      </div>

      <ProfileLocation currentLocation={org.currentLocation}/>
    </div>

    {/* Form for editing food */}
    <div id="overlay" className={`fixed inset-0 w-full h-full bg-black/[0.65] z-2 ${foodListingContext.isOpen ? "" : "hidden"}`}></div>
    <div className={`fixed inset-0 w-full h-full flex justify-center items-center z-3 ${foodListingContext.isOpen ? "" : "hidden"}`}>
      <FoodForm></FoodForm>
    </div>

    <div className="pt-7">
      <FilterButton />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
        {org.listings.map((item, index) => (
        <OrgFoodCard
        key={index}
        food={item}
        />
        ))}
    </div>
  </div>
  );
};

export default OrgProfile;
