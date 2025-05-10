import mongoose, { Schema, Model } from 'mongoose';
import { IPhoto } from '../types/models.js';

const PhotoSchema: Schema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: false
  },
  size: {
    type: Number,
    required: false
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  altText: {
    type: String,
    required: false
  }
});

const Photo: Model<IPhoto> = mongoose.model<IPhoto>('Photo', PhotoSchema);

export default Photo;