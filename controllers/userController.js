const User = require("../models/userModel");
const { sendMail } = require("../utilities/sendMail");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImg, phone, aadhar } = req.body;
    if (!name || !email || !password || !phone || !aadhar) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
      profileImg,
      phone,
      aadhar,
    });
    const userData = await newUser.save();
    const token = await newUser.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    (user.otp = otp),
      (user.otpExpires = new Date(Date.now() + 2 * 60 * 1000)),
      await user.save();
    await sendMail(email, otp);
    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "Please enter otp" });
    }
    const user = await User.findOne({ email: email });
    if (user.otp !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      await user.updateOne({ otp: null, otpExpires: null });
      return res.status(400).json({ message: "OTP expired" });
    }
    await user.updateOne({ otp: null, otpExpires: null });
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
      message: "OTP verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, aadhar, profileImg } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    await user.updateOne({ name, phone, aadhar, profileImg });
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    await user.updateOne({ password: newPassword });
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUserAllData = async (req, res) => {
  try {
    const id  = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
