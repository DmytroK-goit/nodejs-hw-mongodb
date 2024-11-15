import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

export async function initMongoConnection() {
  await mongoose.connect(DB_URI);
}
