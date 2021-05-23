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
  Pressable,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import {
  Colors,
  CustomTexts,
  textBoxStyles,
  submitButtonStyles,
} from "../StaticFiles/BasicStyles";
import { monthNames } from "../StaticFiles/staticData";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import {
  MileageServiceValidationSchema,
  HourServiceValidationSchema,
} from "../Constents/ValidationScheemas";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ServiceContext } from "../Contexts/ServiceContext";
import { OwnerContext } from "../Contexts/OwnerContext";
import { VehicleContext } from "../Contexts/VehicleContext";
import { login, signup } from "../CommonFunctions/Auth";
import { createVehicle } from "../CommonFunctions/Vehicle";
import { createService } from "../CommonFunctions/Service";
import { AuthContext } from "../Contexts/AuthContext";
import AlertComponent from "../Components/AlertComponent";

export default function AddServicesInfoComponent(props) {
  const { initialSignIn } = useContext(AuthContext);

  const { serviceState } = useContext(ServiceContext);
  const [service, setService] = serviceState;
  const { ownerState } = useContext(OwnerContext);
  const [owner, setOwner] = ownerState;
  const { vehicleState } = useContext(VehicleContext);
  const [vehicle, setVehicle] = vehicleState;
  const [forwardBtnDisabled, setForwardBtnDisabled] = useState(true);
  const [backwardBtnDisabled, setbackwrdBtnDisabled] = useState(true);
  const [selectedVehicleType, setSelectedVehicleType] = useState(
    props.selectedVehicleTypeIndex
  );
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [isElementsDisabled, setisElementsDisabled] = useState(false);

  const [date, setDate] = useState(
    service === undefined ? undefined : service.lastServiceDate
  );
  const [show, setShow] = useState(false);
  const [dateError, setDateError] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const formatDate = (date) => {
      return (
        date.getDate() +
        "-" +
        monthNames[date.getMonth()] +
        "-" +
        date.getFullYear()
      );
    };

    let currentDate =
      selectedDate !== undefined ? formatDate(selectedDate) : date;
    setShow(Platform.OS === "ios");
    if (currentDate !== undefined) {
      setDateError(false);
    }
    setDate(currentDate);
    setService;
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const goBack = () => {
    props.goThroughStepsFunc(false);
  };

  const storeServiceInfo = (values) => {
    if (date !== undefined) {
      if (Object.keys(values).length !== 0) {
        setService(values);
        let castedServiceObj = {
          lastServiceHours:
            selectedVehicleType === 1
              ? parseInt(values.lastServiceHours)
              : undefined,
          workingHours:
            selectedVehicleType === 1
              ? parseInt(values.workingHours)
              : undefined,
          lastServiceMileage:
            selectedVehicleType === 0
              ? parseInt(values.lastServiceMileage)
              : undefined,
          mileage:
            selectedVehicleType === 0 ? parseInt(values.mileage) : undefined,
          lastServiceDate: date,
        };

        let castedVehicleObj = {
          VRN: vehicle.VRN,
          nickName: vehicle.nickName === "" ? undefined : vehicle.nickName,
          fuelType: vehicle.fuelType,
          make: vehicle.make,
          mfgYear: parseInt(vehicle.mfgYear),
          model: vehicle.model,
          vehicleType: parseInt(vehicle.vehicleType),
        };

        const { confirmPassword, ...ownerWithoutConfirmPassword } = owner;

        let castedOwnerObj = ownerWithoutConfirmPassword;

        sendAPICalls(castedOwnerObj, castedServiceObj, castedVehicleObj);
        // props.goThroughStepsFunc(true);
      }
    } else {
      setDateError(true);
    }
  };

  const elementsPopulator = () => {
    setIsLoadingVisible(!isLoadingVisible);
    setisElementsDisabled(!isElementsDisabled);
  };

  const sendAPICalls = async (
    castedOwnerObj,
    castedServiceObj,
    castedVehicleObj
  ) => {
    elementsPopulator();

    let signupReturn = await signup(castedOwnerObj);

    if (signupReturn.status === 201) {
      var loginReturn = await login({
        email: owner.email,
        password: owner.password,
      });
      setOwner(loginReturn.data);

      if (loginReturn.status === 201) {
        castedVehicleObj.ownerID = loginReturn.data._id;
        var vehicleReturn = await createVehicle(castedVehicleObj);
        setVehicle(vehicleReturn.data);

        castedServiceObj.vehicleID = vehicleReturn.data._id;
        var serviceReturn = await createService(castedServiceObj);
        setService(serviceReturn.data);

        setTimeout(async () => {
          elementsPopulator();
          // props.navigation.navigate("Home");
          await initialSignIn();
        }, 2000);
      } else {
        AlertComponent("Signup user", "Unexpected error occured");
        setTimeout(() => {
          BackHandler.exitApp();
        }, 3000);
      }
    } else {
      AlertComponent("Signup user", "Unexpected error occured");
      setTimeout(() => {
        BackHandler.exitApp();
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            mileage: service === undefined ? "" : service.mileage,
            workingHours: service === undefined ? "" : service.workingHours,
            lastServiceMileage:
              service === undefined ? "" : service.lastServiceMileage,
            lastServiceHours:
              service === undefined ? "" : service.lastServiceHours,
            // lastServiceDate: "",
          }}
          validationSchema={
            selectedVehicleType === 0
              ? MileageServiceValidationSchema
              : HourServiceValidationSchema
          }
          onSubmit={(values) => {
            storeServiceInfo(values);
          }}
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
                {selectedVehicleType === 0 ? (
                  <Input
                    placeholder="Total Mileage"
                    inputContainerStyle={textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("mileage")}
                    onBlur={handleBlur("mileage")}
                    value={values.mileage}
                    errorMessage={touched.mileage && errors.mileage}
                    keyboardType="numeric"
                    disabled={isElementsDisabled}
                  />
                ) : (
                  <Input
                    placeholder="Total Working Hours"
                    inputContainerStyle={textBoxStyles}
                    leftIcon={<Icon name="lock" size={18} color="#fff" />}
                    onChangeText={handleChange("workingHours")}
                    onBlur={handleBlur("workingHours")}
                    value={values.workingHours}
                    errorMessage={touched.workingHours && errors.workingHours}
                    keyboardType="numeric"
                    disabled={isElementsDisabled}
                  />
                )}
              </View>
              <View style={styles.container}>
                {selectedVehicleType === 0 ? (
                  <Input
                    placeholder="Recent Oil & Manintenence Service Mileage"
                    inputContainerStyle={textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("lastServiceMileage")}
                    onBlur={handleBlur("lastServiceMileage")}
                    value={values.lastServiceMileage}
                    errorMessage={
                      touched.lastServiceMileage && errors.lastServiceMileage
                    }
                    keyboardType="numeric"
                    disabled={isElementsDisabled}
                  />
                ) : (
                  <Input
                    placeholder="Recent Oil & Manintenence Service Hours"
                    inputContainerStyle={textBoxStyles}
                    leftIcon={<Icon name="lock" size={24} color="#fff" />}
                    onChangeText={handleChange("lastServiceHours")}
                    onBlur={handleBlur("lastServiceHours")}
                    value={values.lastServiceHours}
                    errorMessage={
                      touched.lastServiceHours && errors.lastServiceHours
                    }
                    keyboardType="numeric"
                    disabled={isElementsDisabled}
                  />
                )}
              </View>
              <View
                style={{
                  width: "100%",
                }}
              >
                <View style={[{ justifyContent: "center" }, styles.container]}>
                  <Button
                    containerStyle={{
                      backgroundColor: "white",
                      borderRadius: 12,
                      borderWidth: responsiveWidth(0.2),
                      borderColor: "#68B2A0",
                      width: "95%",
                    }}
                    title={
                      date === undefined
                        ? "Recent Oil & Manintenence Service Date"
                        : date
                    }
                    type="clear"
                    titleStyle={{
                      color: date === undefined ? "#d0ced1" : "black",
                      fontSize: responsiveFontSize(2.2),
                    }}
                    iconRight={true}
                    icon={
                      <Icon
                        name="calendar-check-o"
                        size={responsiveFontSize(2.5)}
                        color="#d0ced1"
                      />
                    }
                    buttonStyle={{
                      justifyContent: "space-around",
                    }}
                    onPress={showDatepicker}
                  />
                </View>
                {dateError === true && (
                  <Text style={styles.dateError}>
                    Recent Oil & Manintenence Service Date is required
                  </Text>
                )}
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  style={{ width: 320, backgroundColor: "white" }}
                />
              )}

              <View style={styles.btnContainer}>
                <Button
                  type="outline"
                  onPress={() => {
                    goBack();
                  }}
                  title="Back"
                  titleStyle={submitButtonStyles.titleStyle}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    { backgroundColor: "#6D6D6D", width: "40%" },
                  ]}
                  disabled={isElementsDisabled}
                />
                <Button
                  type="outline"
                  onPress={handleSubmit}
                  title="Submit"
                  titleStyle={submitButtonStyles.titleStyle}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    { width: "40%" },
                  ]}
                  disabled={isElementsDisabled}
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
}

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "5 %",
  },
  container: {
    flexDirection: "row",
  },
  textBoxStyles: {
    width: "100%",
  },
  btnText: {
    fontSize: responsiveFontSize(3.5),
    color: Colors.completedColor,
  },
  btnContainer: {
    paddingTop: "5%",
    width: "95%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  typeButtonIcon: responsiveFontSize(4),
  dateText: {
    fontSize: responsiveFontSize(2.3),
    paddingLeft: "6%",
  },
  dateButton: {
    height: responsiveHeight(7),
    borderBottomColor: "gray",
    borderBottomWidth: responsiveWidth(0.3),
    width: "94%",
    alignSelf: "center",
    justifyContent: "center",
  },
  dateError: {
    paddingTop: "1%",
    paddingLeft: "4%",
    fontSize: responsiveFontSize(1.66),
    color: "red",
  },
});
