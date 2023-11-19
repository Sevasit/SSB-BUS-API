import { Dayjs } from 'dayjs';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
    updateDate: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  },
);

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdDate: Date;
  updateDate: Date;
}
