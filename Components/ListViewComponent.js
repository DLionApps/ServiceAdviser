import React, { useState } from "react";
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { Colors } from "../StaticFiles/BasicStyles";

export default (props) => {
  const actionOne = (id) => {
    props.buttonActionOne(id);
  };

  const actionTwo = (id) => {
    props.buttonActionTwo(id);
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "70%" }}>
        <Text>
          {props.titleOne} : {props.valueOne}
        </Text>
        <Text>
          {props.titleTwo} : {props.valueTwo}
        </Text>
        {props.valueThree !== undefined && (
          <Text>
            {props.titleThree} : {props.valueThree}
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ justifyContent: "center" }}>
          <Button
            icon={
              <Icon
                name="trash-can-outline"
                size={responsiveFontSize(2.5)}
                color="red"
              ></Icon>
            }
            type="clear"
            onPress={(e) => {
              actionTwo(props.id);
            }}
          ></Button>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Button
            icon={
              <Icon
                name="pencil-outline"
                size={responsiveFontSize(2.5)}
                color={Colors.completedColor}
              ></Icon>
            }
            type="clear"
            onPress={(e) => {
              actionOne(props.id);
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
  container: {
    marginVertical: responsiveWidth(3),
    marginHorizontal: responsiveWidth(5),
    backgroundColor: "#fff",
    borderColor: "#68B2A0",
    borderRadius: 12,
    borderWidth: responsiveWidth(0.3),
    padding: "2%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-evenly",
  },
});
