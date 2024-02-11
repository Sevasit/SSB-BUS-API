import * as mongoose from 'mongoose';
import { Type } from 'src/type/type.model';

export const TaskCountSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true,
    },
    count: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface TaskCount extends mongoose.Document {
  type: string;
  typeId: mongoose.Types.ObjectId | Type;
  count: number;
}
