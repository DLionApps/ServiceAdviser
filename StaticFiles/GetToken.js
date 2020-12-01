import { AsyncStorage } from "react-native";

export default async () => {
  try {
    const token = await AsyncStorage.getItem("auth-token");
    return token;
  } catch (error) {
    console.log(error);
  }
};
