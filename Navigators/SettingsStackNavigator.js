import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddServiceScreen from "../Screens/AddServiceScreen";
import EditServiceScreen from "../Screens/EditServiceScreen";
import AddVehicleScreen from "../Screens/AddVehicleScreen";
import EditVehicleScreen from "../Screens/EditVehicleScreen";
import ServiceScreen from "../Screens/ServiceScreen";
import VehicleScreen from "../Screens/VehicleScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import EditOwnerScreen from "../Screens/EditOwnerScreen";

const Stack = createStackNavigator();
const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen name="AddService" component={AddServiceScreen} />
      <Stack.Screen name="EditService" component={EditServiceScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
      <Stack.Screen name="Owner" component={EditOwnerScreen} />
      <Stack.Screen name="Vehicle" component={VehicleScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
