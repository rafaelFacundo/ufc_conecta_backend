import bcrypt from "bcrypt";

export const hashPassword = async (passwordToHash) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(passwordToHash, saltRounds);
  return hashedPassword;
};
