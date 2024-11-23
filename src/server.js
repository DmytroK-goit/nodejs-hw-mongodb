import express from 'express';
import cors from 'cors';
import routes from '../src/routers/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { env } from '../src/utils/env.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { notFoundHandler } from '../src/middlewares/notFoundHandler.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(errorHandler);
app.use(notFoundHandler);

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
