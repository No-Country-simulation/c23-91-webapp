import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 130 },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  diseases: [
    {
      name: { type: String, required: true },
      diagnosedDate: { type: Date },
      notes: { type: String },
    },
  ],
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

const User = mongoose.model("User", userSchema);

export default User;
