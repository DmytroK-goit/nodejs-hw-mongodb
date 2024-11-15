import express from 'express';
import cors from 'cors';
import { initMongoConnection } from './db/initMongoConnection.js';
import { env } from '../utils/env.js';

const app = express();
app.use(cors());

export async function setupServer() {
  try {
    await initMongoConnection();
    const PORT = env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error while starting the server:', error);
  }
}
