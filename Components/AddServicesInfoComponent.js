// import { StatusBar } from "expo-status-bar";
import React, { useState, createRef, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Text, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, CustomTexts } from "../StaticFiles/BasicStyles";
import {
  vehiclePowerSources,
  vehicleTypes,
  monthNames,
} from "../StaticFiles/staticData";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {
  MileageServiceValidationSchema,
  HourServiceValidationSchema,
} from "../Constents/ValidationScheemas";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ServiceContext } from "../Contexts/ServiceContext";

export default function AddServicesInfoComponent(props) {
  //   const Stack = createStackNavigator();
  const { serviceState } = useContext(ServiceContext);
  const [service, setService] = serviceState;
  const [forwardBtnDisabled, setForwardBtnDisabled] = useState(true);
  const [backwardBtnDisabled, setbackwrdBtnDisabled] = useState(true);
  const [fuelType, setFuelType] = useState([]);
  const [vehicleType, setVehicleType] = useState(0);
  const [selectedVehicleType, setSelectedVehicleType] = useState(
    props.selectedVehicleTypeIndex
  );

  const [date, setDate] = useState(
    service === undefined ? undefined : service.lastServiceDate
  );
  const [show, setShow] = useState(false);
  const [dateError, setDateError] = useState(false);

  const onChange = (event, selectedDate) => {
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
        values.lastServiceDate = date;
        console.log(values);
        setService(values);

        // props.goThroughStepsFunc(true);
      }
    } else {
      setDateError(true);
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
                    label="Total Mileage"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("mileage")}
                    onBlur={handleBlur("mileage")}
                    value={values.mileage}
                    errorMessage={touched.mileage && errors.mileage}
                    keyboardType="numeric"
                  />
                ) : (
                  <Input
                    label="Total Working Hours"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="lock" size={24} color="#fff" />}
                    onChangeText={handleChange("workingHours")}
                    onBlur={handleBlur("workingHours")}
                    value={values.workingHours}
                    errorMessage={touched.workingHours && errors.workingHours}
                    keyboardType="numeric"
                  />
                )}
              </View>
              <View style={styles.container}>
                {selectedVehicleType === 0 ? (
                  <Input
                    label="Recent Oil & Manintenence Service Mileage"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("lastServiceMileage")}
                    onBlur={handleBlur("lastServiceMileage")}
                    value={values.lastServiceMileage}
                    errorMessage={
                      touched.lastServiceMileage && errors.lastServiceMileage
                    }
                    keyboardType="numeric"
                  />
                ) : (
                  <Input
                    label="Recent Oil & Manintenence Service Hours"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="lock" size={24} color="#fff" />}
                    onChangeText={handleChange("lastServiceHours")}
                    onBlur={handleBlur("lastServiceHours")}
                    value={values.lastServiceHours}
                    errorMessage={
                      touched.lastServiceHours && errors.lastServiceHours
                    }
                    keyboardType="numeric"
                  />
                )}
              </View>
              {/* <View style={styles.container}>
                <Input
                  label="Recent Oil & Manintenence Service Date"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("lastServiceDate")}
                  onBlur={handleBlur("lastServiceDate")}
                  value={values.lastServiceDate}
                  errorMessage={
                    touched.lastServiceDate && errors.lastServiceDate
                  }
                />
              </View> */}

              <View
                style={{
                  width: "100%",
                }}
              >
                <Text style={[CustomTexts, { paddingLeft: "3%" }]}>
                  Recent Oil & Manintenence Service Date
                </Text>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.dateButton}
                >
                  <Text style={styles.dateText}>{date}</Text>
                </TouchableOpacity>
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
                  display="default"
                  onChange={onChange}
                />
              )}

              <View style={styles.btnContainer}>
                <Button
                  type="clear"
                  onPress={() => {
                    goBack();
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
                  // disabled={backwardBtnDisabled}
                />
                <Button
                  type="clear"
                  onPress={handleSubmit}
                  title="Submit"
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
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
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
    width: "80%",
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
  sss: {
    // fontWeight:"bold"
  },
});
