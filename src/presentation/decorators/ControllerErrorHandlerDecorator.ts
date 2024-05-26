import * as Sentry from '@sentry/serverless';
import { HttpRequest } from '../http/request';
import { HttpResponse } from '../http/response';
import { IHttpController } from '../../application/protocols/http/IHttp';
import {
  HttpConflictError,
  HttpError,
  HttpInternalServerError,
  HttpNotFoundError,
  HttpUnauthorizedError,
  HttpUnprocessableEntityError,
} from '../http/errors';
import { ILogger } from '../../application/protocols/logger/ILogger';

export class ControllerErrorHandlerDecorator {
  constructor(
    private logger: ILogger,
    private readonly controller: IHttpController,
  ) {
    this.logger = this.logger.getChild('ControllerErrorHandlerDecorator');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    try {
      return await this.controller.handle(request);
    } catch (error: any) {
      if (
        [
          'USER_NOT_CONFIRMED',
          'NotAuthorizedException',
          'NotAuthorizedException: Invalid Refresh Token',
          'USER_NOT_AUTHORIZED',
          'ADMIN_USER_NOT_AUTHORIZED',
        ].includes(error.message)
      ) {
        return new HttpUnauthorizedError(error.message);
      }

      if (error.message === 'NotAuthorizedException: Invalid Refresh Token') {
        return new HttpUnauthorizedError('Invalid Refresh Token');
      }

      if (['USER_NOT_FOUND', 'ADMIN_USER_NOT_FOUND'].includes(error.message)) {
        return new HttpNotFoundError(error.message);
      }

      if (['USER_ALREADY_EXISTS'].includes(error.message)) {
        return new HttpConflictError(error.message);
      }

      if (
        ['SIGNUP_ALREADY_VALIDATED', 'USER_WITHOUT_PHOTO'].includes(
          error.message,
        )
      ) {
        return new HttpUnprocessableEntityError(error.message);
      }
      this.logger.error('Internal Server Error', error);
      Sentry.captureException(error);
      return new HttpInternalServerError(error as Error);
    }
  }
}
