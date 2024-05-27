import awsLambdaFastify from '@fastify/aws-lambda';
import {FastifyAdapter} from '../../infra/http/FastifyAdapter';

import {Logger} from '../../infra/logger/Logger';
import {logging} from '../../infra/logger/Manager';
import {AppConfig} from '../../infra/config/AppConfig';
import {SignUpController} from '../../presentation/controllers/auth/SignUpUserController';
import {SignInUserController} from '../../presentation/controllers/auth/SignInUserController';
import {ListInvoicesController} from "../../presentation/controllers/invoice/ListInvoicesController";
import {CreateInvoiceController} from "../../presentation/controllers/invoice/CreateInvoiceController";

const server = new FastifyAdapter();

const appConfig = new AppConfig();
const logger: Logger = logging(appConfig.getValue('LOG_LEVEL')).getLogger(
  'ControllerFactory',
);

export const lambda_server = awsLambdaFastify(server.getInstance());

const signInController = new SignInUserController(logger);
const signUpController = new SignUpController(logger, appConfig);

const createInvoiceController = new CreateInvoiceController(logger, appConfig);
const listInvoicesController = new ListInvoicesController(logger);

server.route(
  'post',
  '/auth/sign-up',
  signUpController,
);
server.route(
  'post',
  '/auth/sign-in',
  signInController,
);
server.route(
  'post',
  '/invoice',
  createInvoiceController,
);
server.route(
  'get',
  '/invoices',
  listInvoicesController,
);

export const app = server;
