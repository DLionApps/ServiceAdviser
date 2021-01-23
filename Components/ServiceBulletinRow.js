import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text, CheckBox } from "react-native-elements";
import { CustomTexts } from "../StaticFiles/BasicStyles";

export default (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [isInitial, setIsIntial] = useState(true);

  useEffect(() => {
    setIsIntial(false);
  }, [isInitial]);

  useEffect(() => {
    if (isInitial === false) {
      props.updateFunction(props.id, isChecked);
    }
  }, [isChecked]);

  return (
    <View style={styles.serviceBulletinsRow}>
      <Text style={[CustomTexts, { width: "85%" }]}>{props.title}</Text>
      <CheckBox
        checked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  serviceBulletinsRow: {
    flexDirection: "row",
    paddingLeft: "5%",
    paddingRight: "5%",
    alignItems: "flex-start",
    alignItems: "center",
  },
});
