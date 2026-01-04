import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    await connectDB();

    const { email, isPasswordReset } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let mailOptions;
    if (isPasswordReset) {
      // Store OTP for password reset
      user.resetOtp = otp;
      user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

      mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Password Reset OTP - Resent",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request (Resent)</h2>
            <p>Hello,</p>
            <p>You requested a password reset for your account. Here is your new OTP code:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #333; font-size: 32px; margin: 0;">${otp}</h1>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>Best regards,<br>Your Portfolio Team</p>
          </div>
        `,
      };
    } else {
      // Store OTP for account verification
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

      mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Verification OTP - Resent",
        html: `<h1>Verification Code (Resent)</h1><p>Your new code is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
      };
    }

    await user.save();
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "OTP resent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
