// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
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

export default function AddVehicleInformationComponent(props) {
  //   const Stack = createStackNavigator();
  const [forwardBtnDisabled, setForwardBtnDisabled] = useState(true);
  const [backwardBtnDisabled, setbackwrdBtnDisabled] = useState(true);
  const [fuelType, setFuelType] = useState([]);

  const goBack = () => {
    props.goThroughStepsFunc(false);
  };

  const fueltypeChange = (item) => {
    setFuelType(item);
  };

  const storeVehicleInfo = (values) => {
    console.log(values);
  };

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
            // milleage: "",
            mfgYear: "",
          }}
          // validationSchema={OwnerValidationSchema}
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
              <View style={styles.container}>
                {/* <Input
                  label="Milleage"
                  containerStyle={styles.textBoxStyles}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("milleage")}
                  onBlur={handleBlur("milleage")}
                  keyboardType="decimal-pad"
                  value={values.milleage}
                  errorMessage={touched.milleage && errors.milleage}
                /> */}
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
                <ButtonGroup
                  // onPress={this.updateIndex}
                  selectedIndex={0}
                  buttons={vehicleTypes}
                  containerStyle={{ width: "50%" }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <SectionedMultiSelect
                  items={vehiclePowerSources}
                  uniqueKey="id"
                  subKey="children"
                  selectText="Vehicle power source"
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={fueltypeChange}
                  selectedItems={fuelType}
                />
              </View>
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
  sss: {},
});
