const UserData = require("../models/userData");

exports.addData = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const existsData = await UserData.findOne({ email: email });
        if (existsData) {
            return res.status(400).json({ message: "Data already exists" });
        }

        await UserData.create({ name, email, phone });

        res.status(200).json({
            success: true,
            message: "Data added successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, phone } = req.body;
        await UserData.findByIdAndUpdate(id, {
            name,
            email,
            phone,
        });
        res.status(200).json({
            success: true,
            message: "Data updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        await UserData.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Data deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getData = async (req, res) => {
    try {
        const userData = await UserData.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            userData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
