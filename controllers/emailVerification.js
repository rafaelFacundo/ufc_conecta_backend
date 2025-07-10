import transporter from "../utils/nodemailer.js";
import EmailVerification from "../models/EmailCode.js";
import Student from "../models/Student.js";
import Employer from "../models/Employer.js";
import { generateRandomCode } from "../utils/verificationCode.js";
import { comparePassword, hashPassword } from "../utils/bcryptPasswordHash.js";

export const sendEmailVerification = async (req, res) => {
  try {
    const { userEmail } = req.body;
    /* let isThisEmailAlreadyInUse = await Student.findOne({ email: userEmail });
    console.log("asdas ", isThisEmailAlreadyInUse);
    if (!isThisEmailAlreadyInUse) {
      console.log("entered on if");
      isThisEmailAlreadyInUse = await Employer.findOne({ email: userEmail });
    }
    console.log("asdas 2", isThisEmailAlreadyInUse);

    if (isThisEmailAlreadyInUse) {
      return res.status(400).json({ message: "Email already in use" });
    } */
    const verificationCodeToSend = generateRandomCode();
    const verificationCodeHash = await hashPassword(verificationCodeToSend);
    const emailVerification = new EmailVerification({
      userEmail,
      hash: verificationCodeHash,
      status: "unverified",
      creationDate: Date.now(),
      isValid: true,
    });
    await emailVerification.save();
    transporter.sendMail({
      to: userEmail,
      subject:
        "Bem vindo à conecta ufc! Aqui está seu código de verificação 😉",
      text: `
        Oi! Tudo certo?

        Você pediu pra verificar seu e-mail, né?
        Então aqui está o seu código:

        ${verificationCodeToSend}

        Ele vale por 10 minutinhos, então não demora pra usar. 😉

        Se não foi você que pediu isso, é só ignorar esse e-mail.

        Abraços,

        Equipe conecta ufc.
      `,
    });
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log("Something went wrong when trying to send email");
    console.log(error);
    res.status(500).json({ message: "Can't send email, something went wrong" });
  }
};

export const verifyEmailCode = async (req, res) => {
  try {
    const codeExpirationLimit = 10 * 60 * 1000;
    const dateNow = Date.now();
    const { userEmail, code } = req.body;
    const emailVerification = await EmailVerification.findOne({
      userEmail,
      isValid: true,
      status: "unverified",
    });
    if (!emailVerification) {
      return res.status(404).json({ message: "Email not found" });
    }
    if (dateNow - emailVerification.creationDate > codeExpirationLimit) {
      return res.status(410).json({ message: "Code has expired" });
    }
    const isCodeMatching = await comparePassword(code, emailVerification.hash);
    if (isCodeMatching) {
      emailVerification.isValid = false;
      emailVerification.status = "verified";
      await emailVerification.save();
      return res.status(200).json({ message: "Email verified" });
    } else {
      return res.status(401).json({ message: "Incorrect code" });
    }
  } catch (error) {
    console.log("Something went wrong when trying to verify email");
    console.log(error);
    res.status(500).json({ message: "Can't send email, something went wrong" });
  }
};
