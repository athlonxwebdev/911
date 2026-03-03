import { ChatHistory } from '../models/ChatHistory.js';
import { matchIntent } from '../services/nlpEngine.js';

const fallback = 'I could not understand that yet. Please contact the admin or ask about admissions, fees, exams, library, hostel, or placement.';

export const chat = async (req, res) => {
  const { message } = req.body;
  const intent = await matchIntent(message);

  const reply = intent?.response ?? fallback;
  const item = await ChatHistory.create({
    user: req.user._id,
    message,
    reply,
    matchedIntent: intent?.tag ?? null
  });

  res.json({ reply, matchedIntent: item.matchedIntent });
};

export const getChatHistory = async (req, res) => {
  const history = await ChatHistory.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json(history);
};
