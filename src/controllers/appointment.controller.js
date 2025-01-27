import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import Institution from "../models/institution.model.js";
import Donation from "../models/donation.model.js";

// GET - Obtener todas las citas.
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: "userId",
        select: "firstName lastName email",
      })
      .populate({
        path: "institutionId",
        select: "name institutionType address",
      });

    res.status(200).json({
      status: "success",
      payload: appointments,
    });
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// POST - Crear una cita.
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
      status: "Pending",
    });

    const savedAppointment = await newAppointment.save();

    await User.findByIdAndUpdate(userId, {
      $push: { appointments: savedAppointment._id },
    });

    await Institution.findByIdAndUpdate(institutionId, {
      $push: { appointments: savedAppointment._id },
    });

    // Programar la creación de la donación y completar la cita después de 30 segundos
    setTimeout(async () => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          console.error(`User with ID ${userId} not found.`);
          return;
        }

        const bloodType = user.bloodType;

        const newDonation = new Donation({
          userId,
          institutionId,
          bloodType,
          notes: "Donación completada exitosamente",
          donationDate: appointmentDate,
        });

        const savedDonation = await newDonation.save();

        await User.findByIdAndUpdate(userId, {
          $push: { donations: savedDonation._id },
        });

        await Institution.findByIdAndUpdate(institutionId, {
          $push: { donations: savedDonation._id },
        });

        await Appointment.findByIdAndUpdate(savedAppointment._id, {
          status: "Completed",
        });

        console.log(`Appointment ${savedAppointment._id} marked as Completed, and donation ${savedDonation._id} created.`);
      } catch (error) {
        console.error(
          "Error completing appointment and creating donation:", error);
      }
    }, 30000); // 30 segundos

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
