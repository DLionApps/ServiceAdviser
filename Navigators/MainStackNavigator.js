import React, { useState, useEffect } from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import AddServiceScreen from "../Screens/AddServiceScreen";
import EditServiceScreen from "../Screens/EditServiceScreen";
import AddVehicleScreen from "../Screens/AddVehicleScreen";
import EditVehicleScreen from "../Screens/EditVehicleScreen";
import ServiceScreen from "../Screens/ServiceScreen";
import VehicleScreen from "../Screens/VehicleScreen";
import HomeScreen from "../Screens/HomeScreen";
import SettingsScreen from "../Screens/SettingsScreen";

const Stack = createStackNavigator();
const MainStackNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen name="AddService" component={AddServiceScreen} />
      <Stack.Screen name="EditService" component={EditServiceScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
      <Stack.Screen
        name="Vehicle"
        component={VehicleScreen}
        options={{
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          ),
        }}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
