import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const nameRules = /^[a-zA-Z\s'-]+$/;
// Only letters, spaces, hyphens, and apostrophes allowed

// const FILE_SIZE = 160 * 1024;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .matches(nameRules, {
            message:
                "Name can only contain letters, spaces, hyphens, and apostrophes",
        })
        .required("Required")
        .trim(),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required")
        .trim(),
    phoneNumber: yup.string().length(11).required("Required"),
    password: yup
        .string()
        .min(8)
        .matches(passwordRules, {
            message: "Please create a stronger password",
        })
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match")
        .required("Required"),
    termsOfServices: yup
        .boolean()
        .isTrue("Must be True")
        .required("Must Agree to terms and services"),
    // profileImage: yup
    //     .mixed()
    //     .required("A file is required")
    //     .test(
    //       "fileSize",
    //       "File too large",
    //       value => value && value.size <= FILE_SIZE
    //     )
    //     .test(
    //       "fileFormat",
    //       "Unsupported Format",
    //       value => value && SUPPORTED_FORMATS.includes(value.type)
});
