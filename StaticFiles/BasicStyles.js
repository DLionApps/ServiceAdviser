import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { Platform } from "react-native";

const screenHeading = {
  fontSize: responsiveFontSize(4),
  fontFamily: Platform.OS === "ios" ? "System" : "monospace",
  fontWeight: "bold",
  paddingBottom: "5%",
};

const screenDescription = {
  fontSize: responsiveFontSize(2),
  fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  color: "#68B2A0",
};

const textBoxStyles = {
  borderRadius: 12,
  borderWidth: responsiveWidth(0.3),
  borderColor: "#68B2A0",
};

const submitButtonStyles = {
  containerStyle: {
    borderRadius: 12,
    backgroundColor: "#7BE495",
    width: "70%",
  },
  titleStyle: {
    fontSize: responsiveFontSize(2.5),
    color: "#FFFFFF",
  },
  linkButtonTitle: {
    fontSize: responsiveFontSize(2.5),
    color: "#68B2A0",
  },
  linkButtonContainerStyle: {
    borderRadius: 22,
  },
};

const StepperStyles = {
  fontSize: responsiveFontSize(2),
  incompletedColor: "rgb(214, 214, 214)",
  completedColor: "rgb(32, 189, 55)",
  completedTextColor: "rgb(0, 0, 0)",
};

const Colors = {
  incompletedColor: "rgb(214, 214, 214)",
  completedColor: "#7BE495",
  // completedTextColor: "rgb(0, 0, 0)",
};

const CustomTexts = {
  fontSize: responsiveFontSize(2.1),
  color: "gray",
  fontWeight: "bold",
};

const ButtonStyles = {
  backgroundColor: "rgb(32, 189, 55)",
};

export {
  screenHeading,
  StepperStyles,
  Colors,
  CustomTexts,
  ButtonStyles,
  screenDescription,
  textBoxStyles,
  submitButtonStyles,
};
