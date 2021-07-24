import AsyncStorage from "@react-native-async-storage/async-storage";

export default async () => {
  try {
    await AsyncStorage.removeItem("auth-token");
    await AsyncStorage.removeItem("ownerID");
  } catch (error) {
    console.log(error);
  }
};
