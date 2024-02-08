import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    remark: { type: String, required: true },
    type: { type: String, required: true },
    building: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, default: 'pending' },
    imageStart: { type: String, required: true },
    annotation: { type: String, default: '' },
    imageEnd: { type: String, default: '' },
    processBy: { type: String, default: '' },
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
  type: string;
  building: string;
  location: string;
  status: string;
  imageStart: string;
  annotation: string;
  imageEnd: string;
  processBy: string;
  processAt: Date;
  point: number;
}
