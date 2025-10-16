import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Check localStorage for an existing token on initial load
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null); // You can decode the user info from the token later
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Set the token/state and store it in localStorage
  const login = (jwtToken, userData) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Clear the token/state and remove it from localStorage
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Basic check to set isLoggedIn based on the token in state
    if (token) {
        setIsLoggedIn(true);
        // Add logic here to decode token and set user data if needed
    } else {
        setIsLoggedIn(false);
    }
  }, [token]);


  const value = {
    token,
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};