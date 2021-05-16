import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import ListViewComponent from "../Components/ListViewComponent";
import { FloatingAction } from "react-native-floating-action";
import {
  getVehiclesFromAPI,
  getServicesFromAPI,
} from "../StaticFiles/GetObjectsFromAPI";
import { useIsFocused } from "@react-navigation/native";
import { titleStyle, Colors, textBoxStyles } from "../StaticFiles/BasicStyles";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { deleteService } from "../CommonFunctions/Service";
import AlertComponent from "../Components/AlertComponent";

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
  const [vehicleForDropdown, setVehicleForDropdown] = useState([]);

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

  const showDeleteConfirmation = (id) => {
    Alert.alert(
      "Delete service",
      "Are you sure you want to delete this service record?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteServiceObj(id);
          },
        },
      ]
    );
  };

  const deleteServiceObj = async (serviceID) => {
    var ret = await deleteService(serviceID);

    if (ret.status === 200) {
      AlertComponent("Delete service", "Service deleted successfully");
    } else {
      AlertComponent("Delete service", "Unexpected error occured");
    }
    setSelectedVehicleService(selectedVehicle.id);
  };

  const selectVehicle = async (vehicle) => {
    setVehicleForDropdown(vehicle);
    let selectedViehicle = vehicles[0].children.filter(
      (x) => x.id == vehicle
    )[0];

    setSelectedVehicle(selectedViehicle);
    setSelectedVehicleService(selectedViehicle.id);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: "5%" }}></View>
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
      <FlatList
        style={{ backgroundColor: "#eeeeee" }}
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
            buttonActionTwo={showDeleteConfirmation}
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
    </View>
  );
};

const styles = StyleSheet.create({
  signupBtnText: {
    fontSize: responsiveFontSize(2.5),
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ServiceScreen;
