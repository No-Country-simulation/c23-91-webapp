import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
  },
  diseases: [
    {
      name: { type: String, required: true },
      diagnosedDate: { type: Date },
      notes: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
