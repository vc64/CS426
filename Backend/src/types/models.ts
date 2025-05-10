import { Document, Types } from 'mongoose';

export interface ILocation {
  address: string;
  coordinates?: [number, number]; 
  building?: string;
  room?: string;
}

export interface IProfileInfo {
  name?: string;
  phone?: string;
  location?: ILocation;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  userType: 'student' | 'diningHall' | 'eventOrganizer';
  profileInfo: IProfileInfo;
  createdAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IListing extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  foodType: 'meal' | 'snack' | 'dessert' | 'beverage' | 'groceries' | 'other';
  quantity: string;
  location: ILocation;
  availableFrom: Date;
  availableUntil: Date;
  status: 'available' | 'reserved' | 'completed' | 'expired';
  provider: Types.ObjectId | IUser;
  image?: string;
  createdAt: Date;
}

export interface IReservation extends Document {
  _id: Types.ObjectId;
  listing: Types.ObjectId | IListing;
  student: Types.ObjectId | IUser;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  pickupTime?: Date;
  notes?: string;
  createdAt: Date;
}

export interface IPhoto extends Document {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: Types.ObjectId | IUser;
  altText: string;
}