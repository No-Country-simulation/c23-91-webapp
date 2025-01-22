import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import Institution from "../models/institution.model.js";

export const createAppointment = async (req, res) => {
  try {
    const { userId, institutionId, appointmentDate, notes } = req.body;

    const conflictingAppointment = await Appointment.findOne({
      institutionId,
      appointmentDate,
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        status: "error",
        message: "The selected date and time are not available.",
      });
    }

    const newAppointment = new Appointment({
      userId,
      institutionId,
      appointmentDate,
      notes,
    });

    const savedAppointment = await newAppointment.save();

    await User.findByIdAndUpdate(userId, {
      $push: { appointments: savedAppointment._id },
    });

    await Institution.findByIdAndUpdate(institutionId, {
      $push: { appointments: savedAppointment._id },
    });

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully.",
      payload: savedAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId")
      .populate("institutionId");

    res.status(200).json({
      status: "success",
      payload: appointments,
    });
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
