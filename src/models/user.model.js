import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
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
  // profilePicture: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
