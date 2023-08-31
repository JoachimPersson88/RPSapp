import React, { useState, useEffect, createContext } from 'react';
import { fetchNewToken } from './api';  // Import your API function

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Fetch a new token when the component mounts
  useEffect(() => {
    fetchNewToken()
      .then(newToken => {
        setToken(newToken);
      })
      .catch(error => {
        console.error('Failed to fetch new token:', error);
      });
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
