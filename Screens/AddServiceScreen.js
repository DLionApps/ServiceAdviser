import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  YellowBox,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { getVehiclesFromAPI } from "../StaticFiles/GetObjectsFromAPI";
import {
  CustomTexts,
  ButtonStyles,
  textBoxStyles,
  titleStyle,
  Colors,
  submitButtonStyles,
} from "../StaticFiles/BasicStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { monthNames } from "../StaticFiles/staticData";
import ServiceBulletinRow from "../Components/ServiceBulletinRow";
import { Formik } from "formik";
import {
  HourServiceValidationSchemaTwo,
  MileageServiceValidationSchemaTwo,
} from "../Constents/ValidationScheemas";
import { createService, getServiceBulletins } from "../CommonFunctions/Service";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { ScrollView } from "react-native-gesture-handler";
import AlertComponent from "../Components/AlertComponent";

const formatDate = (date) => {
  return (
    date.getDate() +
    "-" +
    monthNames[date.getMonth()] +
    "-" +
    date.getFullYear()
  );
};

const AddServiceScreen = (props) => {
  YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

  const [bulletinList, setBulletinList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({ type: 0 });
  const [vehicles, setVehicles] = useState([]);
  const [show, setShow] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [date, setDate] = useState(formatDate(new Date()));
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  const [vehicleForDropdown, setVehicleForDropdown] = useState([]);

  const getVehicles = async () => {
    const tempArray = [{ name: "Vehicles", id: 1, children: [] }];

    let ownerID = await AsyncStorage.getItem("ownerID");
    var vehiclesArray = await getVehiclesFromAPI(ownerID);

    vehiclesArray.data.forEach((element) => {
      let vehicleObj = {
        name: element.VRN + " " + element.nickName,
        id: element._id,
        type: element.vehicleType,
      };
      tempArray[0].children.push(vehicleObj);
    });
    setVehicles(tempArray);
  };

  const onDateChange = (event, selectedDate) => {
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

  const saveServiceInfo = async (values) => {
    setIsLoadingVisible(true);

    let serviceObj = {};
    serviceObj.serviceBulletins = bulletinList;
    serviceObj.vehicleID = selectedVehicle.id;
    serviceObj.serviceDate = date;

    if (selectedVehicle.type === 0) {
      serviceObj.serviceMileage = parseInt(values.serviceMileage);
    } else {
      serviceObj.serviceHour = parseInt(values.serviceHour);
    }

    serviceObj.serviiceRemarks = values.serviiceRemarks;
    var ret = await createService(serviceObj);

    setIsLoadingVisible(false);

    if (ret.status === 201 || ret.status === 200) {
      AlertComponent("Service Insert", "Service saved successfully");
      setTimeout(() => {
        props.navigation.navigate("Service", {
          reloadUI: true,
          vehicleID: serviceObj.vehicleID,
        });
      }, 1500);
    } else {
      AlertComponent("Service Insert", "Unexpected error occured");
      setTimeout(() => {
        props.navigation.navigate("Service", {
          reloadUI: true,
          vehicleID: serviceObj.vehicleID,
        });
      }, 1500);
    }
  };

  const updateBulletinList = (id, isChecked) => {
    let tempBulletinList = [...bulletinList];
    tempBulletinList.forEach((x) => {
      if (x.key == id.toString()) {
        x.isChecked = isChecked;
      }
    });

    setBulletinList(tempBulletinList);
  };

  const selectVehicle = async (vehicle) => {
    setVehicleForDropdown(vehicle);
    let selectedViehicle = vehicles[0].children.filter(
      (x) => x.id == vehicle
    )[0];

    setSelectedVehicle(selectedViehicle);
    var ret = await getServiceBulletins(selectedViehicle.type);
    let tempBulletinList = [];
    ret.data.forEach((x) => {
      tempBulletinList = [
        ...tempBulletinList,
        { title: x.title, key: x._id, isChecked: false },
      ];
    });
    setBulletinList(tempBulletinList);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            serviceMileage: "",
            serviceHour: "",
            serviiceRemarks: "",
          }}
          validationSchema={
            selectedVehicle.type === 0
              ? MileageServiceValidationSchemaTwo
              : HourServiceValidationSchemaTwo
          }
          onSubmit={(values) => {
            saveServiceInfo(values);
          }}
          enableReinitialize={true}
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
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: "12%",
                }}
              >
                <SectionedMultiSelect
                  styles={{
                    selectToggleText: { paddingLeft: "5%" },
                    selectToggle: [
                      textBoxStyles,
                      {
                        width: "96%",
                        alignContent: "space-around",
                        height: "84%",
                        justifyContent: "center",
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
                  items={vehicles}
                  uniqueKey="id"
                  subKey="children"
                  selectText="Select a Vehicle"
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={selectVehicle}
                  single={true}
                  selectedItems={vehicleForDropdown}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: "12%",
                }}
              >
                <Button
                  containerStyle={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    borderWidth: responsiveWidth(0.3),
                    borderColor: "#68B2A0",
                    width: "95%",
                    height: "70%",
                    justifyContent: "center",
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

              <View style={styles.inputRow}>
                {selectedVehicle.type === 0 ? (
                  <Input
                    placeholder="Service Mileage"
                    inputContainerStyle={textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("serviceMileage")}
                    onBlur={handleBlur("serviceMileage")}
                    value={values.serviceMileage}
                    errorMessage={
                      touched.serviceMileage && errors.serviceMileage
                    }
                    keyboardType="numeric"
                  />
                ) : (
                  <Input
                    placeholder="Service Hour"
                    inputContainerStyle={textBoxStyles}
                    leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                    onChangeText={handleChange("serviceHour")}
                    onBlur={handleBlur("serviceHour")}
                    value={values.serviceHour}
                    errorMessage={touched.serviceHour && errors.serviceHour}
                    keyboardType="numeric"
                  />
                )}
              </View>
              <View style={styles.inputRow}>
                <Input
                  placeholder="Service Remarks"
                  inputContainerStyle={textBoxStyles}
                  leftIcon={<Icon name="envelope" size={18} color="#fff" />}
                  onChangeText={handleChange("serviiceRemarks")}
                  onBlur={handleBlur("serviiceRemarks")}
                  value={values.serviiceRemarks}
                  errorMessage={
                    touched.serviiceRemarks && errors.serviiceRemarks
                  }
                />
              </View>
              <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                  style={{ backgroundColor: "#eeeeee" }}
                  data={bulletinList}
                  renderItem={({ item }) => (
                    <ServiceBulletinRow
                      title={item.title}
                      isChecked={item.isChecked}
                      id={item.key.toString()}
                      updateFunction={updateBulletinList}
                    />
                  )}
                  extraData={bulletinList}
                  keyExtractor={(item) => item.key.toString()}
                ></FlatList>
              </SafeAreaView>

              <ActivityIndicator
                animating={isLoadingVisible}
                size="large"
                color="#00ff00"
              />
              <View style={styles.btnContainer}>
                <Button
                  type="outline"
                  onPress={() => {
                    props.navigation.navigate("Service", {
                      reloadUI: true,
                      vehicleID: vehicleForDropdown,
                    });
                  }}
                  title="Cancel"
                  titleStyle={submitButtonStyles.titleStyle}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    { backgroundColor: "#6D6D6D", width: "40%", height: "70%" },
                  ]}
                  disabled={isLoadingVisible}
                />
                <Button
                  type="outline"
                  onPress={handleSubmit}
                  title="Submit"
                  titleStyle={submitButtonStyles.titleStyle}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    { width: "40%", height: "70%" },
                  ]}
                  disabled={isLoadingVisible}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    width: "100%",
    alignItems: "center",
  },
  btnContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    height: "10%",
    width: "100%",
  },
  wrapperContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "5%",
  },
});

export default AddServiceScreen;
