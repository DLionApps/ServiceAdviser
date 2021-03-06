import { apiBaseUrl, headers } from "../StaticFiles/Configs";
import axios from "axios";

const createVehicle = async (vehicleObj) => {
  try {
    const ret = await axios
      .post(
        apiBaseUrl + "/api/vehicle",
        JSON.stringify(vehicleObj),
        await headers(true)
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
  } catch (x) {
    console.log(x);
  }
};

const editVehicle = async (vehicleObj, vehicleID) => {
  try {
    const ret = await axios
      .put(
        apiBaseUrl + `/api/vehicle/${vehicleID}`,
        JSON.stringify(vehicleObj),
        await headers(true)
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
  } catch (x) {
    console.log(x);
  }
};

const deleteVehicle = async (vehicleId) => {
  try {
    const ret = await axios
      .delete(apiBaseUrl + `/api/vehicle/${vehicleId}`, await headers(true))
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
  } catch (x) {
    console.log(x);
  }
};

export { createVehicle, editVehicle, deleteVehicle };
