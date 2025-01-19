import Donation from "../models/donation.model.js";
import User from "../models/user.model.js";
import Institution from "../models/institution.model.js";
import Appointment from "../models/appointment.model.js";

export const createDonation = async (req, res) => {
  try {
    const { userId, institutionId, bloodType, notes } = req.body;

    const newDonation = new Donation({
      userId,
      institutionId,
      bloodType,
      notes,
    });

    const savedDonation = await newDonation.save();

    await User.findByIdAndUpdate(userId, {
      $push: { donations: savedDonation._id },
    });
    await Institution.findByIdAndUpdate(institutionId, {
      $push: { donations: savedDonation._id },
    });

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { userId, institutionId, status: "Pending" },
      { status: "Completed" },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      message: "Donation created successfully",
      payload: {
        donation: savedDonation,
        updatedAppointment,
      },
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ status: "error", message: "Internal server error", error });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("userId")
      .populate("institutionId");

    res.status(200).json({
      status: "success",
      payload: donations,
    });
  } catch (error) {
    console.error("Error getting donations:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
