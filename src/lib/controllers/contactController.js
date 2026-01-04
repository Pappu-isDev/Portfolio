import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Create transporter using same env variable names as other controllers
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// In-memory store for verification tokens (in production, use Redis or database)
const verificationTokens = new Map();

export const contactController = {
  async sendContact(req) {
    try {
      const { name, email, subject, message, token } = await req.json();

      if (!name || !email || !message) {
        return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
      }

      // Validate Gmail address to prevent spam
      if (!email.toLowerCase().endsWith('@gmail.com')) {
        return NextResponse.json({ success: false, error: "Only Gmail addresses are allowed" }, { status: 400 });
      }

      // If no token provided, send verification email
      if (!token) {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/contact/verify?token=${verificationToken}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&subject=${encodeURIComponent(subject || '')}&message=${encodeURIComponent(message)}`;

        // Store verification data temporarily (expires in 10 minutes)
        verificationTokens.set(verificationToken, {
          email,
          name,
          subject: subject || '',
          message,
          expires: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        // Clean up expired tokens
        for (const [key, data] of verificationTokens.entries()) {
          if (data.expires < Date.now()) {
            verificationTokens.delete(key);
          }
        }

        const verificationHtml = `
          <h2>Email Verification Required</h2>
          <p>Hi ${name},</p>
          <p>You need to verify your Gmail address before we can send your message.</p>
          <p>Please click the link below to verify your email:</p>
          <a href="${verificationUrl}" style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `;

        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: email,
          subject: "Verify your email to send message",
          html: verificationHtml,
        });

        return NextResponse.json({
          success: true,
          message: "Verification email sent. Please check your Gmail and click the verification link.",
          requiresVerification: true
        }, { status: 200 });
      }

      // If token provided, verify it and send the message
      const storedData = verificationTokens.get(token);
      if (!storedData || storedData.expires < Date.now()) {
        return NextResponse.json({ success: false, error: "Invalid or expired verification token" }, { status: 400 });
      }

      // Remove the token after use
      verificationTokens.delete(token);

      const html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${storedData.name}</p>
        <p><strong>Email:</strong> ${storedData.email}</p>
        <p><strong>Subject:</strong> ${storedData.subject || "(none)"}</p>
        <hr />
        <p>${storedData.message.replace(/\n/g, "<br/>")}</p>
      `;

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER, // send to site owner
        replyTo: storedData.email,
        subject: storedData.subject ? `Contact: ${storedData.subject}` : `Contact form from ${storedData.name}`,
        html,
      });

      return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  },
};

export default contactController;
