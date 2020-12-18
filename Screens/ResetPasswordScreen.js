import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { Colors, CustomTexts } from "../StaticFiles/BasicStyles";
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
              {isEmailSubmited !== true && (
                <View style={styles.container}>
                  <Input
                    label="Email"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    errorMessage={touched.email && errors.email}
                    disabled={isLoadingVisible}
                  />
                </View>
              )}

              {isEmailSubmited === true && (
                <>
                  <View style={styles.container}>
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
                  </View>
                  <View style={styles.container}>
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
                  type="clear"
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  title="Back"
                  titleStyle={styles.btnText}
                  disabled={isLoadingVisible}
                />
                <Button
                  type="outline"
                  onPress={handleSubmit}
                  title="Submit"
                  titleStyle={styles.btnText}
                  disabled={isLoadingVisible}
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
    paddingTop: StatusBar.currentHeight + 10,
  },
  wrapperContainerStyles: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    width: "100%",
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
    justifyContent: "space-around",
    flexDirection: "row",
  },
  dateError: {
    fontSize: responsiveFontSize(2.5),
    color: "red",
  },
});

export default ResetPasswordScreen;
