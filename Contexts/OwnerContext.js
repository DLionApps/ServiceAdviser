import React, { createContext, useState } from "react";

export const OwnerContext = createContext();

export const OwnerProvider = ({ initialOwnerState, children }) => {
  const [owner, setOwner] = useState(initialOwnerState);

  return (
    <OwnerContext.Provider
      value={{
        ownerState: [owner, setOwner],
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};
