import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    reply: { type: String, required: true },
    matchedIntent: { type: String, default: null }
  },
  { timestamps: true }
);

export const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
