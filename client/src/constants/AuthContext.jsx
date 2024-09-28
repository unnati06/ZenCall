import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null); // Initially null, since it's an object

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      setToken(existingToken);
    }
  }, []);

  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedIn", isLoggedIn);

  // JWT authentication to get the currently logged-in user
  const userAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("user data", data);
        setUser(data); // Store user data here
      }
    } catch (error) {
      console.log("error fetching user data", error);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  // Fetch scheduled meetings for the logged-in user
  const getScheduledMeetings = async () => {
    console.log("User in getScheduledMeetings:", user);
    console.log("Token in getScheduledMeetings:", token);
  
    if (!user || !token) {
      console.error("User or token is not defined.");
      return [];
    }
     console.log("user id hai ye", user._id);
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/${user._id}/scheduled-meetings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const meetings = Array.isArray(response.data.scheduledMeetings) ? response.data.scheduledMeetings : [];
        console.log("Meetings fetched successfully:", meetings);
        console.log("Full response data:", response.data);
        console.log("Scheduled Meetings:", response.data.scheduledMeetings);

        return meetings;
      } else {
        console.error("Unexpected response status:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching scheduled meetings:", error);
      return [];
    }
  };
  
  
  

  const LogoutUser = () => {
    setToken("");
    setUser(null); // Reset user on logout
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, getScheduledMeetings, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
