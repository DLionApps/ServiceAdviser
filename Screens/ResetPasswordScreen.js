import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import {
  screenHeading,
  screenDescription,
  textBoxStyles,
  submitButtonStyles,
  Colors,
} from "../StaticFiles/BasicStyles";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import {
  PasswordMatchSchema,
  EmailValidationSchema,
} from "../Constents/ValidationScheemas";
import { checkEmail, resetPassword } from "../CommonFunctions/Auth";
import { OwnerContext } from "../Contexts/OwnerContext";
import { getStatusBarHeight } from "react-native-status-bar-height";

const ResetPasswordScreen = ({ navigation }) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [isElementsDisabled, setIsElementsDisabled] = useState(false);
  const [isEmailSubmited, setIsEmailSubmited] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(undefined);
  const { ownerState } = useContext(OwnerContext);
  const [owner, setOwner] = ownerState;

  const submit = (values) => {
    elementsPopulator(true);
    sendAPICall(values);
    setOwner(undefined);
  };

  const sendAPICall = async (values) => {
    if (isEmailSubmited === false) {
      var emailReturn = await checkEmail(values.email);

      if (emailReturn.status === 200) {
        setIsEmailSubmited(true);
        setPasswordResetError(undefined);
        setOwner(emailReturn.data.owner);
      } else {
        setPasswordResetError(emailReturn.messege);
      }
      elementsPopulator(false);
    } else {
      var resetPassReturn = await resetPassword(owner.email, {
        password: values.password,
      });
      if (resetPassReturn.status === 200) {
        navigation.navigate("Login");
      } else {
        setPasswordResetError(resetPassReturn.messege);
      }
    }
  };

  const elementsPopulator = (value) => {
    setIsLoadingVisible(value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={
            isEmailSubmited === false
              ? EmailValidationSchema
              : PasswordMatchSchema
          }
          onSubmit={(values) => submit(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <ScrollView
              style={styles.wrapperContainer}
              contentContainerStyle={styles.wrapperContainerStyles}
            >
              <View
                style={{
                  alignItems: "center",
                  paddingBottom: "10%",
                }}
              >
                <Text style={screenHeading}>Reset password</Text>
                <Text style={screenDescription}>Enter your email to</Text>
                <Text style={screenDescription}>reset the password</Text>
              </View>
              {isEmailSubmited !== true && (
                // <View style={styles.container}>
                //   <Input
                //     label="Email"
                //     containerStyle={styles.textBoxStyles}
                //     leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                //     onChangeText={handleChange("email")}
                //     onBlur={handleBlur("email")}
                //     value={values.email}
                //     errorMessage={touched.email && errors.email}
                //     disabled={isLoadingVisible}
                //   />
                // </View>

                <View style={styles.container}>
                  <Input
                    containerStyle={{ width: "90%" }}
                    inputContainerStyle={textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    errorMessage={touched.email && errors.email}
                    disabled={isLoadingVisible}
                    placeholder="Email"
                  />
                </View>
              )}

              {isEmailSubmited === true && (
                <>
                  {/* <View style={styles.container}>
                    <Input
                      label="Password"
                      containerStyle={styles.textBoxStyles}
                      leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      errorMessage={touched.password && errors.password}
                      disabled={isLoadingVisible}
                    />
                  </View> */}

                  <View style={styles.container}>
                    <Input
                      containerStyle={{ width: "90%" }}
                      inputContainerStyle={textBoxStyles}
                      leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      errorMessage={touched.password && errors.password}
                      disabled={isLoadingVisible}
                      placeholder="Password"
                      secureTextEntry={true}
                    />
                  </View>

                  {/* <View style={styles.container}>
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
                      disabled={isLoadingVisible}
                    />
                  </View> */}

                  <View style={styles.container}>
                    <Input
                      containerStyle={{ width: "90%" }}
                      inputContainerStyle={textBoxStyles}
                      leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      errorMessage={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      disabled={isLoadingVisible}
                      placeholder="Confirm Password"
                      secureTextEntry={true}
                    />
                  </View>
                </>
              )}

              <View style={styles.btnContainer}>
                {passwordResetError !== undefined && (
                  <Text style={styles.dateError}>{passwordResetError}</Text>
                )}
              </View>
              <View style={styles.btnContainer}>
                <Button
                  type="outline"
                  onPress={handleSubmit}
                  title="Submit"
                  titleStyle={submitButtonStyles.titleStyle}
                  disabled={isLoadingVisible}
                  containerStyle={submitButtonStyles.containerStyle}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  type="outline"
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  title="Back"
                  titleStyle={submitButtonStyles.titleStyle}
                  disabled={isLoadingVisible}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    { backgroundColor: "#6D6D6D" },
                  ]}
                />
              </View>
              <ActivityIndicator
                animating={isLoadingVisible}
                size="large"
                color="#00ff00"
              />
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapperContainer: {
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: getStatusBarHeight() + 10,
  },
  wrapperContainerStyles: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    fontSize: responsiveFontSize(3.5),
    color: Colors.completedColor,
  },
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
    textDecorationLine: "underline",
  },
  btnContainer: {
    paddingTop: "5%",
    width: "100%",
    alignItems: "center",
  },
  dateError: {
    fontSize: responsiveFontSize(2.5),
    color: "red",
  },
});

export default ResetPasswordScreen;
