import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institutionType: {
    type: String,
    enum: ["Hospital", "Clinic", "Blood Bank"],
    required: true,
  },
  address: { type: String, required: true },
  phone: { 
    type: String, 
    required: true,
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
  },
  operatingHours: { type: String, required: true },
  dailyDonorCapacity: { type: Number, required: true, min: 0 },
});

const Institution = mongoose.model("Institution", institutionSchema);

export default Institution;
