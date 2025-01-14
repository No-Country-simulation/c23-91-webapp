import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
 
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
