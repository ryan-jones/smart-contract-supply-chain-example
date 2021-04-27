import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: [isEmail, "please enter a valid email"],
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    minLength: 6,
  },
  address: {
    required: true,
    type: String,
  },
  role: {
    require: true,
    type: String,
    default: "basic",
    enum: ["basic", "admin"],
  },
  accessToken: {
    type: String,
  },
});

export interface IProfile extends mongoose.Document {
  accessToken: string;
  address: string;
  dateCreated: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export default mongoose.model<IProfile>("profile", ProfileSchema);
