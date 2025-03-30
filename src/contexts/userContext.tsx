import { createContext, useState, useContext, ReactNode } from "react";

export type UserProfileType = {
  username: string;
  isVerified: boolean;
  points: number;
  pointsToNextReward: number;
  dietaryPreferences: string[];
  currentLocation: string;
  profileImage?: string;
};

// default user data
const defaultUser: UserProfileType = {
  username: "awesome_goated",
  isVerified: true,
  points: 300,
  pointsToNextReward: 100,
  dietaryPreferences: ["Vegetarian", "Nut Allergy"],
  currentLocation: "Maple Hall",
  profileImage: "/src/assets/profile.png",
};

// create context with default values
type UserContextType = {
  user: UserProfileType;
  updateUser: (updatedUser: Partial<UserProfileType>) => void;
  updateLocation: (location: string) => void;
  updateDietaryPreferences: (preferences: string[]) => void;
  addPoints: (points: number) => void;
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: () => {},
  updateLocation: () => {},
  updateDietaryPreferences: () => {},
  addPoints: () => {},
});

// context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfileType>(defaultUser);

  const updateUser = (updatedUser: Partial<UserProfileType>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  const updateLocation = (location: string) => {
    setUser((prevUser) => ({ ...prevUser, currentLocation: location }));
  };

  const updateDietaryPreferences = (preferences: string[]) => {
    setUser((prevUser) => ({ ...prevUser, dietaryPreferences: preferences }));
  };

  const addPoints = (points: number) => {
    setUser((prevUser) => {
      const newTotal = prevUser.points + points;
      // add reward logic here when doing back end
      return { ...prevUser, points: newTotal };
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        updateLocation,
        updateDietaryPreferences,
        addPoints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// custom hook for using the user context
export const useUser = () => useContext(UserContext);

export default UserContext;
