import path from 'node:path';
import express from 'express';
import cors from 'cors';
import routes from '../src/routers/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { env } from '../src/utils/env.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { notFoundHandler } from '../src/middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
const app = express();

app.use(cookieParser());
app.use('/photos', express.static(path.resolve('src/public/photo')));
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerDocs());

app.use(routes);

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
