import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddVehicleScreen from "./Screens/AddVehicleScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import AddServiceScreen from "./Screens/AddServiceScreen";

import { OwnerProvider } from "./Contexts/OwnerContext";
import { VehicleProvider } from "./Contexts/VehicleContext";
import { ServiceProvider } from "./Contexts/ServiceContext";

import GetToken from "./StaticFiles/GetToken";

const App = () => {
  const Stack = createStackNavigator();
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("");

  useEffect(() => {
    async function holdUntilAppLoads() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.log("Splash screen error");
      } finally {
        prepareResources();
      }
    }

    holdUntilAppLoads();
  }, []);

  const prepareResources = async () => {
    try {
      let token = await GetToken();
      if (token === null) {
        setInitialRoute("Login");
      } else {
        setInitialRoute("Home");
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  } else {
    return (
      <OwnerProvider>
        <VehicleProvider>
          <ServiceProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="AddVehicle"
                  component={AddVehicleScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ResetPassword"
                  component={ResetPasswordScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Home"
                  component={HomeScreen}
                />
                <Stack.Screen
                  options={{ headerShown: true }}
                  name="Service"
                  component={AddServiceScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ServiceProvider>
        </VehicleProvider>
      </OwnerProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
