import {PrismaClient} from '@prisma/client';

import {Logger} from '../logger/Logger';
import {logging} from '../logger/Manager';
import {AppConfig} from '../config/AppConfig';
import {ILogger} from '../../application/protocols/logger/ILogger';

const appConfig = new AppConfig();
const logger: Logger = logging(appConfig.getValue('LOG_LEVEL')).getLogger(
    'prismaConnection',
);
class PrismaConnection {
  private readonly prisma: PrismaClient;
  constructor(
      private readonly postgresUrl: string,
      private readonly logger: ILogger,
  ) {
    this.prisma = new PrismaClient({
      datasourceUrl: this.postgresUrl,
      log: [
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
      errorFormat: 'pretty',
    });
  }

  public async getConnection(): Promise<boolean> {
    try {
      const prismaConnection = await this.prisma.$connect().then(() => true);
      this.prisma.$on('error' as never, (e: any) => {
        this.logger.error('prisma connection error', e);
        process.exit(1);
      });
      return prismaConnection;
    } catch (error) {
      this.logger.error('prisma connect error', error);
      throw error;
    }
  }
  public use(): PrismaClient {
    return this.prisma;
  }
}

export const prisma = new PrismaConnection(
    appConfig.getValue('POSTGRES_URL'),
    logger,
);
