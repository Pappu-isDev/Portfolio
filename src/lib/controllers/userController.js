import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Setup Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // Ensuring variable names match your .env setup
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASS, 
  },
});

export const userController = {
  // --- REGISTER & SEND OTP ---
  async register(req) {
    try {
      await connectDB();
      const { username, email, password } = await req.json();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ success: false, error: "Email already registered" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

      await User.create({
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpires,
        isVerified: false
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Your Portfolio Admin OTP",
        html: `<h1>Verification Code</h1><p>Your code is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
      });

      return NextResponse.json({ success: true, message: "OTP sent to Gmail" }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  },

  // --- VERIFY OTP ---
  async verifyOTP(req) {
    try {
      await connectDB();
      const { email, otp } = await req.json();

      const user = await User.findOne({ 
        email, 
        otp, 
        otpExpires: { $gt: Date.now() } 
      });

      if (!user) {
        return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
      }

      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      return NextResponse.json({ success: true, message: "Account verified successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
    }
  },

  // --- LOGIN ---
  async login(req) {
    try {
      await connectDB();
      const { email, password } = await req.json();

      // Find user and explicitly select password because 'select: false' is usually in the Schema
      const user = await User.findOne({ email }).select("+password");
      
      if (!user) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
      }

      if (!user.isVerified) {
        return NextResponse.json({ success: false, error: "Please verify your email first" }, { status: 403 });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_Secret,
        { expiresIn: "1d" }
      );

      return NextResponse.json({ 
        success: true, 
        token, 
        user: { username: user.username, email: user.email } 
      }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
    }
  }
};