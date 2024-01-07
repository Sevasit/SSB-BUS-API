import * as mongoose from 'mongoose';

export const BuildingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface Building extends mongoose.Document {
  name: string;
}
