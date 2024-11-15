import express from 'express';
import cors from 'cors';
import { initMongoConnection } from './db/initMongoConnection.js';

const app = express();
app.use(cors());

async function setupServer() {
  try {
    await initMongoConnection();

    const PORT = env('MONGODB_USER');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

setupServer();
