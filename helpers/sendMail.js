import sgMail from "@sendgrid/mail";
import { getValueEnv } from "./getValueEnv.js";

const SENDGRID_API_KEY = getValueEnv("SENDGRID_API_KEY");
const EMAIL_FROM = getValueEnv("EMAIL_FROM");
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendMail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await sgMail.send(email);
  return true;
};
