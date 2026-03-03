import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const signToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const signup = async (req, res) => {
  const { name, email, password, role = 'student' } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  return res.status(201).json({
    token: signToken(user._id, user.role),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    token: signToken(user._id, user.role),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};
