import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const HomeScreenMainContainer = () => {
  const logoutUser = async () => {
    await AsyncStorage.removeItem("auth-token");
    await AsyncStorage.removeItem("ownerID");
    navigationObj.navigate("Login");
  };

  return (
    <View
      style={{
        width: "80%",
        height: "100%",
        justifyContent: "flex-start",
      }}
    >
      <Text>HOME</Text>
      <Button
        type="clear"
        onPress={() => {
          logoutUser();
        }}
        title="Logout"
        titleStyle={styles.signupBtnText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
});

export default HomeScreenMainContainer;
