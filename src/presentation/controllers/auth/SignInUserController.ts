import {HttpRequest} from '../../http/request';
import {HttpOkResponse, HttpResponse} from '../../http/response';
import {HttpBadRequestError, HttpError} from '../../http/errors';
import {IHttpController} from '../../../application/protocols/http/IHttp';
import {IRequestValidator} from '../../../application/protocols/validator/IValidator';
import {passwordValidatorSchema, uuidV4ValidatorSchema,} from '../../validatorSchemas/schemas';

import {Logger} from '../../../infra/logger/Logger';
import {FastestValidator} from '../../../infra/validators/FastestValidator';
import {ISignInUseCase, SignInUseCase} from '../../../application/usecases/auth/SignInUseCase';

type RequestBodyParams = {
  customer_id: string;
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
    const { customer_id, password } = request.body as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        customer_id,
        password,
      },
      {
        customer_id: uuidV4ValidatorSchema({ optional: false }),
        password: passwordValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    const response = await this.signInUserUseCase.execute({
      customer_id,
      password,
    });

    return new HttpOkResponse(response);
  }
}
