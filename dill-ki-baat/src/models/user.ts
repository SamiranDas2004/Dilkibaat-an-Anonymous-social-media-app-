import mongoose, { Schema, Document, Model } from "mongoose";
import { Message } from "./message";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  messages: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
});

// Ensure the model is only created once
const UserModel = (mongoose.models.User as Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;
