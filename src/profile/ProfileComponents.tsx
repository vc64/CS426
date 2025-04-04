import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfileBackButton = () => {
   const navigate = useNavigate();
   return (
      <div className="p-4 flex items-center mb-8">
         <button
         onClick={() => navigate(-1)}
         className="p-2 rounded-full hover:bg-fern"
         >
         <ArrowLeft size={24} />
         </button>
      </div>
   );
}

export const ProfileImage = ({ profileImage, username }: { profileImage?: string; username: string }) => {
   return (
      <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-orange-400">
      {profileImage ? (
        <img
          loading="lazy" 
          src={profileImage}
          alt={username}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-orange-500">
          <span className="text-white text-2xl">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
   )
}

export const ProfileUsername = ({ username, isVerified }: { username: string; isVerified: boolean }) => {
   return (
      <div className="flex items-center justify-center mb-6">
         <h2 className="text-2xl font-bold text-gray-800">
            @{username}
         </h2>
         {isVerified && (
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
   );
}

export const ProfileLocation = ({ currentLocation }: { currentLocation: string }) => {
   return (
      <div className="bg-green-800 text-white p-6 rounded-lg">
         <h3 className="text-xl font-bold mb-2 text-center"> Current Location: </h3>
         <div className="text-lg flex items-center justify-center">
            <MapPin size={20} className="mr-2" />
            {currentLocation}
         </div>
      </div>
   );
}