// TokenContext.js
import { createContext } from 'react';

const TokenContext = createContext({
  token: "",
  setToken: () => {},
});

console.log("TokenContext value:", TokenContext);

export default TokenContext;


