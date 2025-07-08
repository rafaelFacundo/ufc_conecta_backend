import bcrypt from "bcrypt";

export const hashPassword = async (passwordToHash) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(passwordToHash, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (plainTextPassword, passwordHash) => {
  const result = await bcrypt.compare(plainTextPassword, passwordHash);
  return result;
};
