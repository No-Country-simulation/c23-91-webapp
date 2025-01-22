import User from "../models/user.model.js";
import { handleServerError } from "../utils/errorHandler.js";

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

export const getUserDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate("donations")
      .populate("appointments");

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const { donations, appointments } = user;

    res.status(200).json({
      status: "success",
      payload: { donations, appointments },
    });
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
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
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
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    handleServerError(res, error);
  }
};
