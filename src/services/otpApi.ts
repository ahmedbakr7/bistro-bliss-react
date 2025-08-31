import api from "./api";

// Verify the OTP code
export const verifyOtp = async (otp: string) => {
    const { data } = await api.get(`/auth/email/verify/${otp}` );
    return data; // adjust shape as needed
};

// Resend a new OTP code
export const resendOtp = async () => {
    const { data } = await api.post("/otp/resend");
    return data; // adjust shape as needed
};
