import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const stepperArray = [
  {
    number: 1,
    text1: "Add Owner's",
    text2: "Information",
  },
  {
    number: 2,
    text1: "Add Vehicle",
    text2: "Information",
  },
  {
    number: 3,
    text1: "Add Service",
    text2: "Information",
  },
];

const vehiclePowerSources = [
  {
    name: "Fuel Types",
    id: 1,
    children: [
      {
        name: "Petrol",
        id: 11,
      },
      {
        name: "Diesel",
        id: 12,
      },
      {
        name: "Electricity",
        id: 13,
      },
    ],
  },
  // ,
  // {
  //   name: "Hybrid",
  //   id: 2,
  //   children: [
  //     {
  //       name: "Gasoline(Petrol) + Electricity",
  //       id: 21,
  //     },
  //     {
  //       name: "Diesel + Electricity",
  //       id: 22,
  //     },
  //   ],
  // },
];

const vehicleTypeOne = () => <Icon name="car" size={24} color="gray" />;
const vehicleTypeTwo = () => <Icon name="bus" size={24} color="gray" />;
// const vehicleTypeThree = () => <Icon name="ship" size={24} color="gray" />;

const vehicleTypes = [
  { element: vehicleTypeOne },
  { element: vehicleTypeTwo },
  // { element: vehicleTypeThree },
];

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { stepperArray, vehiclePowerSources, vehicleTypes, monthNames };
