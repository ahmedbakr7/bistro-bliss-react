import * as yup from "yup";
import { nameRules } from "../common";

export const bookSchema = yup.object().shape({
    name: yup
        .string()
        .matches(nameRules, {
            message:
                "Name can only contain letters, spaces, hyphens, and apostrophes",
        })
        .required("Required")
        .trim(),
    phone: yup.string().length(11).required("Required"),
    // Example 1: Basic date range validation
    date: yup
        .date()
        .min(new Date(), "Date cannot be in the past")
        .max(
            new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000),
            "Date cannot be more than 3 months in advance"
        )
        .required("Required"),
    time: yup.string().required("Required"),
    totalPerson: yup
        .number()
        .min(1, "At least 1 person required")
        .max(20, "Maximum 20 people allowed")
        .required("Required"),
});
