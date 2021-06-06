import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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

// import { AuthContext } from "../Contexts/AuthContext";

const HomeScreenMainContainer = ({ navigation }) => {
  // const { signOut } = useContext(AuthContext);

  // const logoutUser = async () => {
  //   await signOut();
  // };

  return (
    <View
      style={{
        justifyContent: "flex-start",
      }}
    >
      <Text>HOME</Text>
      {/* <Button
        type="clear"
        onPress={() => {
          // logoutUser();
        }}
        title="Logout"
        titleStyle={styles.signupBtnText}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
});

export default HomeScreenMainContainer;
