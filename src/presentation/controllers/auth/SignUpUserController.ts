import {HttpRequest} from '../../http/request';
import {customerResolver,} from '../../../domain/entities/Customer';
import {HttpOkResponse, HttpResponse} from '../../http/response';
import {HttpBadRequestError, HttpError} from '../../http/errors';
import {IHttpController} from '../../../application/protocols/http/IHttp';
import {emailValidatorSchema, nameValidatorSchema, passwordValidatorSchema,} from '../../validatorSchemas/schemas';

import {Logger} from '../../../infra/logger/Logger';
import {IAppConfig} from '../../../application/protocols/config/IAppConfig';
import {FastestValidator} from '../../../infra/validators/FastestValidator';
import {IRequestValidator} from '../../../application/protocols/validator/IValidator';
import {ISignUpUseCase, SignUpUseCase,} from '../../../application/usecases/auth/SignUpUseCase';

type RequestBodyParams = {
  name: string;
  email: string;
  password: string;
};

export class SignUpController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly appConfig: IAppConfig,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly signUpCustomerUseCase: ISignUpUseCase = new SignUpUseCase(
      logger,
      appConfig,
    ),
  ) {
    this.logger = this.logger.getChild('SignUpCustomerController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { name, email, password } =
      request.body as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        name,
        email,
        password,
      },
      {
        name: nameValidatorSchema({ optional: false }),
        email: emailValidatorSchema({ optional: false }),
        password: passwordValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    const customer = await this.signUpCustomerUseCase.execute({
      name,
      email,
      password,
    });

    return new HttpOkResponse(customerResolver(customer));
  }
}
