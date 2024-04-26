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

const source = fs.readFileSync("./assets/template_verification.hbs", "utf8");
const template = handlebars.compile(source);

export const sendVerificationMail = async (username, email, token) => {
  const htmlToSend = template({
    name: username,
    link: `http://localhost:8080/verify/${token}`,
  });

  await transporter.sendMail({
    from: "harshitpnt@gmail.com",
    to: email,
    subject: "Email Verification",
    html: htmlToSend,
  });

  console.log("Email sent");
};
