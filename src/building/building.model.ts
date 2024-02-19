import * as mongoose from 'mongoose';

export const BuildingSchema = new mongoose.Schema(
  {
    nameBuilding: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface Building extends mongoose.Document {
  nameBuilding: string;
}
