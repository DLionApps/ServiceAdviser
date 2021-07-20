import React, { useState, useEffect, useContext } from "react";
import { Button, Text, TextInput, View, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupStepperScreen from "./Screens/SignupStepperScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import SettingsScreen from "./Screens/SettingsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { OwnerProvider } from "./Contexts/OwnerContext";
import { VehicleProvider } from "./Contexts/VehicleContext";
import { ServiceProvider } from "./Contexts/ServiceContext";
import { AuthContext } from "./Contexts/AuthContext";

import { login } from "./CommonFunctions/Auth";
import GetToken from "./StaticFiles/GetToken";
import RemoveToken from "./StaticFiles/RemoveToken";
import { Colors } from "./StaticFiles/BasicStyles";

import CustomDrawerContent from "./Navigators/CustomDrawerContent";
import MainStackNavigator from "./Navigators/MainStackNavigator";
import SettingsStackNavigator from "./Navigators/SettingsStackNavigator";

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// function HomeScreen() {
//   const { signOut } = React.useContext(AuthContext);

//   return (
//     <View>
//       <Text>Signed in!</Text>
//       <Button title="Sign out" onPress={signOut} />
//     </View>
//   );
// }

// function SignInScreen() {
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");

//   const { signIn } = React.useContext(AuthContext);

//   return (
//     <View>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Sign in" onPress={() => signIn({ username, password })} />
//     </View>
//   );
// }

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  StatusBar.setBarStyle("dark-content", true);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
        userToken = await GetToken();
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (values) => {
        var loginReturn = await login({
          email: values.email,
          password: values.password,
        });

        if (loginReturn.status === 201) {
          dispatch({ type: "SIGN_IN", token: loginReturn.token });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
        return loginReturn;

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
      },
      signOut: async () => {
        RemoveToken();
        dispatch({ type: "SIGN_OUT" });
      },
      //   signUp: async (data) => {
      //     // In a production app, we need to send user data to server and get a token
      //     // We will also need to handle errors if sign up failed
      //     // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      //     // In the example, we'll use a dummy token

      //     dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      //   },
      initialSignIn: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        var userToken = await GetToken();
        dispatch({ type: "SIGN_IN", token: userToken });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <OwnerProvider>
        <VehicleProvider>
          <ServiceProvider>
            <NavigationContainer>
              {state.userToken == null ? (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignupStepper"
                    component={SignupStepperScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                  />
                </Stack.Navigator>
              ) : (
                <Tab.Navigator
                  initialRouteName="Home"
                  tabBarOptions={{
                    activeTintColor: Colors.completedColor,
                    showLabel: false,
                  }}
                >
                  <Tab.Screen
                    name="Home"
                    component={MainStackNavigator}
                    options={{
                      // tabBarLabel: "Home",
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Settings"
                    component={SettingsStackNavigator}
                    options={{
                      // tabBarLabel: "Settings",
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="bars" color={color} size={size} />
                      ),
                    }}
                  />
                </Tab.Navigator>
              )}
            </NavigationContainer>
          </ServiceProvider>
        </VehicleProvider>
      </OwnerProvider>
    </AuthContext.Provider>
  );
}
