import debug from 'debug';
import { startServer } from './app';

const logger = debug('app:index');

(async () => {
  logger('starting app...');
  await startServer();
  logger('app started...');
})();
