import React, { createContext, useState } from 'react';

export const PairContext = createContext();

export const PairProvider = ({ children }) => {
  const [pairs, setPairs] = useState([]);

  return (
    <PairContext.Provider value={{ pairs, setPairs }}>
      {children}
    </PairContext.Provider>
  );
};
