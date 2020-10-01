import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const screenHeading = {
  fontSize: responsiveFontSize(4),
};

const StepperStyles = {
  fontSize: responsiveFontSize(2),
  incompletedColor: "rgb(214, 214, 214)",
  completedColor: "rgb(32, 189, 55)",
  completedTextColor: "rgb(0, 0, 0)",
};

const Colors = {
  incompletedColor: "rgb(214, 214, 214)",
  completedColor: "rgb(32, 189, 55)",
  // completedTextColor: "rgb(0, 0, 0)",
};

const CustomTexts = {
  fontSize: responsiveFontSize(2.1),
  color: "gray",
  fontWeight: "bold",
};

export { screenHeading, StepperStyles, Colors, CustomTexts };
