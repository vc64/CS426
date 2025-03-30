import React from "react";
import { Star, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contexts/userContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // progess percentage for the reward bar
  const progressPercentage =
    (user.points / (user.points + user.pointsToNextReward)) * 100;

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
        {/* user info card with white background */}
        <div className="bg-white rounded-lg p-8 mb-6 flex flex-col items-center text-center shadow-sm">
          {/* profile image */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-orange-400">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-orange-500">
                <span className="text-white text-2xl">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Username with verification mark */}
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              @{user.username}
            </h2>
            {user.isVerified && (
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

          {/* Progress bar - matching the green gradient in wireframe */}
          <div className="w-full max-w-md mb-2">
            <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Points to next reward with yellow star */}
          <div className="flex items-center justify-center text-sm mb-4 text-gray-700">
            <span>{user.pointsToNextReward} points to next reward!</span>
            <Star
              className="ml-2 text-yellow-400"
              size={18}
              fill="currentColor"
            />
          </div>
        </div>

        {/* Dietary preferences section - light green background */}
        <div className="bg-emerald-700 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-2 text-center text-white">
            Dietary Preferences:
          </h3>
          <p className="text-lg text-center text-white">
            {user.dietaryPreferences.join(", ")}
          </p>
        </div>

        {/* Current location section - dark green background */}
        <div className="bg-emerald-700 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-center">
            Current Location:
          </h3>
          <div className="text-lg flex items-center justify-center">
            <MapPin size={20} className="mr-2" />
            {user.currentLocation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
