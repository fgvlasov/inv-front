import { fetchAPI } from "lib/api";
import { CreateEmail } from "./createEmail";
// import useTranslation from "next-translate/useTranslation";
var nodemailer = require("nodemailer");

const user = "form@invert.studio";

const pass = "JTbtiF9g7pDimERwJdJP";

export const transporter = nodemailer.createTransport({
  //service: "gmail",
  host: 'smtp.mail.ru',
  port: 465, // This could be different, please verify with Mail.ru documentation
  secure: true, // true for port 465, false for other ports
  auth: {
    user,
    pass,
  },
});

export const SendMail = async (data) => {
  const response = await fetchAPI("/global", {
    fields: ["Email_forms"],
  });
  const { formName } = JSON.parse(data);

  const result = await transporter.sendMail({
    subject: formName,
    to: response.data.attributes.Email_forms,

    html: await CreateEmail(data),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
  return result;
};
