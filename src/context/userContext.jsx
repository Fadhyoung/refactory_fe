import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

// Create a custom hook for easy access to the context
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
