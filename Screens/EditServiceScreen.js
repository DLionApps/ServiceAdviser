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
import { getServiceFromAPIByID } from "../StaticFiles/GetObjectsFromAPI";
import { CustomTexts, ButtonStyles } from "../StaticFiles/BasicStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { monthNames } from "../StaticFiles/staticData";
import ServiceBulletinRow from "../Components/ServiceBulletinRow";
import { Formik } from "formik";
import {
  HourServiceValidationSchemaTwo,
  MileageServiceValidationSchemaTwo,
} from "../Constents/ValidationScheemas";
import { editService } from "../CommonFunctions/Service";

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
  const { serviceId, vehicle } = props.route.params;
  const [bulletinList, setBulletinList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({ type: 0 });
  const [show, setShow] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [date, setDate] = useState(formatDate(new Date()));
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
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const saveServiceInfo = async (values) => {
    setIsLoadingVisible(true);
    var ret;
    let serviceObj = {};
    serviceObj.serviceBulletins = bulletinList;
    serviceObj.vehicleID = vehicle.value;
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
      ToastAndroid.show("Service saved successfully", ToastAndroid.LONG);
      setTimeout(() => {
        props.navigation.navigate("Service", {
          reloadUI: true,
          vehicleID: serviceObj.vehicleID,
        });
      }, 1500);
    } else {
      ToastAndroid.show("Unexpected error occured", ToastAndroid.SHORT);
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
    setService(ret.data);
    setBulletinList(ret.data.serviceBulletins);
    setSelectedVehicle(vehicle);
  };

  useEffect(() => {
    getServiceById(serviceId);
  }, [serviceId]);

  return (
    <View style={styles.container}>
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
              />
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

export default EditServiceScreen;
