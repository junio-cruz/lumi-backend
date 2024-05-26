import {HttpRequest} from '../../http/request';
import {Logger} from '../../../infra/logger/Logger';
import {HttpBadRequestError, HttpError,} from '../../http/errors';
import {HttpCreatedResponse, HttpResponse} from '../../http/response';
import {IHttpController} from '../../../application/protocols/http/IHttp';
import {IAppConfig} from '../../../application/protocols/config/IAppConfig';
import {FastestValidator} from '../../../infra/validators/FastestValidator';
import {IRequestValidator} from '../../../application/protocols/validator/IValidator';
import {fileValidatorSchema, uuidV4ValidatorSchema,} from '../../validatorSchemas/schemas';

import {CreateInvoiceUseCase, ICreateInvoiceUseCase,} from '../../../application/usecases/invoice/CreateInvoiceUseCase';

type RequestParams = {
  customer_id: string;
};

type RequestBodyParams = {
  file: File;
};
export class CreateInvoiceController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly appConfig: IAppConfig,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly createInvoiceUseCase: ICreateInvoiceUseCase = new CreateInvoiceUseCase(
      logger,
      appConfig,
    ),
  ) {
    this.logger = this.logger.getChild('CreateUserPhotoPreSignedUrlController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { customer_id } = request.params as RequestParams;
    const { file } = request.body as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        customer_id,
        file,
      },
      {
        customer_id: uuidV4ValidatorSchema({ optional: false }),
        file: fileValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    const invoice = await this.createInvoiceUseCase.execute({
      customer_id,
      file,
    });

    return new HttpCreatedResponse(invoice);
  }
}
