import { Dayjs } from 'dayjs';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    updateDate: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  updateDate: Date;
}
