import { AsyncStorage } from "react-native";
import { apiBaseUrl, headers } from "../StaticFiles/Configs";
import axios from "axios";

const login = async (credentials) => {
  try {
    const ret = await axios
      .post(
        apiBaseUrl + "/api/login",
        JSON.stringify(credentials),
        await headers()
      )
      .then((response) => {
        return {
          token: response.data.token,
          status: response.status,
          data: response.data.owner,
        };
      })
      .catch((error) => {
        return {
          messege: error.response.data.message,
          status: error.response.status,
        };
      });

    if (ret.status === 201) {
      await AsyncStorage.setItem("auth-token", ret.token);
      await AsyncStorage.setItem("ownerID", ret.data._id);
    } else {
      await AsyncStorage.setItem("auth-token", undefined);
      await AsyncStorage.setItem("ownerID", undefined);
    }

    return ret;
  } catch (x) {
    console.log(x);
  }
};

const signup = async (ownerObj) => {
  try {
    const ret = await axios
      .post(
        apiBaseUrl + "/api/owner",
        JSON.stringify(ownerObj),
        await headers()
      )
      .then((response) => {
        return { status: response.status, data: response.data };
      })
      .catch((error) => {
        return {
          messege: error.response.data.message,
          status: error.response.status,
        };
      });

    return ret;
  } catch (ex) {
    console.log(ex);
  }
};
export { login, signup };
