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
              <View style={styles.btnContainer}>
                {loginError !== undefined && (
                  <Text style={styles.dateError}>{loginError}</Text>
                )}
              </View>
              <View style={styles.btnContainer}>
                <Button
                  type="outline"
                  onPress={handleSubmit}
                  title="Login With Email"
                  titleStyle={styles.btnText}
                  disabled={isLoadingVisible}
                />
              </View>
              <View>
                <Button
                  type="clear"
                  onPress={() => {
                    navigation.navigate("SignupStepper");
                  }}
                  title="Create an Account"
                  titleStyle={styles.signupBtnText}
                  disabled={isLoadingVisible}
                />
                <Button
                  type="clear"
                  onPress={() => {
                    navigation.navigate("ResetPassword");
                  }}
                  title="Password Reset"
                  titleStyle={styles.signupBtnText}
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

export default LoginScreen;
