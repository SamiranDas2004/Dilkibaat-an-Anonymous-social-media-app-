import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password?: string;
  messages: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  avatar: string;
  photos: string[]; // Updated to store an array of photo URLs
}

const UserSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
    unique: true,
  },
  password: {
    type: String,
  },
  photos: [String], // Updated to store an array of photo URLs
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  avatar: {
    type: String,
  }
});

const UserModel = (mongoose.models.User as Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;
