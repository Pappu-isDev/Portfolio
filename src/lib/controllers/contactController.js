import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter using same env variable names as other controllers
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const contactController = {
  async sendContact(req) {
    try {
      const { name, email, subject, message } = await req.json();

      if (!name || !email || !message) {
        return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
      }

      const html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "(none)"}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `;

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER, // send to site owner
        replyTo: email,
        subject: subject ? `Contact: ${subject}` : `Contact form from ${name}`,
        html,
      });

      return NextResponse.json({ success: true, message: "Message sent" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  },
};

export default contactController;
