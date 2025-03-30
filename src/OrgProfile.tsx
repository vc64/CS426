import { Star, StarHalf, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrg } from "./contexts/orgContext";
import OrgFoodCard from "./orgFoodCard";
import { FoodForm } from './FoodForm.tsx';
import { FoodListingContext } from './contexts/FoodListingContext';
import { useContext } from "react";

const OrgProfile = () => {
  const navigate = useNavigate();
  const { org } = useOrg();

  const stars = org.totalRatings / org.numRatings;


  const foodListingContext = useContext(FoodListingContext)!;

  return (
   <div
   style={{
     backgroundColor: "var(--color-cream)",
     minHeight: "100vh",
     padding: "20px",
   }}
 >
   {" "}
   {/* header with back button */}
   <div className="p-4 flex items-center mb-8">
     <button
       onClick={() => navigate(-1)}
       className="p-2 rounded-full hover:bg-fern"
     >
       <ArrowLeft size={24} />
     </button>
   </div>
   {/* profile content - using proper spacing and colors to match the wireframe */}
   <div className="max-w-lg mx-auto px-4">
     {/* org info card with white background */}
     <div className="bg-white rounded-lg p-8 mb-6 flex flex-col items-center text-center shadow-sm">
       {/* profile image */}
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
      </div>

      {/* Form for editing food */}
      <div id="overlay" className={`fixed inset-0 w-full h-full bg-black/[0.65] z-2 ${foodListingContext.isOpen ? "" : "hidden"}`}></div>
      <div className={`fixed inset-0 w-full h-full flex justify-center items-center z-3 ${foodListingContext.isOpen ? "" : "hidden"}`}>
        <FoodForm></FoodForm>
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
