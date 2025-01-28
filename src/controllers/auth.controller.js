import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";

// POST - Registrar usuario.
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

    if (!firstName ||!lastName ||!birthday ||!gender ||!bloodType ||!email ||!password) {
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

// POST - Login.
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

// POST - Registrar usuarios en lote.
export const registerUsersBatch = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Request must include an array of users.",
      });
    }

    const savedUsers = [];

    for (const user of users) {
      const {
        firstName,
        lastName,
        birthday,
        gender,
        bloodType,
        email,
        password,
        diseases,
      } = user;

      if (!firstName ||!lastName ||!birthday ||!gender ||!bloodType ||!email ||!password) {
        return res.status(400).json({
          status: "error",
          message: "All fields are required for each user.",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          status: "error",
          message: `Email ${email} is already registered.`,
        });
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
      savedUsers.push({ id: savedUser._id, email: savedUser.email });
    }

    res.status(201).json({
      status: "success",
      message: `${savedUsers.length} users registered successfully.`,
      payload: savedUsers,
    });
  } catch (error) {
    console.error("Error registering users batch:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};
