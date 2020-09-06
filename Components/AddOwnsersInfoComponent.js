// import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { screenHeading } from "../StaticFiles/BasicStyles";
import { Colors } from "../StaticFiles/BasicStyles";
import { OwnerValidationSchema } from "../Constents/ValidationScheemas";
import { OwnerContext } from "../Contexts/OwnerContext";

export default function AddOwnsersInfoComponent(props) {
  const { ownerState } = useContext(OwnerContext);
  const [owner, setOwner] = ownerState;
  const [forwardBtnDisabled, setForwardBtnDisabled] = useState(true);
  const [backwardBtnDisabled, setbackwrdBtnDisabled] = useState(true);

  const storeOwnerInfo = (owner) => {
    if (Object.keys(owner).length !== 0) {
      console.log(owner);
      props.goThroughStepsFunc(true);
    }
  };

  const goBack = () => {
    props.goThroughStepsFunc(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            fName: "",
            lName: "",
            contactNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          // validationSchema={OwnerValidationSchema}
          onSubmit={(values) => storeOwnerInfo(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <ScrollView contentContainerStyle={styles.wrapperContainer}>
              <View style={styles.container}>
                <Input
                  label="First Name"
                  placeholder="John"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("fName")}
                  onBlur={handleBlur("fName")}
                  value={values.fName}
                  errorMessage={touched.fName && errors.fName}
                />
                <Input
                  label="Last Name"
                  placeholder="Richards"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="lock" size={24} color="#fff" />}
                  onChangeText={handleChange("lName")}
                  onBlur={handleBlur("lName")}
                  value={values.lName}
                  errorMessage={touched.lName && errors.lName}
                />
              </View>
              <View style={styles.container}>
                <Input
                  label="Email"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  errorMessage={touched.email && errors.email}
                />
                <Input
                  label="Contact Number"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="lock" size={24} color="#fff" />}
                  onChangeText={handleChange("contactNumber")}
                  onBlur={handleBlur("contactNumber")}
                  value={values.contactNumber}
                  keyboardType="numeric"
                  errorMessage={touched.contactNumber && errors.contactNumber}
                />
              </View>
              <View style={styles.container}>
                <Input
                  label="Password"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  errorMessage={touched.password && errors.password}
                />
                <Input
                  label="Confirm Password"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="lock" size={24} color="#fff" />}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  errorMessage={
                    touched.confirmPassword && errors.confirmPassword
                  }
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  type="clear"
                  onPress={() => {
                    // goBack();
                    // handleSubmit
                  }}
                  title="Back"
                  titleStyle={[
                    styles.btnText,
                    {
                      color:
                        backwardBtnDisabled === true
                          ? Colors.incompletedColor
                          : Colors.completedColor,
                    },
                  ]}
                  disabled={backwardBtnDisabled}
                />
                <Button
                  type="clear"
                  onPress={handleSubmit}
                  // onPress={() => {
                  //   console.log("in");
                  // }}
                  title="Next"
                  titleStyle={styles.btnText}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight + 10,
  },
  container: {
    // flex: 1,
    flexDirection: "row",

    // alignItems: "center",
    // justifyContent: "center",
  },
  textBoxStyles: {
    width: "50%",
  },
  btnContainer: {
    paddingTop: "5%",
    width: "80%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btnText: {
    fontSize: responsiveFontSize(3.5),
    color: Colors.completedColor,
  },
});
