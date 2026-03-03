import { Intent } from '../models/Intent.js';

export const listIntents = async (_req, res) => {
  const intents = await Intent.find().sort({ updatedAt: -1 });
  res.json(intents);
};

export const createIntent = async (req, res) => {
  const intent = await Intent.create(req.body);
  res.status(201).json(intent);
};

export const updateIntent = async (req, res) => {
  const updated = await Intent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    return res.status(404).json({ message: 'Intent not found' });
  }
  res.json(updated);
};
