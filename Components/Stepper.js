import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { StepperStyles } from "../StaticFiles/BasicStyles";

export default function Stepper(props) {
  return (
    <View style={styles.stepperContainer}>
      {props.stepData.map((step, index) => {
        return (
          <View key={index} style={styles.stepElementsWrapper}>
            <View
              style={[
                styles.circle,
                {
                  borderColor:
                    step.number <= props.currentStep
                      ? StepperStyles.completedColor
                      : StepperStyles.incompletedColor,
                },
              ]}
            >
              {step.number <= props.lastCompletedStep ? (
                <Icon
                  name="check"
                  size={18}
                  color={StepperStyles.completedColor}
                />
              ) : (
                <Text
                  style={[
                    styles.switchText,
                    {
                      color:
                        step.number == props.currentStep
                          ? StepperStyles.completedTextColor
                          : StepperStyles.incompletedColor,
                    },
                  ]}
                >
                  {step.number}
                </Text>
              )}
            </View>
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.switchText,
                  {
                    color:
                      step.number <= props.currentStep
                        ? StepperStyles.completedColor
                        : StepperStyles.incompletedColor,
                  },
                ]}
              >
                {step.text1}
              </Text>
              <Text
                style={[
                  styles.switchText,
                  {
                    color:
                      step.number <= props.currentStep
                        ? StepperStyles.completedColor
                        : StepperStyles.incompletedColor,
                  },
                ]}
              >
                {step.text2}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "3%",
    alignItems: "center",
  },
  stepElementsWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: Dimensions.get("screen").width / 10,
    height: Dimensions.get("screen").width / 10,
    borderRadius:
      (Dimensions.get("screen").width / 2 +
        Dimensions.get("screen").width / 2) /
      2,
    borderWidth: responsiveWidth(1.2),
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    width: Dimensions.get("screen").width / 5,
    alignItems: "center",
  },
  //   circleConnector: {
  //     flex: 1,
  //     borderBottomWidth: responsiveWidth(0.8),
  //   },
  switchText: {
    fontSize: responsiveFontSize(1.8),
  },
});
