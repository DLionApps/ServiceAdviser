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
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello</Text>
    </View>
  );
};

export default HomeScreen;
