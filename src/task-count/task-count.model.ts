import * as mongoose from 'mongoose';

export const TaskCountSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface TaskCount extends mongoose.Document {
  type: string;
  count: number;
}
