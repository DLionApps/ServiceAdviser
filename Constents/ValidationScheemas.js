import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .email("Valid email required")
    .required("Email is required"),
});

const EmailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Valid email required")
    .required("Email is required"),
});

const PasswordMatchSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirme password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm passwords must match with password"
    ),
});

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirme password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm passwords must match with password"
    ),
  email: Yup.string()
    .email("Valid email required")
    .required("Email is required"),
  //   consent: Yup.bool()
  //     .test(
  //       "consent",
  //       "You have to agree with our Terms and Conditions!",
  //       (value) => value === true
  //     )
  //     .required("You have to agree with our Terms and Conditions!"),
});

const OwnerValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm passwords must match with password"
    ),
  email: Yup.string()
    .email("Valid email required")
    .required("Email is required"),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]+$/, "Contact Number must be digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  lName: Yup.string().required("Last Name is required"),
  fName: Yup.string().required("First Name is required"),
});

const VehicleValidationSchema = Yup.object().shape({
  VRN: Yup.string().required("Registration Number is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  mfgYear: Yup.string()
    .matches(/^[0-9]+$/, "Contact Number must be digits")
    .min(4, "Must be exactly 4 digits")
    .max(4, "Must be exactly 4 digits")
    .required("Manufactured Year is required"),
});

const MileageServiceValidationSchema = Yup.object().shape({
  mileage: Yup.number()
    .positive()
    .integer()
    .required("Total Mileage is required"),
  lastServiceMileage: Yup.number()
    .positive()
    .integer()
    .required("Recent Oil & Manintenence Service Mileage is required"),
});

const HourServiceValidationSchema = Yup.object().shape({
  workingHours: Yup.number()
    .positive()
    .integer()
    .required("Total Working Hours is required"),
  lastServiceHours: Yup.number()
    .positive()
    .integer()
    .required("Recent Oil & Manintenence Service Hours is required"),
});

const HourServiceValidationSchemaTwo = Yup.object().shape({
  serviceHour: Yup.number()
    .positive()
    .integer()
    .required("Service Working Hour is required"),
});

const MileageServiceValidationSchemaTwo = Yup.object().shape({
  serviceMileage: Yup.number()
    .positive()
    .integer()
    .required("Service Mileage is required"),
});

//https://itnext.io/simple-react-form-validation-with-formik-yup-and-or-spected-206ebe9e7dcc
export {
  LoginSchema,
  SignupSchema,
  OwnerValidationSchema,
  VehicleValidationSchema,
  MileageServiceValidationSchema,
  HourServiceValidationSchema,
  PasswordMatchSchema,
  EmailValidationSchema,
  HourServiceValidationSchemaTwo,
  MileageServiceValidationSchemaTwo,
};
