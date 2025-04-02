import { Star } from "lucide-react";
import { useUser } from "../contexts/ExportContexts";
import { ProfileBackButton, ProfileImage, ProfileLocation, ProfileUsername } from "./ProfileComponents.tsx";

const UserProfile = () => {
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
        width: "100vw"
      }}
    >
      {" "}
      <ProfileBackButton/>

      {/* profile content - using proper spacing and colors to match the wireframe */}
      <div className="max-w-lg mx-auto px-4">
        {/* user info card with white background */}
        <div className="bg-white rounded-lg p-8 mb-6 flex flex-col items-center text-center shadow-sm">
          <ProfileImage profileImage={user.profileImage} username={user.username} />
          <ProfileUsername username={user.username} isVerified={user.isVerified} />

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

        <ProfileLocation currentLocation={user.currentLocation}/>

      </div>
    </div>
  );
};

export default UserProfile;
