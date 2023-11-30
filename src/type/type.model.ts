import * as mongoose from 'mongoose';

export const TypeSchema = new mongoose.Schema(
  {
    typeName: { type: String, required: true, unique: true },
    typeCode: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface Type extends mongoose.Document {
  typeName: string;
  typeCode: string;
}
