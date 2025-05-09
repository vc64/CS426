import mongoose, { Schema, Model } from 'mongoose';
import { IListing } from '../types/models.js';

const ListingSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  foodType: {
    type: String,
    enum: ['meal', 'snack', 'dessert', 'beverage', 'groceries', 'other'],
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    building: String,
    room: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  availableFrom: {
    type: Date,
    required: true
  },
  availableUntil: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'completed', 'expired'],
    default: 'available'
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Listing: Model<IListing> = mongoose.model<IListing>('Listing', ListingSchema);

export default Listing;