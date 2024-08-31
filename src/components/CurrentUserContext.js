import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
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

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          const refreshToken = localStorage.getItem("refresh_token");
          if (refreshToken) {
            const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", {
              refresh: refreshToken,
            });

            localStorage.setItem("access_token", data.access);
            config.headers.Authorization = `Bearer ${data.access}`;
          } else {
            console.warn("No refresh token found in localStorage.");
          }
        } catch (err) {
          console.error("Token refresh failed during request interception:", err);
          setCurrentUser(null);
          navigate("/signin");
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && !err.config._retry) {
          err.config._retry = true;
          try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
              const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", {
                refresh: refreshToken,
              });

              localStorage.setItem("access_token", data.access);
              axiosReq.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
              err.config.headers.Authorization = `Bearer ${data.access}`;
              return axiosReq(err.config);
            } else {
              console.warn("No refresh token available; cannot refresh access token.");
            }
          } catch (refreshError) {
            setCurrentUser(null);
            navigate("/signin");
          }
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {!isLoading && children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
