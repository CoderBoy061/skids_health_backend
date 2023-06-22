const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
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
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
    },

    { timestamps: true }
);

const UserData = mongoose.model("UserData", UserDataSchema);
module.exports = UserData;
