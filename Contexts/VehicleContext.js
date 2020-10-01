import React, { createContext, useState } from "react";

export const VehicleContext = createContext();

export const VehicleProvider = ({ initialVehicleState, children }) => {
  const [vehicle, setVehicle] = useState(initialVehicleState);

  return (
    <VehicleContext.Provider
      value={{
        vehicleState: [vehicle, setVehicle],
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
