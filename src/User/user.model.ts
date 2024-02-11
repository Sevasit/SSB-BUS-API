import * as mongoose from 'mongoose';
import { Type } from 'src/type/type.model';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
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
  phone: string;
  password: string;
  role: mongoose.Types.ObjectId | Type;
}
