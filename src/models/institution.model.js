import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institutionType: {
    type: String,
    enum: ["Hospital", "Clinic", "Blood Bank"],
    required: true,
  },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  operatingHours: {
    monday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    tuesday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    wednesday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    thursday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    friday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  dailyDonorCapacity: { type: Number, required: true, min: 0, max: 1000 },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

const Institution = mongoose.model("Institution", institutionSchema);

export default Institution;
