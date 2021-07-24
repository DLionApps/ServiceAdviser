import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("auth-token");
    return token;
  } catch (error) {
    console.log(error);
  }
};

const localApiBaseUrl = "http://localhost:8000";
const gaeHostedapiBaseUrl = "http://serviceadviserapi-293915.df.r.appspot.com";
const herokuHostedUrl = "https://service-adviser-express.herokuapp.com";

var apiBaseUrl = herokuHostedUrl;

const headers = async (isWithToken) => {
  if (isWithToken === true) {
    return {
      headers: {
        "Content-Type": "application/json",
        "auth-token": await getToken(),
      },
    };
  } else {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
export { apiBaseUrl, headers };
