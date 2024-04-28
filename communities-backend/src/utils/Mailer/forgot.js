import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshitpnt@gmail.com",
    pass: "mcrx divf iojw mkwi      ",
  },
});

const source = fs.readFileSync("./assets/template_forgot.hbs", "utf8");
const template = handlebars.compile(source);

export const sendForgotPassword = async (username, email, token) => {
  const htmlToSend = template({
    name: username,
    link: `${process.env.FORGOT_FRONTEND_URL}/${token}`,
  });

  await transporter.sendMail({
    from: "harshitpnt@gmail.com",
    to: email,
    subject: "Communities: Forgot Password",
    html: htmlToSend,
  });

  console.log("Email sent");
};
