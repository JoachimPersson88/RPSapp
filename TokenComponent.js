// TokenComponent.js  
import React, { useState, useEffect, createContext } from 'react';
import { fetchNewToken } from './api';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

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


