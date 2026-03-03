import 'dotenv/config';
import { connectDB } from '../config/db.js';
import { Intent } from '../models/Intent.js';

const defaultIntents = [
  { tag: 'admissions', keywords: ['admission', 'apply', 'eligibility'], patterns: ['admission.*process'], response: 'Admissions are open from June to August. You can apply online via the student portal.' },
  { tag: 'fees', keywords: ['fee', 'tuition', 'payment'], patterns: ['fee.*structure'], response: 'Fee details are available in your ERP account under Finance > Fee Ledger.' },
  { tag: 'exams', keywords: ['exam', 'schedule', 'result'], patterns: ['exam.*date'], response: 'Exam timetables are released two weeks before exams in the announcements section.' },
  { tag: 'library', keywords: ['library', 'books', 'issue'], patterns: ['library.*timing'], response: 'Library timing is 8 AM to 8 PM on weekdays and 9 AM to 2 PM on Saturdays.' },
  { tag: 'hostel', keywords: ['hostel', 'accommodation', 'room'], patterns: ['hostel.*fees'], response: 'Hostel allotment is based on availability. Contact hostel office for room updates.' },
  { tag: 'placement', keywords: ['placement', 'internship', 'company'], patterns: ['placement.*drive'], response: 'Placement cell posts drive schedules every Friday in announcements.' }
];

const run = async () => {
  await connectDB();
  for (const intent of defaultIntents) {
    await Intent.findOneAndUpdate({ tag: intent.tag }, intent, { upsert: true, new: true });
  }
  console.log('Default intents seeded successfully');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
