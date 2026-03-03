import mongoose from 'mongoose';

const intentSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true, unique: true },
    keywords: [{ type: String, required: true }],
    patterns: [{ type: String }],
    response: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Intent = mongoose.model('Intent', intentSchema);
