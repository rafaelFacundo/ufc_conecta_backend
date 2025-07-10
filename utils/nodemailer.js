import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "connectaufc@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export default transporter;
