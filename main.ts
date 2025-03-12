import express from 'express';
import todoRouter from './feature/todo/todo.controller';
import { AppDataSource } from './app/db/db';
import { errorHandler } from './app/middlewares/errorHandler';

// rul
// грейсфул, валидация, контроллер - сервис (хелперы) - репо (энтити)
// классы см пм-монитор-сервис?
// валидация?
// тесты?
AppDataSource.initialize().catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use('/todo', todoRouter);
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
const server = app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});

const shutdown = (signal: string) => {
  console.info(`Received ${signal}. Closing HTTP server...`);
  server.close((err) => {
    if (err) {
      console.info('Error during shutdown:', err);
      process.exit(1);
    }
    console.info('HTTP server closed. Exiting process...');
    process.exit(0);
  });
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));