import Donation from "../models/donation.model.js";
// import User from "../models/user.model.js";
// import Institution from "../models/institution.model.js";
// import Appointment from "../models/appointment.model.js";
// import Award from "../models/award.model.js";

// GET - Obtener todas las donaciones.
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
