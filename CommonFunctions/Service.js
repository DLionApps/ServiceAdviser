import React, { useContext } from "react";
import { apiBaseUrl, headers } from "../StaticFiles/Configs";
import axios from "axios";

const createService = async (serviceObj) => {
  try {
    const ret = await axios
      .post(
        apiBaseUrl + "/api/service",
        JSON.stringify(serviceObj),
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

const getServiceBulletins = async (applicableType) => {
  try {
    const ret = await axios
      .get(
        apiBaseUrl + `/api/serviceBulletin/${applicableType}`,
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

const editService = async (serviceObj, serviceID) => {
  try {
    const ret = await axios
      .put(
        apiBaseUrl + `/api/service/${serviceID}`,
        JSON.stringify(serviceObj),
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

export { createService, getServiceBulletins, editService };
