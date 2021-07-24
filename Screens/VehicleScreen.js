import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import ListViewComponent from "../Components/ListViewComponent";
import { FloatingAction } from "react-native-floating-action";
import { getVehiclesFromAPI } from "../StaticFiles/GetObjectsFromAPI";
import { useIsFocused } from "@react-navigation/native";
import AlertComponent from "../Components/AlertComponent";
import { deleteVehicle } from "../CommonFunctions/Vehicle";

const VehicleScreen = (props) => {
  const actions = [
    {
      text: "Add Vehicle",
      name: "addVehicle",
      position: 1,
    },
  ];

  const [vehicles, setVehicles] = useState([]);
  const [ownerID, setOwnerID] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (props.route.params.reloadUI === true) {
      getVehicles();
    }
  }, [isFocused]);

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    let ownerId = await AsyncStorage.getItem("ownerID");
    setOwnerID(ownerId);
    var vehiclesArray = await getVehiclesFromAPI(ownerId);
    const tempArray = [];

    vehiclesArray.data.forEach((element) => {
      let vehicleObj = {
        id: element._id,
        nickName: element.nickName,
        make: element.make,
        model: element.model,
      };
      tempArray.push(vehicleObj);
    });
    setVehicles(tempArray);
  };

  const editVehicle = (id) => {
    props.navigation.navigate("EditVehicle", {
      vehicleId: id,
      ownerID: ownerID,
    });
  };

  const showDeleteConfirmation = (id) => {
    Alert.alert(
      "Delete vehicle",
      "Are you sure you want to delete this vehicle?",
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

  const deleteServiceObj = async (vehicleID) => {
    var ret = await deleteVehicle(vehicleID);

    if (ret.status === 200) {
      AlertComponent("Delete vehicle", "Vehicle deleted successfully");
    } else {
      AlertComponent("Delete vehicle", "Unexpected error occured");
    }
    getVehicles();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vehicles}
        renderItem={({ item }) => (
          <ListViewComponent
            valueOne={item.make}
            valueTwo={item.model}
            valueThree={item.nickName}
            id={item.id.toString()}
            titleOne="Make"
            titleTwo="Model"
            titleThree="Nick Name"
            buttonActionOne={editVehicle}
            buttonActionTwo={showDeleteConfirmation}
          />
        )}
        extraData={vehicles}
        keyExtractor={(item) => item.id.toString()}
      />
      <FloatingAction
        actions={actions}
        onPressItem={() => {
          props.navigation.navigate("AddVehicle", { isEdit: false });
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
  },
});

export default VehicleScreen;
