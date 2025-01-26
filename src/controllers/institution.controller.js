import Institution from "../models/institution.model.js";

// GET - Obtener instituciones. Ordenar respuesta json.
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

// GET - Obtener citas de una institución por ID.
export const getInstitutionAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const institution = await Institution.findById(id)
    .populate("appointments");

    if (!institution) {
      return res.status(404).json({
        status: "error",
        message: "Institution not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Institution appointments fetched successfully.",
      payload: {
        institutionId: institution._id,
        appointments: institution.appointments,
      },
    });
  } catch (error) {
    console.error("Error fetching institution appointments:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};

// POST - Crear una nueva institución.
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

// POST - Registrar un lote de instituciones.
export const createInstitutionsBatch = async (req, res) => {
  try {
    const institutions = req.body; // Espera un array de instituciones.

    if (!Array.isArray(institutions) || institutions.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Request must include an array of institutions.",
      });
    }

    const savedInstitutions = [];

    for (const institution of institutions) {
      const { name, institutionType, address, email, operatingHours, dailyDonorCapacity } = institution;

      if (!name || !institutionType || !address || !email || !operatingHours || dailyDonorCapacity === undefined) {
        return res.status(400).json({
          status: "error",
          message: "All fields are required for each institution.",
        });
      }

      const existingInstitution = await Institution.findOne({ email });
      if (existingInstitution) {
        return res.status(409).json({
          status: "error",
          message: `Email ${email} is already registered.`,
        });
      }

      const newInstitution = new Institution({
        name,
        institutionType,
        address,
        email,
        operatingHours,
        dailyDonorCapacity,
        donations: [],
        appointments: [],
      });

      const savedInstitution = await newInstitution.save();
      savedInstitutions.push({
        id: savedInstitution._id,
        name: savedInstitution.name,
        email: savedInstitution.email,
      });
    }

    res.status(201).json({
      status: "success",
      message: `${savedInstitutions.length} institutions registered successfully.`,
      payload: savedInstitutions,
    });
  } catch (error) {
    console.error("Error registering institutions batch:", error);
    res.status(500).json({ status: "error", message: "Internal server error.", error });
  }
};

// UPDATE - Actualizar institución por ID.
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

// DELETE - Eliminar institución por ID.
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
