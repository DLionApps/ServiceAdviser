import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator,
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
} from "../StaticFiles/BasicStyles";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { LoginSchema } from "../Constents/ValidationScheemas";
import { login } from "../CommonFunctions/Auth";
import { OwnerContext } from "../Contexts/OwnerContext";

const LoginScreen = ({ navigation }) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [loginError, setLoginError] = useState(undefined);
  const { ownerState } = useContext(OwnerContext);
  const [owner, setOwner] = ownerState;

  const loginSubmit = (values) => {
    sendAPICall(values);
  };

  const sendAPICall = async (values) => {
    elementsPopulator(true);

    var loginReturn = await login({
      email: values.email,
      password: values.password,
    });

    elementsPopulator(false);
    if (loginReturn.status === 201) {
      setOwner(loginReturn.data);
      navigation.navigate("Home");
    } else {
      setLoginError(loginReturn.messege);
    }
  };

  const elementsPopulator = (temp) => {
    setIsLoadingVisible(temp);
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
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => loginSubmit(values)}
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
                <Text style={screenHeading}>Login</Text>
                <Text style={screenDescription}>
                  Enter your login details to
                </Text>
                <Text style={screenDescription}>access your account</Text>
              </View>
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
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: "80%",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    type="clear"
                    onPress={() => {
                      navigation.navigate("ResetPassword");
                    }}
                    title="Forgot password?"
                    titleStyle={submitButtonStyles.linkButtonTitle}
                    containerStyle={submitButtonStyles.linkButtonContainerStyle}
                    disabled={isLoadingVisible}
                  />
                </View>
              </View>

              <View style={styles.btnContainer}>
                {loginError !== undefined && (
                  <Text style={styles.dateError}>{loginError}</Text>
                )}
              </View>
              <View style={styles.btnContainer}>
                <Button
                  type="outline"
                  onPress={handleSubmit}
                  title="Login"
                  titleStyle={submitButtonStyles.titleStyle}
                  disabled={isLoadingVisible}
                  containerStyle={submitButtonStyles.containerStyle}
                />
              </View>
              <View
                style={{
                  paddingTop: "25%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={screenDescription}>Need an account</Text>
                  <Button
                    type="clear"
                    onPress={() => {
                      navigation.navigate("SignupStepper");
                    }}
                    title="Sign up here"
                    titleStyle={submitButtonStyles.linkButtonTitle}
                    containerStyle={submitButtonStyles.linkButtonContainerStyle}
                    disabled={isLoadingVisible}
                  />
                </View>
              </View>
              <ActivityIndicator
                animating={isLoadingVisible}
                size="large"
                color="#7BE495"
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
    alignItems: "center",
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

export default LoginScreen;
