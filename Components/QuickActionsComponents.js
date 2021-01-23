import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const QuickActionsComponents = ({ navigation }) => {
  const navigateToUI = (selectedAction) => {
    switch (selectedAction) {
      case "service":
        navigation.navigate("Service");
        break;
      case "":
        // code block
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Button
        icon={
          <Icon name="wrench" size={responsiveFontSize(4.5)} color="#fff" />
        }
        titleStyle={styles.signupBtnText}
        containerStyle={styles.serviceButonContainer}
        onPress={() => {
          navigateToUI("service");
        }}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
  serviceButonContainer: {
    width: Dimensions.get("screen").width / responsiveWidth(1.5),
    height: Dimensions.get("screen").width / responsiveWidth(1.5),
    borderRadius:
      (Dimensions.get("screen").width / 2 +
        Dimensions.get("screen").width / 2) /
      2,
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: "blue",
    height: "100%",
  },
  container: {
    // backgroundColor: "red",
    width: "20%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default QuickActionsComponents;
