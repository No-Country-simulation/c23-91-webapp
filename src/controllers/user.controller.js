import User from "../models/user.model.js";
import { handleServerError } from "../utils/errorHandler.js";

// GET - Obtener todos los usuarios.
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("appointments")
      .populate("donations")
      .populate("awards");

    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET - Obtener un usuario por ID.
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("appointments")
      .populate("donations")
      .populate("awards");

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const lastAppointment = user.appointments.length
      ? user.appointments[user.appointments.length - 1]
      : null;

    let lastAppointmentData = null;
    if (lastAppointment) {
      lastAppointmentData = {
        status: lastAppointment.status,
        donationDate:
          lastAppointment.status === "Completed"
            ? lastAppointment.appointmentDate
            : null,
      };
    }

    res.status(200).json({
      status: "success",
      payload: {
        user,
        lastAppointment: lastAppointmentData,
      },
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET - Obtener citas, donaciones y nivel de un usuario por ID.
export const getUserDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate({
        path: "donations",
        populate: {
          path: "institutionId",
          select: "name address institutionType email dailyDonorCapacity",
        },
      })
      .populate({
        path: "appointments",
        populate: {
          path: "institutionId",
          select: "name address institutionType email dailyDonorCapacity",
        },
      })
      .populate("awards");

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const { donations, appointments, awards, totalPoints } = user;

    res.status(200).json({
      status: "success",
      payload: { donations, appointments, awards, totalPoints },
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST - Crear un nuevo usuario.
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

// PUT - Actualizar información de un usuario.
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

// DELETE - Eliminar usuario por ID.
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
