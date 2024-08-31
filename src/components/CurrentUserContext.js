import { createContext, useContext, useEffect, useState } from "react";

import { axiosRes } from "../api/axiosDefaults";


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const handleMount = async () => {
    try {
      if (accessToken) {
        axiosRes.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        const { data } = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(data);
      } else {
        console.warn("No access token found in localStorage.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {!isLoading && children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
