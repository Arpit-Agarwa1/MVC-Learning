import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arpitagarwal932@gmail.com",
    pass: "mkzk itft ipdo gemk",
  },
});

export default transporter;
