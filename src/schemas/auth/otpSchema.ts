import * as yup from "yup";

export const otpSchema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required")
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d{6}$/, "OTP must contain only numbers"),
});

export type OtpFormData = yup.InferType<typeof otpSchema>;
