import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;