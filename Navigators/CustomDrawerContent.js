import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
  const logoutUser = async () => {
    console.log(props);
    // await AsyncStorage.removeItem("auth-token");
    // await AsyncStorage.removeItem("ownerID");
    // props.navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logoutUser()}></DrawerItem>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
