import Institution from "../models/institution.model.js";

export const createInstitution = async (req, res) => {
  try {
    const newInstitution = new Institution(req.body);
    const savedInstitution = await newInstitution.save();

    res.status(201).json({
      status: "success",
      message: "Institution created successfully",
      payload: savedInstitution,
    });
  } catch (error) {
    console.error("Error creating institution:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find()
      .populate("donations")
      .populate("appointments");

    res.status(200).json({
      status: "success",
      payload: institutions,
    });
  } catch (error) {
    console.error("Error getting institutions:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInstitution = await Institution.findByIdAndDelete(id);

    if (!deletedInstitution) {
      return res.status(404).json({
        status: "error",
        message: "Institution not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Institution deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting institution:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};

export const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedInstitution = await Institution.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedInstitution) {
      return res.status(404).json({
        status: "error",
        message: "Institution not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Institution updated successfully.",
      payload: updatedInstitution,
    });
  } catch (error) {
    console.error("Error updating institution:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};
