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

const getVehiclesFromAPIByID = async (vehicleID) => {
  try {
    const ret = await axios
      .get(apiBaseUrl + `/api/vehicle/${vehicleID}`, await headers(true))
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

const getServicesFromAPI = async (vehicleId) => {
  try {
    const ret = await axios
      .get(apiBaseUrl + `/api/services/${vehicleId}`, await headers(true))
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

const getServiceFromAPIByID = async (serviceId) => {
  try {
    const ret = await axios
      .get(apiBaseUrl + `/api/service/${serviceId}`, await headers(true))
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
export {
  getVehiclesFromAPI,
  getServicesFromAPI,
  getServiceFromAPIByID,
  getVehiclesFromAPIByID,
};
