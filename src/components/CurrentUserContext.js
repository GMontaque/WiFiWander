import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
          axiosRes.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          const { data: userData } = await axiosRes.get("/dj-rest-auth/user/");
          setCurrentUser(userData);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setCurrentUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {!isLoading && children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
