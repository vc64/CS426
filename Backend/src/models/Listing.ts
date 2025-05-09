import mongoose, { Schema, Model } from 'mongoose';
import { IListing } from '../types/models.js';

const ListingSchema: Schema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
    trim: false
  },
  restaurantName: {
    type: String,
    required: true,
    trim: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  distance: {
    type: Number,
    required: false
  },
  pickupTime: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
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