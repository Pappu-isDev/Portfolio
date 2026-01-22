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
        isVerified: false,
        role: 'user'
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
      const { email, otp, isPasswordReset } = await req.json();

      const user = await User.findOne({ email }).select("+failedResetOtpAttempts +resetOtpLockoutUntil");

      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }

      // Initialize fields for existing users
      if (user.failedResetOtpAttempts == null) user.failedResetOtpAttempts = 0;
      if (user.resetOtpLockoutUntil == null) user.resetOtpLockoutUntil = null;

      if (isPasswordReset) {
        // Check if reset OTP is locked
        if (user.resetOtpLockoutUntil && user.resetOtpLockoutUntil > Date.now()) {
          return NextResponse.json({ success: false, error: "Too many failed OTP attempts. Try again later." }, { status: 429 });
        }

        // Check if OTP is valid
        if (user.resetOtp !== otp || user.resetOtpExpires < Date.now()) {
          user.failedResetOtpAttempts += 1;
          if (user.failedResetOtpAttempts >= 3) {
            user.resetOtpLockoutUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
            // Expire existing OTPs
            user.resetOtp = null;
            user.resetOtpExpires = null;
          }
          await user.save();
          return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
        }

        // Successful verification, reset attempts
        user.failedResetOtpAttempts = 0;
        user.resetOtpLockoutUntil = null;
        await user.save();

        return NextResponse.json({ success: true, message: "OTP verified successfully" }, { status: 200 });
      } else {
        // For account verification
        if (user.otp !== otp || user.otpExpires < Date.now()) {
          return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return NextResponse.json({ success: true, message: "Account verified successfully" }, { status: 200 });
      }
    } catch (error) {
      return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
    }
  },

  // --- LOGIN ---
  async login(req) {
    try {
      await connectDB();
      const { email, password } = await req.json();

      // Find user and explicitly select password and lockout fields
      const user = await User.findOne({ email }).select("+password +failedLoginAttempts +lockoutUntil");

      if (!user) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
      }

      // Initialize fields for existing users
      if (user.failedLoginAttempts == null) user.failedLoginAttempts = 0;
      if (user.lockoutUntil == null) user.lockoutUntil = null;

      // Check if account is locked
      if (user.lockoutUntil && user.lockoutUntil > Date.now()) {
        // Expire OTPs when locked
        user.otp = null;
        user.otpExpires = null;
        user.resetOtp = null;
        user.resetOtpExpires = null;
        await user.save();
        return NextResponse.json({ success: false, error: "Account locked due to too many failed attempts. Try again later." }, { status: 429 });
      }

      if (!user.isVerified) {
        return NextResponse.json({ success: false, error: "Please verify your email first" }, { status: 403 });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log(`Login failed for ${email}, attempts before: ${user.failedLoginAttempts}`);
        user.failedLoginAttempts += 1;
        console.log(`Attempts after increment: ${user.failedLoginAttempts}`);
        if (user.failedLoginAttempts >= 3) {
          user.lockoutUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
          console.log(`Locking account until: ${user.lockoutUntil}`);
          // Expire OTPs
          user.otp = null;
          user.otpExpires = null;
          user.resetOtp = null;
          user.resetOtpExpires = null;
        }
        await user.save();
        console.log(`Saved user with attempts: ${user.failedLoginAttempts}, lockout: ${user.lockoutUntil}`);
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
      }

      // Successful login, reset attempts
      user.failedLoginAttempts = 0;
      user.lockoutUntil = null;
      await user.save();

      // Generate JWT Token
      const jwtSecret = process.env.JWT_SECRET || process.env.JWT_Secret;
      const token = jwt.sign(
        { id: user._id, role: user.role },
        jwtSecret,
        { expiresIn: "1d" }
      );

      return NextResponse.json({
        success: true,
        token,
        user: { username: user.username, email: user.email, role: user.role }
      }, { status: 200 });

    } catch (error) {
      // Return the real error message to aid debugging (can be sanitized later)
      return NextResponse.json({ success: false, error: error.message || "Login failed" }, { status: 500 });
    }
  },

  // --- FORGOT PASSWORD (SEND RESET OTP) ---
  async forgotPassword(req) {
    try {
      await connectDB();
      const { email } = await req.json();

      const user = await User.findOne({ email }).select("+failedResetAttempts +resetLockoutUntil");
      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }

      // Initialize fields for existing users
      if (user.failedResetAttempts == null) user.failedResetAttempts = 0;
      if (user.resetLockoutUntil == null) user.resetLockoutUntil = null;

      // Check if reset is locked
      if (user.resetLockoutUntil && user.resetLockoutUntil > Date.now()) {
        return NextResponse.json({ success: false, error: "Too many reset attempts. Try again later." }, { status: 429 });
      }

      if (user.failedResetAttempts >= 3) {
        user.resetLockoutUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Expire existing OTPs
        user.resetOtp = null;
        user.resetOtpExpires = null;
        await user.save();
        return NextResponse.json({ success: false, error: "Too many reset attempts. Try again later." }, { status: 429 });
      }

      const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      user.resetOtp = resetOtp;
      user.resetOtpExpires = resetOtpExpires;
      user.failedResetAttempts += 1;
      await user.save();

      console.log(`Reset OTP for ${email}: ${resetOtp}`);

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        html: `<h1>Password Reset</h1><p>Your reset code is: <strong>${resetOtp}</strong></p><p>It expires in 10 minutes.</p>`,
      });

      return NextResponse.json({ success: true, message: "Reset OTP sent to email" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  },

  // --- RESET PASSWORD ---
  async resetPassword(req) {
    try {
      await connectDB();
      const { email, otp, newPassword } = await req.json();

      const user = await User.findOne({ email }).select("+failedResetAttempts +resetLockoutUntil");
      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }

      // Initialize fields for existing users
      if (user.failedResetAttempts == null) user.failedResetAttempts = 0;
      if (user.resetLockoutUntil == null) user.resetLockoutUntil = null;

      // Check if reset is locked
      if (user.resetLockoutUntil && user.resetLockoutUntil > Date.now()) {
        return NextResponse.json({ success: false, error: "Too many reset attempts. Try again later." }, { status: 429 });
      }

      // Check if OTP is valid
      if (user.resetOtp !== otp || user.resetOtpExpires < Date.now()) {
        console.log(`OTP failed for ${email}, attempts before: ${user.failedResetAttempts}`);
        user.failedResetAttempts += 1;
        console.log(`Attempts after increment: ${user.failedResetAttempts}`);
        if (user.failedResetAttempts >= 3) {
          user.resetLockoutUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
          console.log(`Locking reset until: ${user.resetLockoutUntil}`);
          // Expire existing OTPs
          user.resetOtp = null;
          user.resetOtpExpires = null;
          await user.save();
          console.log(`Saved user with reset attempts: ${user.failedResetAttempts}, reset lockout: ${user.resetLockoutUntil}`);
          return NextResponse.json({ success: false, error: "Too many reset attempts. Try again later." }, { status: 429 });
        }
        await user.save();
        console.log(`Saved user with reset attempts: ${user.failedResetAttempts}`);
        return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetOtp = null;
      user.resetOtpExpires = null;
      // Reset reset attempts on successful password reset
      user.failedResetAttempts = 0;
      user.resetLockoutUntil = null;
      await user.save();

      return NextResponse.json({ success: true, message: "Password reset successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Password reset failed" }, { status: 500 });
    }
  }
};