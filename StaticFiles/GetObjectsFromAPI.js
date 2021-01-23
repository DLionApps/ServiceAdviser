import { apiBaseUrl, headers } from "../StaticFiles/Configs";
import axios from "axios";

const getVehiclesFromAPI = async (ownerID) => {
  try {
    const ret = await axios
      .get(apiBaseUrl + `/api/vehicles/${ownerID}`, await headers(true))
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

export { getVehiclesFromAPI };
