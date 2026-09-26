import app from './app';
import { config } from './config/env.config';
import { connectDatabase } from './config/db.config';
import { logger } from './utils/logger';

const startServer = async () => {
  await connectDatabase();

  app.listen(config.port, () => {
    logger.info(`🚀 AgriSathi AI API Server running in ${config.nodeEnv} mode on http://localhost:${config.port}`);
  });
};

startServer();

