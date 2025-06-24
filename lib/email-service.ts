import nodemailer from "nodemailer";
import { departments } from "@/config/departmentConfig";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmailToLead({ name, email, phone, department, answers }) {
  const deptInfo = departments[department];
  if (!deptInfo) throw new Error("Invalid department");

  const html = Object.entries(answers)
    .map(([q, a]) => `<p><strong>${q}</strong><br/>${a}</p>`)
    .join("");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: Array.isArray(deptInfo.email) ? deptInfo.email : [deptInfo.email],
    subject: `New Application - ${deptInfo.name}`,
    html: `
      <h2>Applicant: ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${html}
    `,
  });
}
