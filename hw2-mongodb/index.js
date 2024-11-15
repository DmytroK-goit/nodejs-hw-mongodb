import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './src/server.js';

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (e) {
    console.error('Failed to initialize the application:', e);
  }
};

startApp();
