import { Star, StarHalf, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrg } from "./contexts/orgContext";
import OrgFoodCard from "./orgFoodCard";

const OrgProfile = () => {
  const navigate = useNavigate();
  const { org } = useOrg();

  const stars = org.totalRatings / org.numRatings;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* header with back button */}
      <div className="p-4 flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* profile content - using proper spacing and colors to match the wireframe */}
      <div className="max-w-lg mx-auto px-4">
        {/* Organization info card with white background */}
        <div className="bg-white rounded-lg p-8 mb-6 flex flex-col items-center text-center shadow-sm">
          {/* Profile image */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-orange-400">
            {org.profileImage ? (
              <img
                src={org.profileImage}
                alt={org.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-orange-500">
                <span className="text-white text-2xl">
                  {org.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Username with verification mark */}
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              @{org.username}
            </h2>
            {org.isVerified && (
              <div className="ml-2 bg-black rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Points display - green button */}
          <div className="bg-green-800 text-white font-bold rounded-lg px-8 py-3 mb-8 text-xl inline-block">
            300 points
          </div>

          <div className="flex space-x-2">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
               <Star
                  key={index}
                  size={32}
                  className={`transition-colors ${
                     starValue <= Math.floor(stars)
                        ? "text-yellow-400"
                        : starValue - 0.5 <= stars
                        ? "text-yellow-200"
                        : "text-gray-400"
                  }`}
               />
            );
         })}
         </div>
        </div>

         {/* Add Listing - light green background */}
         <div className="bg-green-100 p-6 rounded-lg mb-6">
           <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
             New Listing
           </h3>
           <form
             onSubmit={(e) => {
               e.preventDefault();
               const formData = new FormData(e.target as HTMLFormElement);
               const newFood = formData.get("foodItem") as string;
               if (newFood.trim()) {
            org.listings.push(newFood); // Update the org context
               }
               e.target.reset();
             }}
             className="flex flex-col items-center"
           >
             <input
               type="text"
               name="foodItem"
               placeholder="Enter food item"
               className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
               required
             />
              <input
               type="text"
               name="foodItem"
               placeholder="Enter food item"
               className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
               required
             />
             <button
               type="submit"
               className="bg-green-800 text-white font-bold rounded-lg px-6 py-2"
             >
               Add Food
             </button>
           </form>
         </div>

        {/* Current location section - dark green background */}
        <div className="bg-green-800 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-center">
            Current Location:
          </h3>
          <div className="text-lg flex items-center justify-center">
            <MapPin size={20} className="mr-2" />
            {org.currentLocation}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {org.listings.map((item, index) => (
               <OrgFoodCard
               key={index}
               food={item}
               />
            ))}
         </div>
      </div>
    </div>
  );
};

export default OrgProfile;
