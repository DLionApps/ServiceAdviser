import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import {
  Colors,
  textBoxStyles,
  submitButtonStyles,
} from "../StaticFiles/BasicStyles";
import { OwnerValidationSchema } from "../Constents/ValidationScheemas";
import { OwnerContext } from "../Contexts/OwnerContext";
import { VehicleContext } from "../Contexts/VehicleContext";
import { ServiceContext } from "../Contexts/ServiceContext";

export default function EditOwnerScreen(props) {
  const { ownerState } = useContext(OwnerContext);
  const [owner, setOwner] = ownerState;
  const { serviceState } = useContext(ServiceContext);
  const [service, setService] = serviceState;
  const { vehicleState } = useContext(VehicleContext);
  const [vehicle, setVehicle] = vehicleState;
  const [forwardBtnDisabled, setForwardBtnDisabled] = useState(true);
  const [backwardBtnDisabled, setbackwrdBtnDisabled] = useState(true);

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
          validationSchema={OwnerValidationSchema}
          //   onSubmit={(values) => storeOwnerInfo(values)}
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
                  placeholder="First Name"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("fName")}
                  onBlur={handleBlur("fName")}
                  value={values.fName}
                  errorMessage={touched.fName && errors.fName}
                />
                <Input
                  placeholder="Last Name"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="lock" size={18} color="#fff" />}
                  onChangeText={handleChange("lName")}
                  onBlur={handleBlur("lName")}
                  value={values.lName}
                  errorMessage={touched.lName && errors.lName}
                />
              </View>
              <View style={styles.container}>
                <Input
                  placeholder="Email"
                  inputContainerStyle={textBoxStyles}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  errorMessage={touched.email && errors.email}
                />
              </View>
              <View style={styles.container}>
                <Input
                  placeholder="Contact Number"
                  inputContainerStyle={textBoxStyles}
                  leftIcon={<Icon name="lock" size={18} color="#fff" />}
                  onChangeText={handleChange("contactNumber")}
                  onBlur={handleBlur("contactNumber")}
                  value={values.contactNumber}
                  keyboardType="numeric"
                  errorMessage={touched.contactNumber && errors.contactNumber}
                />
              </View>
              <View style={styles.container}>
                <Input
                  placeholder="Password"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  errorMessage={touched.password && errors.password}
                />
                <Input
                  placeholder="Confirm Password"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="lock" size={18} color="#fff" />}
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
                  type="outline"
                  onPress={() => {
                    // goBack();
                  }}
                  title="Back"
                  titleStyle={submitButtonStyles.titleStyle}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    { backgroundColor: "#6D6D6D", width: "40%" },
                  ]}
                />
                <Button
                  type="outline"
                  onPress={handleSubmit}
                  title="Next"
                  titleStyle={styles.btnText}
                  titleStyle={submitButtonStyles.titleStyle}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    { width: "40%" },
                  ]}
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
    paddingTop: "5%",
  },
  container: {
    flexDirection: "row",
  },
  btnContainer: {
    paddingTop: "5%",
    width: "95%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btnText: {
    fontSize: responsiveFontSize(3.5),
    color: Colors.completedColor,
  },
});
