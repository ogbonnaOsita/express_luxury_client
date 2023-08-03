/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { useEffect } from "react";

export const AuthContext = React.createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("JWT_TOKEN"))
  );

  const handleSetToken = (token) => {
    setToken(token);
  };

  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    handleSetToken,
    token,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
