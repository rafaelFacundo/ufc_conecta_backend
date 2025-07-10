import jwt from "jsonwebtoken";

export const generateNewToken = (dataToHash, expirationDate) => {
  const key = process.env.JWT_TOKEN;
  const token = jwt.sign(dataToHash, key, { expiresIn: expirationDate });
  return token;
};

export const generateNewRefreshToken = (dataToHash, expirationDate) => {
  const key = process.env.JWT_REFRESH_TOKEN;
  const token = jwt.sign(dataToHash, key, { expiresIn: expirationDate });
  return token;
};
