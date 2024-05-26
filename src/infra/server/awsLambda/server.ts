import {AWSLambda} from '@sentry/serverless';
import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import {Logger} from '../../logger/Logger';
import {logging} from '../../logger/Manager';
import {AppConfig} from '../../config/AppConfig';

import {prisma} from '../../database';

import {lambda_server} from '../../../main/server';

const appConfig = new AppConfig();
AWSLambda.init({
  dsn: 'https://9484c2d1ca4c8fd70836f89c2567e4cf@o4506006042247168.ingest.sentry.io/4506457133481984',
  tracesSampleRate: 0.1,
  environment: appConfig.getValue('NODE_ENV'),
});

export const handler = AWSLambda.wrapHandler(
  async (event: APIGatewayProxyEvent, context: Context) => {
    const logger: Logger = logging(appConfig.getValue('LOG_LEVEL')).getLogger(
      'externalLambdaHandler',
    );
    try {
      await prisma.getConnection();
      logger.debug('lambda external server', event);
      const { pathParameters, requestContext } = event;
      const { stage } = requestContext;
      const pathRouters: { [index: string]: string | undefined } = {
        ...pathParameters,
      };
      if (Object.keys(pathRouters).length && stage) {
        const [route] = Object.keys(pathRouters);
        const url = pathRouters && route && pathRouters[route];
        event.path = `/${stage}/${url}`;
        return lambda_server(event, context);
      }
      logger.error('lambda external server error: missing params', {
        event,
        context,
      });
    } catch (error) {
      logger.error('lambda external server error', error);
      throw error;
    }
  },
);
