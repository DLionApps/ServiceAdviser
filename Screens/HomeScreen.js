import React, { useState } from "react";
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
// import QuickActionsComponents from "../Components/QuickActionsComponents";
import HomeScreenMainContainer from "../Components/HomeScreenMainContainer";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HomeScreenMainContainer navigation={navigation} />
      {/* <QuickActionsComponents navigation={navigation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
});

export default HomeScreen;
