import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
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
import { getServiceFromAPIByID } from "../StaticFiles/GetObjectsFromAPI";
import {
  CustomTexts,
  ButtonStyles,
  textBoxStyles,
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
import { editService } from "../CommonFunctions/Service";
import Icon from "react-native-vector-icons/FontAwesome";
import AlertComponent from "../Components/AlertComponent";
import { ScrollView } from "react-native-gesture-handler";

const formatDate = (date) => {
  return (
    date.getDate() +
    "-" +
    monthNames[date.getMonth()] +
    "-" +
    date.getFullYear()
  );
};

const EditServiceScreen = (props) => {
  YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

  const { serviceId, vehicle } = props.route.params;
  const [bulletinList, setBulletinList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({ type: 0 });
  const [show, setShow] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [date, setDate] = useState(formatDate(new Date()));
  const [initialDate, setInitialDate] = useState();
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [service, setService] = useState({
    serviceDate: "",
    serviceMileage: "",
    serviiceRemarks: "",
  });

  const onDateChange = (event, selectedDate) => {
    let currentDate =
      selectedDate !== undefined ? formatDate(selectedDate) : date;
    setShow(Platform.OS === "ios");
    if (currentDate !== undefined) {
      setDateError(false);
    }
    setDate(currentDate);
    setInitialDate(new Date(currentDate));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const saveServiceInfo = async (values) => {
    setIsLoadingVisible(true);
    var ret;
    let serviceObj = {};
    serviceObj.serviceBulletins = bulletinList;
    serviceObj.vehicleID = vehicle.id;
    serviceObj.serviceDate = date;

    if (selectedVehicle.type === 0) {
      serviceObj.serviceMileage = parseInt(values.serviceMileage);
    } else {
      serviceObj.serviceHour = parseInt(values.serviceHour);
    }

    serviceObj.serviiceRemarks = values.serviiceRemarks;
    serviceObj._id = serviceId;
    ret = await editService(serviceObj, serviceObj._id);

    setIsLoadingVisible(false);
    if (ret.status === 201 || ret.status === 200) {
      AlertComponent("Service Edit", "Service saved successfully");

      setTimeout(() => {
        props.navigation.navigate("Service", {
          reloadUI: true,
          vehicleID: serviceObj.vehicleID,
        });
      }, 1500);
    } else {
      AlertComponent("Service Edit", "Unexpected error occured");

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

  const getServiceById = async (id) => {
    let ret = await getServiceFromAPIByID(id);
    setDate(ret.data.serviceDate);
    setInitialDate(new Date(ret.data.serviceDate));
    setService(ret.data);
    setBulletinList(ret.data.serviceBulletins);
    setSelectedVehicle(vehicle);
  };

  useEffect(() => {
    getServiceById(serviceId);
  }, [serviceId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            serviceMileage: service.serviceMileage.toString(),
            serviceHour: service.serviceDate.toString(),
            serviiceRemarks: service.serviiceRemarks,
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
                  value={initialDate}
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
                      vehicleID: vehicle.id,
                    });
                  }}
                  title="Cancel"
                  titleStyle={submitButtonStyles.titleStyle}
                  containerStyle={[
                    submitButtonStyles.containerStyle,
                    {
                      backgroundColor: "#6D6D6D",
                      width: "40%",
                      height: "70%",
                    },
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

export default EditServiceScreen;
