// import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, forwardRef } from "react";
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

const HomeScreen = ({ navigation }) => {
  const [navigationObj, setNavigationObj] = useState(navigation);

  const logoutUser = async () => {
    await AsyncStorage.removeItem("auth-token");
    await AsyncStorage.removeItem("ownerID");
    navigationObj.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

export default HomeScreen;
