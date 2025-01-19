import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("donations")
      .populate("appointments");

    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("donations")
      .populate("appointments");

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      payload: savedUser,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, bloodType, email, password } = req.body;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !bloodType ||
      !email ||
      !password
    ) {
      return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      age,
      gender,
      bloodType,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      payload: {
        id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};

const handleServerError = (res, error) => {
  console.error("Server error:", error);
  res.status(500).json({ status: "error", message: "Internal server error", error });
};
