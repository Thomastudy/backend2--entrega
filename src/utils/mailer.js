import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "thomandoclases@gmail.com",
    pass: "pclb awhu zqli pygq",
  },
});

export async function mailer(to, subject, html) {
  await transport.sendMail({
    from: "Hali - Accesorios <thomandoclases@gmail.com>",
    to: to,
    subject: subject,
    html: html,
  });
}
