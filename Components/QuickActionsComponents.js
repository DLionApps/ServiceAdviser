import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
// import { FloatingAction } from "react-native-floating-action";

// import Icon from "react-native-vector-icons/Ionicons";
// import ActionButton from "react-native-action-button";

const QuickActionsComponents = ({ navigation }) => {
  const navigateToUI = (selectedAction) => {
    switch (selectedAction) {
      case "service":
        navigation.navigate("Service");
        break;
      case "Vehicle":
        navigation.navigate("Vehicle");
        // code block
        break;
      case "":
        // code block
        break;
    }
  };

  const actions = [
    {
      text: "Add Vehicle",
      name: "addVehicle",
      icon: <Icon name="plus" size={responsiveFontSize(4.5)} color="#fff" />,
      position: 1,
    },
    {
      text: "Edit Vehcle",
      icon: (
        <Icon name="pencil-plus" size={responsiveFontSize(4.5)} color="#fff" />
      ),
      name: "editVehicle",
      position: "right",
      margin: 8,
      size: 60,
    },
  ];

  return (
    <View style={styles.container}>
      {/* <Button
        icon={
          <Icon name="wrench" size={responsiveFontSize(4.5)} color="#fff" />
        }
        titleStyle={styles.signupBtnText}
        containerStyle={styles.serviceButonContainer}
        onPress={() => {
          navigateToUI("service");
        }}
        buttonStyle={[styles.buttonStyle, { backgroundColor: "blue" }]}
      />
      <Button
        icon={
          <Icon name="car-side" size={responsiveFontSize(4.5)} color="#fff" />
        }
        titleStyle={styles.signupBtnText}
        containerStyle={styles.serviceButonContainer}
        onPress={() => {
          navigateToUI("Vehicle");
        }}
        buttonStyle={[styles.buttonStyle, { backgroundColor: "red" }]}
      /> */}
      {/* <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
        }}
        floatingIcon={
          <Icon name="car-side" size={responsiveFontSize(4.5)} color="#fff" />
        }
        showBackground={false}
        color="red"
        actionsPaddingTopBottom={1}
        distanceToEdge={{
          vertical: responsiveHeight(-500),
          horizontal: responsiveWidth(2),
        }}
      /> */}
      {/* <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
        }}
        floatingIcon={
          <Icon name="car-side" size={responsiveFontSize(4.5)} color="#fff" />
        }
        showBackground={false}
        color="red"
        actionsPaddingTopBottom={1}
        // distanceToEdge={{ horizontal: responsiveWidth(2) }}
      /> */}
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
    height: "100%",
  },
  container: {
    backgroundColor: "black",
    width: "20%",
    height: "100%",
    // flexDirection: "column",
    // justifyContent: "space-evenly",
    // alignContent: "center",
    // alignItems: "flex-end",
  },
});

export default QuickActionsComponents;
