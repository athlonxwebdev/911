import { Announcement } from '../models/Announcement.js';

export const getAnnouncements = async (_req, res) => {
  const announcements = await Announcement.find().populate('postedBy', 'name role').sort({ createdAt: -1 });
  res.json(announcements);
};

export const createAnnouncement = async (req, res) => {
  const { title, body } = req.body;
  const announcement = await Announcement.create({ title, body, postedBy: req.user._id });
  res.status(201).json(announcement);
};
