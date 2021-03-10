import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SignupStepperScreen from "./Screens/SignupStepperScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import AddServiceScreen from "./Screens/AddServiceScreen";
import AddVehicleScreen from "./Screens/AddVehicleScreen";
import ServiceScreen from "./Screens/ServiceScreen";
import VehicleScreen from "./Screens/VehicleScreen";
import EditServiceScreen from "./Screens/EditServiceScreen";

import { OwnerProvider } from "./Contexts/OwnerContext";
import { VehicleProvider } from "./Contexts/VehicleContext";
import { ServiceProvider } from "./Contexts/ServiceContext";

import GetToken from "./StaticFiles/GetToken";

import CustomDrawerContent from "./Navigators/CustomDrawerContent";
import MainStackNavigator from "./Navigators/MainStackNavigator";

const App = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
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
              {initialRoute === "Login" ? (
                <Stack.Navigator initialRouteName={initialRoute}>
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="SignupStepper"
                    component={SignupStepperScreen}
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
                    name="AddService"
                    component={AddServiceScreen}
                  />

                  <Stack.Screen
                    options={{ headerShown: true }}
                    name="Vehicle"
                    component={AddVehicleScreen}
                  />
                </Stack.Navigator>
              ) : (
                <Drawer.Navigator
                  initialRouteName={initialRoute}
                  drawerType="slide"
                  drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                  <Drawer.Screen name="Home" component={MainStackNavigator} />
                  <Drawer.Screen
                    options={{ headerShown: true }}
                    name="Service"
                    component={ServiceScreen}
                    initialParams={{ reloadUI: false }}
                  />
                  <Drawer.Screen
                    options={{ headerShown: true }}
                    name="Vehicle"
                    component={VehicleScreen}
                    initialParams={{ reloadUI: false }}
                  />
                </Drawer.Navigator>
              )}
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
