import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

// to capture the uncaught exception

process.on('uncaughtException', error => {
  // console.log('uncaught exception detected....')
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database conntected successfully');

    server = app.listen(config.port, () => {
      logger.info(`app is listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('something went wrong', error);
  }

  process.on('unhandledRejection', error => {
    // console.log('unhandled rejection detected. server closing....')

    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

startServer();

// testing uncaught exception
// console.log(x)

process.on('SIGTERM', () => {
  logger.info('SIGTERM  is recieved');

  if (server) {
    server.close();
  }
});
