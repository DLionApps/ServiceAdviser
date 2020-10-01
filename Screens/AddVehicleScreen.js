// import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, forwardRef } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { screenHeading } from "../StaticFiles/BasicStyles";
import AddOwnsersInfoComponent from "../Components/AddOwnsersInfoComponent";
import AddVehicleInformationComponent from "../Components/AddVehicleInformationComponent";
import AddServicesInfoComponent from "../Components/AddServicesInfoComponent";
import Stepper from "../Components/Stepper";
import { stepperArray } from "../StaticFiles/staticData";

export default function AddVehicleScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [lastCompletedStep, setLastCompletedStep] = useState(0);
  const [selectedVehicleType, setSelectedVehicleType] = useState(0);

  const goThroughSteps = (isForward) => {
    if (isForward === true) {
      setLastCompletedStep(lastCompletedStep + 1);
      setCurrentStep(currentStep + 1);
    } else {
      setLastCompletedStep(lastCompletedStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const selectVehicleType = (index) => {
    //console.log(index);
    setSelectedVehicleType(index);
  };
  return (
    <View style={styles.wrapperContainer}>
      <Text style={screenHeading}>Add New Vehicle</Text>
      <View style={styles.stepperWrapper}>
        <Stepper
          // stepCount={1}
          stepData={stepperArray}
          currentStep={currentStep}
          lastCompletedStep={lastCompletedStep}
        />
      </View>
      {currentStep === 1 && (
        <AddOwnsersInfoComponent goThroughStepsFunc={goThroughSteps} />
      )}
      {currentStep === 2 && (
        <AddVehicleInformationComponent
          goThroughStepsFunc={goThroughSteps}
          setVehicleType={selectVehicleType}
        />
      )}
      {currentStep === 3 && (
        <AddServicesInfoComponent
          goThroughStepsFunc={goThroughSteps}
          selectedVehicleTypeIndex={selectedVehicleType}
        />
      )}

      {/* <ProgressSteps>
        <ProgressStep label="Add Owner's Information">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 1!</Text>
            <AddOwnsersInfoComponent />
          </View>
        </ProgressStep>
        <ProgressStep label="Add Vehicle Information">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Add Service Information">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight + 10,
    // backgroundColor: "yellow",
  },
  stepperWrapper: {
    // paddingTop: "5%",
    // height: "10%",
    width: "100%",
    // backgroundColor: "blue",
  },
});
