import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { getVehiclesFromAPI } from "../StaticFiles/GetObjectsFromAPI";
import { CustomTexts, ButtonStyles } from "../StaticFiles/BasicStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { monthNames } from "../StaticFiles/staticData";
import ServiceBulletinRow from "../Components/ServiceBulletinRow";
import { Formik } from "formik";
import {
  HourServiceValidationSchemaTwo,
  MileageServiceValidationSchemaTwo,
} from "../Constents/ValidationScheemas";
import { createService, getServiceBulletins } from "../CommonFunctions/Service";
import AsyncStorage from "@react-native-community/async-storage";

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
  const [bulletinList, setBulletinList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({ type: 0 });
  const [vehicles, setVehicles] = useState([]);
  const [show, setShow] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [isElementsDisabled, setIsElementsDisabled] = useState(false);
  const [date, setDate] = useState(formatDate(new Date()));
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  const getVehicles = async () => {
    let ownerID = await AsyncStorage.getItem("ownerID");
    var vehiclesArray = await getVehiclesFromAPI(ownerID);

    const tempArray = [];

    vehiclesArray.data.forEach((element) => {
      let vehicleObj = {
        label: element.VRN + " " + element.nickName,
        value: element._id,
        type: element.vehicleType,
      };
      tempArray.push(vehicleObj);
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
    serviceObj.vehicleID = selectedVehicle.value;
    serviceObj.serviceDate = date;

    if (selectedVehicle.type === 0) {
      serviceObj.serviceMileage = parseInt(values.serviceMileage);
    } else {
      serviceObj.serviceHour = parseInt(values.serviceHour);
    }

    serviceObj.serviiceRemarks = values.serviiceRemarks;
    var ret = await createService(serviceObj);
    setIsLoadingVisible(false);
    if (ret.status === 201) {
      ToastAndroid.show("Service saved successfully", ToastAndroid.LONG);
      setTimeout(() => {
        props.navigation.goBack();
      }, 1500);
    } else {
      ToastAndroid.show("Unexpected error occured", ToastAndroid.SHORT);
      setTimeout(() => {
        props.navigation.goBack();
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
    setSelectedVehicle(vehicle);
    var ret = await getServiceBulletins(vehicle.type);
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
    <View style={styles.container}>
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
                disabled={selectedVehicle.value === undefined ? true : false}
              />
            </View>
            <View style={{ flexDirection: "row", paddingTop: "5%" }}>
              <View style={styles.rowLeftColumn}>
                <Text style={[CustomTexts, { paddingLeft: "10%" }]}>
                  Vehicle
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <DropDownPicker
                  items={vehicles}
                  containerStyle={{
                    paddingRight: "10%",
                    height: responsiveHeight(6),
                    width: responsiveWidth(50),
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  onChangeItem={(item) => {
                    selectVehicle(item);
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", paddingTop: "5%" }}>
              <View style={styles.rowLeftColumn}>
                <Text style={[CustomTexts, { paddingLeft: "10%" }]}>Date</Text>
              </View>
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={{
                    paddingRight: "10%",
                    height: responsiveHeight(6),
                    width: responsiveWidth(45),
                    justifyContent: "center",
                    backgroundColor: ButtonStyles.backgroundColor,
                    borderRadius: 4,
                  }}
                >
                  <Text style={styles.dateText}>{date}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            <View style={styles.inputRow}>
              {selectedVehicle.type === 0 ? (
                <Input
                  label="Service Mileage"
                  containerStyle={styles.textBoxStyles}
                  labelStyle={[CustomTexts]}
                  //   inputStyle={{ backgroundColor: "green" }}
                  onChangeText={handleChange("serviceMileage")}
                  onBlur={handleBlur("serviceMileage")}
                  value={values.serviceMileage}
                  errorMessage={touched.serviceMileage && errors.serviceMileage}
                  keyboardType="numeric"
                  //   disabled={isElementsDisabled}
                />
              ) : (
                <Input
                  label="Service Hour"
                  containerStyle={styles.textBoxStyles}
                  labelStyle={[CustomTexts]}
                  //   inputStyle={{ backgroundColor: "green" }}
                  onChangeText={handleChange("serviceHour")}
                  onBlur={handleBlur("serviceHour")}
                  value={values.serviceHour}
                  errorMessage={touched.serviceHour && errors.serviceHour}
                  keyboardType="numeric"
                  // disabled={isElementsDisabled}
                />
              )}
            </View>
            <View style={styles.inputRow}>
              <Input
                label="Service Remarks"
                containerStyle={styles.textBoxStyles}
                labelStyle={[CustomTexts]}
                //   inputStyle={{ backgroundColor: "green" }}
                onChangeText={handleChange("serviiceRemarks")}
                onBlur={handleBlur("serviiceRemarks")}
                value={values.serviiceRemarks}
                errorMessage={touched.serviiceRemarks && errors.serviiceRemarks}
                // disabled={isElementsDisabled}
              />
            </View>
            <ActivityIndicator
              animating={isLoadingVisible}
              size="large"
              color="#00ff00"
            />
            <FlatList
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
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    paddingLeft: "2%",
    paddingRight: "5%",
    alignItems: "center",
    paddingTop: "5%",
  },
  serviceBulletinsRow: {
    flexDirection: "row",
    paddingLeft: "5%",
    paddingRight: "5%",
    alignItems: "flex-start",
    alignItems: "center",
  },
  dateText: {
    fontSize: responsiveFontSize(2.3),
    paddingLeft: "6%",
  },
  textBoxStyles: {
    width: "100%",
  },
  rowLeftColumn: {
    width: "50%",
    justifyContent: "center",
  },
});

export default AddServiceScreen;
