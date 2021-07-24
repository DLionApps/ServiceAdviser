import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import {
  Button,
  Input,
  Text,
  ButtonGroup,
  colors,
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import {
  Colors,
  textBoxStyles,
  submitButtonStyles,
  titleStyle,
} from "../StaticFiles/BasicStyles";
import { vehiclePowerSources, vehicleTypes } from "../StaticFiles/staticData";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { VehicleValidationSchema } from "../Constents/ValidationScheemas";
import { VehicleContext } from "../Contexts/VehicleContext";
import { createVehicle } from "../CommonFunctions/Vehicle";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddVehicleInformationComponent(props) {
  const { vehicleState } = useContext(VehicleContext);
  const [vehicle, setVehicle] = vehicleState;
  const [forwardBtnDisabled, setForwardBtnDisabled] = useState(true);
  const [backwardBtnDisabled, setbackwrdBtnDisabled] = useState(true);
  const [fuelType, setFuelType] = useState(
    vehicle === undefined ? [] : vehicle.fuelType
  );
  const [vehicleType, setVehicleType] = useState(
    vehicle === undefined ? 0 : vehicle.vehicleType
  );
  const [vehicleFuelTypeError, setVehicleFuelTypeError] = useState(false);

  const goBack = () => {
    props.goThroughStepsFunc(false);
  };

  const fueltypeChange = (item) => {
    if (item.length === 0) {
      setVehicleFuelTypeError(true);
    } else {
      setVehicleFuelTypeError(false);
    }
    setFuelType(item);
  };

  const storeVehicleInfo = async (values) => {
    if (fuelType.length !== 0) {
      if (Object.keys(values).length !== 0) {
        values.fuelType = fuelType;
        values.vehicleType = vehicleType;

        if (props.isFromSignup === true) {
          setVehicle(values);
          props.goThroughStepsFunc(true);
        } else {
          let ownerID = await AsyncStorage.getItem("ownerID");
          values.ownerID = ownerID;
          let vehicleRet = await createVehicle(values);
          if (vehicleRet.status === 201) {
            ToastAndroid.show("Vehicle saved successfully", ToastAndroid.LONG);
            setTimeout(() => {
              props.navigation.goBack();
            }, 1500);
          } else {
            ToastAndroid.show("Unexpected error occured", ToastAndroid.SHORT);
            setTimeout(() => {
              props.navigation.goBack();
            }, 1500);
          }
        }
      }
    } else {
      setVehicleFuelTypeError(true);
    }
  };

  useEffect(() => {
    if (props.isFromSignup == true) {
      props.setVehicleType(vehicleType);
    }
  }, [vehicleType]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            VRN: vehicle === undefined ? "" : vehicle.VRN,
            nickName: vehicle === undefined ? "" : vehicle.nickName,
            make: vehicle === undefined ? "" : vehicle.make,
            model: vehicle === undefined ? "" : vehicle.model,
            mfgYear: vehicle === undefined ? "" : vehicle.mfgYear,
          }}
          validationSchema={VehicleValidationSchema}
          onSubmit={(values) => storeVehicleInfo(values)}
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
                  placeholder="Vehicle Number"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("VRN")}
                  onBlur={handleBlur("VRN")}
                  value={values.VRN}
                  errorMessage={touched.VRN && errors.VRN}
                />
                <Input
                  placeholder="Nick Name"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="lock" size={24} color="#fff" />}
                  onChangeText={handleChange("nickName")}
                  onBlur={handleBlur("nickName")}
                  value={values.nickName}
                  errorMessage={touched.nickName && errors.nickName}
                />
              </View>
              <View style={styles.container}>
                <Input
                  placeholder="Make"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("make")}
                  onBlur={handleBlur("make")}
                  value={values.make}
                  errorMessage={touched.make && errors.make}
                />
                <Input
                  placeholder="Model"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="lock" size={18} color="#fff" />}
                  onChangeText={handleChange("model")}
                  onBlur={handleBlur("model")}
                  value={values.model}
                  errorMessage={touched.model && errors.model}
                />
              </View>
              <View style={[styles.container, { width: "100%" }]}>
                <Input
                  placeholder="Manufactured Year"
                  inputContainerStyle={textBoxStyles}
                  containerStyle={{ width: "50%" }}
                  leftIcon={<Icon name="lock" size={18} color="#fff" />}
                  onChangeText={handleChange("mfgYear")}
                  onBlur={handleBlur("mfgYear")}
                  keyboardType="numeric"
                  value={values.mfgYear}
                  errorMessage={touched.mfgYear && errors.mfgYear}
                />
              </View>
              <View
                style={[
                  styles.container,
                  { paddingLeft: "2%", paddingRight: "2%" },
                ]}
              >
                <ButtonGroup
                  onPress={(e) => setVehicleType(e)}
                  selectedIndex={vehicleType}
                  buttons={vehicleTypes}
                  containerStyle={[
                    textBoxStyles,
                    {
                      width: "100%",
                    },
                  ]}
                  selectedButtonStyle={{
                    backgroundColor: Colors.completedColor,
                  }}
                />
              </View>
              <View style={{ width: "100%", paddingTop: "6%" }}>
                <SectionedMultiSelect
                  styles={{
                    selectToggleText: { paddingLeft: "5%" },
                    selectToggle: [
                      textBoxStyles,
                      {
                        width: "96%",
                        alignSelf: "center",
                      },
                    ],
                    chipsWrapper: {
                      width: "96%",
                      alignSelf: "center",
                    },
                    chipContainer: { borderColor: "white" },
                    chipText: titleStyle,

                    button: {
                      backgroundColor: Colors.completedColor,
                    },
                  }}
                  items={vehiclePowerSources}
                  uniqueKey="id"
                  subKey="children"
                  selectText="Vehicle power source"
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={fueltypeChange}
                  selectedItems={fuelType}
                />
                {vehicleFuelTypeError === true && (
                  <Text style={styles.powerSourceError}>
                    Vehicle Power Source is required
                  </Text>
                )}
              </View>
              <View style={styles.btnContainer}>
                {props.isFromSignup === true && (
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
                  />
                )}

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
  powerSourceError: {
    paddingLeft: "4%",
    fontSize: responsiveFontSize(1.66),
    color: "red",
  },
});
