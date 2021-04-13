import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { screenHeading } from "../StaticFiles/BasicStyles";
import AddOwnsersInfoComponent from "../Components/AddOwnsersInfoComponent";
import AddVehicleInformationComponent from "../Components/AddVehicleInformationComponent";
// import AddServicesInfoComponent from "../Components/AddServicesInfoComponent";
import TempServiceInfo from "../Components/TempServiceInfo";
import Stepper from "../Components/Stepper";
import { stepperArray } from "../StaticFiles/staticData";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function AddVehicleScreen({ navigation }) {
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
    setSelectedVehicleType(index);
  };
  return (
    <View style={styles.wrapperContainer}>
      <Text style={screenHeading}>Add New Vehicle</Text>
      <View style={styles.stepperWrapper}>
        <Stepper
          stepData={stepperArray}
          currentStep={currentStep}
          lastCompletedStep={lastCompletedStep}
        />
      </View>
      {currentStep === 1 && (
        <AddOwnsersInfoComponent
          goThroughStepsFunc={goThroughSteps}
          navigation={navigation}
        />
      )}
      {currentStep === 2 && (
        <AddVehicleInformationComponent
          goThroughStepsFunc={goThroughSteps}
          setVehicleType={selectVehicleType}
          isFromSignup={true}
        />
      )}
      {currentStep === 3 && (
        // <AddServicesInfoComponent
        //   goThroughStepsFunc={goThroughSteps}
        //   selectedVehicleTypeIndex={selectedVehicleType}
        //   navigation={navigation}
        // />
        <TempServiceInfo
          goThroughStepsFunc={goThroughSteps}
          selectedVehicleTypeIndex={selectedVehicleType}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: getStatusBarHeight() + 10,
  },
  stepperWrapper: {
    width: "100%",
  },
});
