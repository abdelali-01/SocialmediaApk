import crypto from "crypto";

export const optGenerator = () => {
  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString(); // Generates a secure 6-digit OTP
  return otp;
};
