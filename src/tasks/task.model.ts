import * as mongoose from 'mongoose';
import { Building } from 'src/building/building.model';
import { Type } from 'src/type/type.model';

export const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    remark: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
    location: { type: String, required: true },
    status: { type: String, default: 'pending' },
    imageStart: { type: String, required: true },
    annotation: { type: String, default: '' },
    imageEnd: { type: String, default: '' },
    processBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: '',
    },
    processAt: { type: Date, default: '' },
    point: { type: Number, required: true, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface Task extends mongoose.Document {
  userId: string;
  name: string;
  phone: string;
  remark: string;
  type: mongoose.Types.ObjectId | Type;
  building: mongoose.Types.ObjectId | Building;
  location: string;
  status: string;
  imageStart: string;
  annotation: string;
  imageEnd: string;
  processBy: any;
  processAt: Date;
  point: number;
}
