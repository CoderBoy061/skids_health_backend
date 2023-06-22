const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    profileImg: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    aadhar: {
      type: Number,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
    },
    otpExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

//generating hash salt for the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
//mathcing passowrd
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return token.sign({ _id: this._id }, process.env.JWT_SECRET);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
