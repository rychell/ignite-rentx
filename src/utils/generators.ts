import crypto from "crypto";

const generateRandomString = (strLength = 16): string => {
  return crypto.randomBytes(strLength).toString("hex");
};
const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 1000);
};

export { generateRandomString, generateRandomNumber };
