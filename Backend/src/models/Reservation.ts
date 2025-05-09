import mongoose, { Schema, Model } from "mongoose";
import { IReservation } from "../types/models.js";

const ReservationSchema: Schema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  pickupTime: {
    type: Date,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation: Model<IReservation> = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);

export default Reservation;
