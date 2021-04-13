import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import ListViewComponent from "../Components/ListViewComponent";
import { FloatingAction } from "react-native-floating-action";
import DropDownPicker from "react-native-dropdown-picker";
import {
  getVehiclesFromAPI,
  getServicesFromAPI,
} from "../StaticFiles/GetObjectsFromAPI";
import { useIsFocused } from "@react-navigation/native";

const ServiceScreen = (props) => {
  const actions = [
    {
      text: "Add Service",
      name: "addService",
      position: 1,
    },
  ];

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    if (props.route.params.reloadUI === true) {
      setSelectedVehicleService(props.route.params.vehicleID);
    }
  }, [isFocused]);

  useEffect(() => {
    getVehicles();
  }, []);

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

  const getServices = async (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedVehicleService(vehicle.value);
  };

  const setSelectedVehicleService = async (vehicle) => {
    var servicesArray = await getServicesFromAPI(vehicle);

    const tempArray = [];

    servicesArray.data.forEach((element) => {
      let serviceObj = {
        id: element._id,
        serviceMileage: element.serviceMileage,
        serviceDate: element.serviceDate,
      };
      tempArray.push(serviceObj);
    });
    setServices(tempArray);
  };

  const editService = (id) => {
    props.navigation.navigate("EditService", {
      serviceId: id,
      vehicle: selectedVehicle,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "50%", height: "15%" }}>
        <DropDownPicker
          items={vehicles}
          containerStyle={{
            // paddingRight: "10%",
            height: responsiveHeight(6),
            width: responsiveWidth(50),
          }}
          dropDownStyle={{ backgroundColor: "#fafafa", height: "100%" }}
          onChangeItem={(item) => {
            getServices(item);
          }}
        />
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <ListViewComponent
            valueOne={item.serviceDate}
            valueTwo={item.serviceMileage}
            valueThree={undefined}
            id={item.id.toString()}
            titleOne="Service Date"
            titleTwo="Service Mileage"
            buttonActionOne={editService}
          />
        )}
        extraData={services}
        keyExtractor={(item) => item.id.toString()}
      />
      <FloatingAction
        actions={actions}
        onPressItem={() => {
          props.navigation.navigate("AddService", { isEdit: false });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
  container: {
    flex: 1,
    // backgroundColor: "blue",
    // flexDirection: "row",
  },
});

export default ServiceScreen;
