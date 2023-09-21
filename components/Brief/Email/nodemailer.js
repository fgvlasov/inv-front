import { useEffect, useState } from "react";
import { createEmail } from "./createEmail";
import { fetchAPI } from "lib/api";
var nodemailer = require("nodemailer");

const user = "invfront164@gmail.com";
// process.env.NEXT_EMAIL;

const pass = "eozhrawqisgqkrez";
//  process.env.NEXT_EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

export async function SendMail(data) {
  const [email, setEmail] = useState("");
  useEffect(() => {
    async function fetchData() {
      const emailRes = await fetchAPI("/global", {
        fields: ["Email_forms"],
      });
      console.log(emailRes);
      setEmail(emailRes);
    }
    fetchData();
  }, []);

  const result = await transporter.sendMail({
    subject: "Заявка",
    to: email,
    html: createEmail(data),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
  return result;
}
