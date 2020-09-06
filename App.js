import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddVehicleScreen from "./Screens/AddVehicleScreen";

import { OwnerProvider } from "./Contexts/OwnerContext";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <OwnerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddVehicle"
            component={AddVehicleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OwnerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
