import React, { createContext, useState } from "react";

export const ServiceContext = createContext();

export const ServiceProvider = ({ initialServiceState, children }) => {
  const [service, setService] = useState(initialServiceState);

  return (
    <ServiceContext.Provider
      value={{
        serviceState: [service, setService],
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
