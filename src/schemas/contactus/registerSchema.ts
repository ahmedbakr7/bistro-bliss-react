import * as yup from "yup";
import { nameRules } from "../common";

export const contactSchema = yup.object().shape({
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
    subject: yup.string().required("required").trim(),
    message: yup.string().required("required").trim(),
});
