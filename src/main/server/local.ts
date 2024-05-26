import {app} from './index';
import {Logger} from '../../infra/logger/Logger';
import {logging} from '../../infra/logger/Manager';
import {AppConfig} from '../../infra/config/AppConfig';
import {prisma} from '../../infra/database';

(async () => {
  const SERVER_PORT = 30022;
  const appConfig = new AppConfig();
  const logger: Logger = logging(appConfig.getValue('LOG_LEVEL')).getLogger(
    'publicServer',
  );
  try {
    await prisma.getConnection();
    await app.run(SERVER_PORT);
    console.log(`server running on port: ${SERVER_PORT}`);
  } catch (error) {
    logger.error('application not started', error);
    process.exit(1);
  }
})();
