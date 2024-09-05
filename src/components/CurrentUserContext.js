import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import showAlert from '../components/Sweetalert';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined); // undefined for loading state
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          axiosRes.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          // Fetch user data
          const { data: userData } = await axiosRes.get("dj-rest-auth/user/");

          // Fetch profile data
          const { data: profileData } = await axiosRes.get(`profiles/${userData.profile_id}/`);

          // Merge user data with profile data
          setCurrentUser({ ...userData, is_admin: profileData.is_admin });
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          // Handle refresh token logic
          const refreshToken = localStorage.getItem("refresh_token");
          if (refreshToken) {
            try {
              const { data } = await axiosRes.post("/dj-rest-auth/token/refresh/", {
                refresh: refreshToken,
              });

              localStorage.setItem("access_token", data.access);
              axiosRes.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

              // Retry fetching user data after refreshing token
              const { data: userData } = await axiosRes.get("dj-rest-auth/user/");
              const { data: profileData } = await axiosRes.get(`profiles/${userData.profile_id}/`);

              setCurrentUser({ ...userData, is_admin: profileData.is_admin });
            } catch (refreshError) {
              setCurrentUser(null);
              navigate("/signin");
              showAlert('error', "Your session has expired. Please log in again.", 'error');
            }
          } else {
            setCurrentUser(null);
            navigate("/signin");
          }
        } else {
          showAlert('error', "Error fetching user data, please refresh and try again", 'error');
          setCurrentUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleMount();
  }, [navigate]);

  useMemo(() => {
    const refreshAuthLogic = async (config) => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        setCurrentUser(null);
        navigate("/signin");
        return config;
      }

      try {
        const { data } = await axiosRes.post("/dj-rest-auth/token/refresh/", {
          refresh: refreshToken,
        });

        localStorage.setItem("access_token", data.access);
        config.headers.Authorization = `Bearer ${data.access}`;
      } catch (err) {
        setCurrentUser(null);
        navigate("/signin");
      }

      return config;
    };

    const attachRequestInterceptor = () => {
      axiosReq.interceptors.request.use(refreshAuthLogic, (err) => Promise.reject(err));
    };

    const attachResponseInterceptor = () => {
      axiosRes.interceptors.response.use(
        (response) => response,
        async (err) => {
          if (err.response?.status === 401 && !err.config._retry) {
            err.config._retry = true;
            try {
              const refreshToken = localStorage.getItem("refresh_token");
              if (refreshToken) {
                const { data } = await axiosRes.post("/dj-rest-auth/token/refresh/", {
                  refresh: refreshToken,
                });

                localStorage.setItem("access_token", data.access);
                axiosRes.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
                err.config.headers.Authorization = `Bearer ${data.access}`;
                return axiosRes(err.config);
              }
            } catch (refreshError) {
              setCurrentUser(null);
              navigate("/signin");
            }
          }
          return Promise.reject(err);
        }
      );
    };

    if (currentUser) {
      attachRequestInterceptor();
      attachResponseInterceptor();
    }
  }, [navigate, currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {!isLoading && children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
