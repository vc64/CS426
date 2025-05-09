import { useContext } from "react";
import OrgContext from "./orgContext";
import UserContext from "./userContext";
import { TagContext } from "./TagContext";

// custom hook for using the organization context
export const useOrg = () => useContext(OrgContext);

// custom hook for using the user context
export const useUser = () => useContext(UserContext);

// custom hook for using the tag context
export const useTag = () => {
   const context = useContext(TagContext);
   if (!context) {
      throw new Error("useTag must be used within a CounterProvider");
   }
   return context;
};
