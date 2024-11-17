import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (e) {
    console.error('Failed to initialize the application:', e);
  }
};

startApp();
