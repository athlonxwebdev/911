# Campus Assistant Monorepo

A full-stack campus assistant platform with:
- React Native/Expo student + admin apps
- Node.js/Express backend with JWT auth and role-based access
- MongoDB models for users, announcements, intents, and chat history
- Intent-based chatbot engine with keyword and regex pattern matching

## Project Structure

- `backend/` - Express API, MongoDB models, NLP intent matching
- `frontend/` - Expo app with auth flow, student tabs, and admin dashboard

## Backend Features

- JWT login/signup endpoints (`/api/auth`)
- Role-protected routes for admin and student
- Announcement creation/listing
- Intent CRUD for admin
- Chat endpoint for students that resolves intent replies
- Seed script with intents for admissions, fees, exams, library, hostel, and placement

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

## Frontend Features

- Login and signup screens
- Student tabs: Home, Chat, Announcements, Profile
- Admin dashboard: post announcements, manage intents
- Gradient visual theme with cards and chat bubbles

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Set the API URL in `frontend/src/api/client.js` if running on a device.
