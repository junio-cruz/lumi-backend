import {HttpRequest} from '../../http/request';
import {HttpOkResponse, HttpResponse} from '../../http/response';
import {
  HttpBadRequestError,
  HttpError,
  HttpInternalServerError,
  HttpNotFoundError,
  HttpUnauthorizedError
} from '../../http/errors';
import {IHttpController} from '../../../application/protocols/http/IHttp';
import {IRequestValidator} from '../../../application/protocols/validator/IValidator';
import {emailValidatorSchema, passwordValidatorSchema} from '../../validatorSchemas/schemas';

import {Logger} from '../../../infra/logger/Logger';
import {FastestValidator} from '../../../infra/validators/FastestValidator';
import {ISignInUseCase, SignInUseCase} from '../../../application/usecases/auth/SignInUseCase';

type RequestBodyParams = {
  email: string;
  password: string;
};

export class SignInUserController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly signInUserUseCase: ISignInUseCase = new SignInUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('SignInUserController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { email, password } = request.body as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        email,
        password,
      },
      {
        email: emailValidatorSchema({ optional: false }),
        password: passwordValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    try {
      const response = await this.signInUserUseCase.execute({
        email,
        password,
      });
      return new HttpOkResponse(response);
    } catch (error: any) {
      if (
          [
            'CUSTOMER_NOT_AUTHORIZED',
            'INVALID_PASSWORD',
          ].includes(error.message)
      ) {
        return new HttpUnauthorizedError(error.message);
      }
      if (['CUSTOMER_NOT_FOUND'].includes(error.message)) {
        return new HttpNotFoundError(error.message);
      }
      this.logger.error('Internal Server Error', error);
      return new HttpInternalServerError(error as Error);
    }
  }
}
