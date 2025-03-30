import { createContext, useState, useContext, ReactNode } from "react";
import { foodItems, foodItemType } from "../data/foodItems";

export type OrgProfileType = {
  username: string;
  numRatings: number;
  totalRatings: number;
  isVerified: boolean;
  listings: foodItemType[];
  currentLocation: string;
  profileImage?: string;
};

// default organization data
const defaultOrg: OrgProfileType = {
  username: "umass_dining",
  numRatings: 10,
  totalRatings: 35,
  isVerified: true,
  listings: foodItems,
  currentLocation: "Worcester Dining Commons",
  profileImage: "/src/assets/UMass.png",
};

// create context with default values
type OrgContextType = {
  org: OrgProfileType;
  updateOrg: (updatedOrg: Partial<OrgProfileType>) => void;
  updateLocation: (location: string) => void;
  addListing: (food: foodItemType) => void;
  addRating: (points: number) => void;
};

const OrgContext = createContext<OrgContextType>({
  org: defaultOrg,
  updateOrg: () => {},
  updateLocation: () => {},
  addListing: () => {},
  addRating: () => {},
});

// context provider component
export const OrgProvider = ({ children }: { children: ReactNode }) => {
  const [org, setOrg] = useState<OrgProfileType>(defaultOrg);

  const updateOrg = (updatedOrg: Partial<OrgProfileType>) => {
   setOrg((prevOrg) => ({ ...prevOrg, ...updatedOrg }));
  };

  const updateLocation = (location: string) => {
   setOrg((prevOrg) => ({ ...prevOrg, currentLocation: location }));
  };

  const addListing = (food: foodItemType) => {
   setOrg((prevOrg) => {
      const arr = prevOrg.listings;
      arr.push(food);
      return { ...prevOrg, listings: arr };
    });
  };

  const addRating = (points: number) => {
   setOrg((prevOrg) => {
      return { ...prevOrg, totalRatings: prevOrg.totalRatings + points, numRatings: prevOrg.numRatings + 1 };
    });
  };

  return (
    <OrgContext.Provider
      value={{
        org,
        updateOrg,
        updateLocation,
        addListing,
        addRating,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};

// custom hook for using the organization context
export const useOrg = () => useContext(OrgContext);

export default OrgContext;
