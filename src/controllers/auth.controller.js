import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthday,
      gender,
      bloodType,
      email,
      password,
      diseases,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !birthday ||
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

    const newUser = new User({
      firstName,
      lastName,
      birthday,
      gender,
      bloodType,
      email,
      password,
      diseases,
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

const JWT_SECRET = config.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful.",
      payload: {
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};
