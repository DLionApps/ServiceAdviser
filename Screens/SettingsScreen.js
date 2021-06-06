import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Colors, submitButtonStyles } from "../StaticFiles/BasicStyles";

import { AuthContext } from "../Contexts/AuthContext";

const SettingsScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const navigateRouts = (route) => {
    navigation.navigate(route, {
      reloadUI: true,
    });
  };

  const logoutUser = async () => {
    await signOut();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navigateContainer}>
        <View
          style={{
            alignItems: "flex-start",
            width: "90%",
          }}
        >
          <Button
            title="Owner"
            type="clear"
            containerStyle={{ width: "100%" }}
            buttonStyle={{ justifyContent: "flex-start" }}
            titleStyle={{ color: Colors.iconColor }}
            onPress={() => {
              // navigateRouts("Owner");
            }}
          />
          <Button
            title="Vehicle"
            type="clear"
            containerStyle={{ width: "100%" }}
            buttonStyle={{ justifyContent: "flex-start" }}
            titleStyle={{ color: Colors.iconColor }}
            onPress={() => {
              navigateRouts("Vehicle");
            }}
          />
          <Button
            title="Service"
            type="clear"
            containerStyle={{ width: "100%" }}
            buttonStyle={{ justifyContent: "flex-start" }}
            titleStyle={{ color: Colors.iconColor }}
            onPress={() => {
              navigateRouts("Service");
            }}
          />
        </View>

        <Divider
          style={{
            backgroundColor: Colors.completedColor,
            width: "90%",
            height: "1%",
          }}
        />
      </View>

      <View style={styles.logoutContainer}>
        <Button
          title="Log Out"
          type="outline"
          titleStyle={submitButtonStyles.titleStyle}
          containerStyle={[submitButtonStyles.containerStyle, { width: "90%" }]}
          onPress={() => {
            logoutUser();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: getStatusBarHeight() + 10,
    paddingBottom: "5%",
  },
  logoutContainer: {
    alignItems: "center",
  },
  navigateContainer: {
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default SettingsScreen;
