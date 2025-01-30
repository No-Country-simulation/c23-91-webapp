import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import Institution from "../models/institution.model.js";
import Donation from "../models/donation.model.js";
import Award from "../models/award.model.js";

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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    const lastDonation = await Donation.findOne({ userId }).sort({ donationDate: -1 });
    if (lastDonation) {
      const monthsToWait = user.gender === "Male" ? 3 : 4;
      const nextEligibleDate = new Date(lastDonation.donationDate);
      nextEligibleDate.setMonth(nextEligibleDate.getMonth() + monthsToWait);

      if (new Date(appointmentDate) < nextEligibleDate) {
        return res.status(400).json({
          status: "error",
          message: `You must wait at least ${monthsToWait} months before scheduling a new donation appointment.`,
        });
      }
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

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully.",
      payload: savedAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
      error,
    });
  }
};


// PUT - Confirmar una cita.
export const confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment || appointment.status !== "Pending") {
      return res.status(400).json({
        status: "error",
        message: "Appointment not found or already completed.",
      });
    }

    const { userId, institutionId, appointmentDate, notes } = appointment;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found." });
    }

    const bloodType = user.bloodType;
    const newDonation = new Donation({
      userId,
      institutionId,
      bloodType,
      notes: notes || "Donación completada exitosamente",
      donationDate: appointmentDate,
    });

    const savedDonation = await newDonation.save();

    await User.findByIdAndUpdate(userId, {
      $push: { donations: savedDonation._id },
    });

    await Institution.findByIdAndUpdate(institutionId, {
      $push: { donations: savedDonation._id },
    });

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Completed" },
      { new: true }
    );

    const pointsEarned = 30;
    const totalPoints = (user.totalPoints || 0) + pointsEarned;

    const awards = await Award.find({
      pointsRequired: { $lte: totalPoints },
    }).sort({ pointsRequired: -1 });
    const highestAward = awards[0];

    const updateData = { totalPoints };
    if (highestAward && !user.awards.includes(highestAward._id)) {
      updateData.$push = { awards: highestAward._id };
    }

    await User.findByIdAndUpdate(userId, updateData);

    res.status(200).json({
      status: "success",
      message:"Appointment confirmed, donation created, and user updated successfully.",
      payload: {
        updatedAppointment,
        donation: savedDonation,
        totalPoints,
        newAward: highestAward || null,
      },
    });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
      error,
    });
  }
};

// PUT - Cancelar una cita.
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment || appointment.status !== "Pending") {
      return res.status(400).json({
        status: "error",
        message: "Appointment not found or cannot be cancelled.",
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Appointment cancelled successfully.",
      payload: updatedAppointment,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
      error,
    });
  }
};
