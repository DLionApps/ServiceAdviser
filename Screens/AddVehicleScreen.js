import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Button, Input, Text, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../StaticFiles/BasicStyles";
import { vehiclePowerSources, vehicleTypes } from "../StaticFiles/staticData";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { VehicleValidationSchema } from "../Constents/ValidationScheemas";
import { VehicleContext } from "../Contexts/VehicleContext";
import { createVehicle } from "../CommonFunctions/Vehicle";
import AsyncStorage from "@react-native-community/async-storage";

export default function AddVehicleScreen(props) {
  const { vehicleState } = useContext(VehicleContext);
  const [vehicle, setVehicle] = vehicleState;
  const [fuelType, setFuelType] = useState(
    vehicle === undefined ? [] : vehicle.fuelType
  );
  const [vehicleType, setVehicleType] = useState(
    vehicle === undefined ? 0 : vehicle.vehicleType
  );
  const [vehicleFuelTypeError, setVehicleFuelTypeError] = useState(false);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
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
          setIsLoadingVisible(true);
          let ownerID = await AsyncStorage.getItem("ownerID");
          values.ownerID = ownerID;
          let vehicleRet = await createVehicle(values);
          setIsLoadingVisible(false);
          if (vehicleRet.status === 201) {
            ToastAndroid.show("Vehicle saved successfully", ToastAndroid.LONG);
            setTimeout(() => {
              props.navigation.navigate("Vehicle", {
                reloadUI: true,
              });
            }, 1500);
          } else {
            ToastAndroid.show("Unexpected error occured", ToastAndroid.SHORT);
            setTimeout(() => {
              props.navigation.navigate("Vehicle", {
                reloadUI: true,
              });
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
            VRN: "",
            nickName: "",
            make: "",
            model: "",
            mfgYear: "",
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
            <>
              <View
                style={{
                  alignItems: "flex-end",
                  paddingTop: "5%",
                  paddingRight: "5%",
                }}
              >
                <Button
                  title="Save"
                  type="outline"
                  onPress={handleSubmit}
                  containerStyle={{
                    width: "47%",
                  }}
                  // disabled={selectedVehicle.value === undefined ? true : false}
                />
              </View>
              <ScrollView contentContainerStyle={styles.wrapperContainer}>
                <View style={styles.container}>
                  <Input
                    label="Registration Number"
                    placeholder="AA-0000"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("VRN")}
                    onBlur={handleBlur("VRN")}
                    value={values.VRN}
                    errorMessage={touched.VRN && errors.VRN}
                  />
                  <Input
                    label="Nick Name"
                    placeholder="Nitro"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="lock" size={24} color="#fff" />}
                    onChangeText={handleChange("nickName")}
                    onBlur={handleBlur("nickName")}
                    value={values.nickName}
                    errorMessage={touched.nickName && errors.nickName}
                  />
                </View>
                <View style={styles.container}>
                  <Input
                    label="Make"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("make")}
                    onBlur={handleBlur("make")}
                    value={values.make}
                    errorMessage={touched.make && errors.make}
                  />
                  <Input
                    label="Model"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="lock" size={24} color="#fff" />}
                    onChangeText={handleChange("model")}
                    onBlur={handleBlur("model")}
                    value={values.model}
                    errorMessage={touched.model && errors.model}
                  />
                </View>
                <View style={[styles.container, { width: "100%" }]}>
                  <Input
                    label="Manufactured Year"
                    containerStyle={styles.textBoxStyles}
                    leftIcon={<Icon name="lock" size={24} color="#fff" />}
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
                    containerStyle={{
                      width: "100%",
                      borderWidth: responsiveWidth(0.2),
                      borderColor: "gray",
                    }}
                    selectedButtonStyle={{
                      backgroundColor: Colors.completedColor,
                    }}
                  />
                </View>
                <View style={{ width: "100%", paddingTop: "6%" }}>
                  <SectionedMultiSelect
                    styles={{
                      selectToggle: {
                        borderColor: "gray",
                        borderWidth: responsiveWidth(0.2),
                        width: "96%",
                        alignSelf: "center",
                      },
                      chipsWrapper: {
                        // alignContent: "center",
                        width: "96%",
                        alignSelf: "center",
                      },
                      chipContainer: {
                        backgroundColor: Colors.completedColor,
                      },
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
                <ActivityIndicator
                  animating={isLoadingVisible}
                  size="large"
                  color="#00ff00"
                />
              </ScrollView>
            </>
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
  },
  container: {
    flexDirection: "row",
  },
  textBoxStyles: {
    width: "50%",
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
  powerSourceError: {
    paddingLeft: "4%",
    fontSize: responsiveFontSize(1.66),
    color: "red",
  },
});
