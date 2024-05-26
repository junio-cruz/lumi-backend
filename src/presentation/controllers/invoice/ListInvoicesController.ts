import {HttpRequest} from '../../http/request';
import {HttpOkResponse, HttpResponse} from '../../http/response';
import {HttpBadRequestError, HttpError} from '../../http/errors';
import {IHttpController} from '../../../application/protocols/http/IHttp';
import {IRequestValidator} from '../../../application/protocols/validator/IValidator';
import {pageSizeValidatorSchema, pageValidatorSchema, uuidV4ValidatorSchema,} from '../../validatorSchemas/schemas';
import {IListInvoicesUseCase, ListInvoicesUseCase,} from '../../../application/usecases/invoice/ListInvoicesUseCase';

import {Logger} from '../../../infra/logger/Logger';
import {Invoice, invoiceResolver} from '../../../domain/entities/Invoice';
import {FastestValidator} from '../../../infra/validators/FastestValidator';

type RequestQueryParameters = {
  customer_id?: string;
  page?: number;
  page_size?: number;
};

export class ListInvoicesController implements IHttpController {
  constructor(
      private readonly logger: Logger,
      private readonly requestValidator: IRequestValidator = new FastestValidator(),
      private readonly listInvoicesUseCase: IListInvoicesUseCase = new ListInvoicesUseCase(
          logger,
      ),
  ) {
    this.logger = this.logger.getChild('ListInvoicesController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    let { customer_id, page, page_size } =
        request.query as RequestQueryParameters;

    const requestValidation = await this.requestValidator.validate(
        {
          customer_id,
          page,
          page_size,
        },
        {
          customer_id: uuidV4ValidatorSchema({ optional: true }),
          page: pageValidatorSchema({ optional: true }),
          pageSize: pageSizeValidatorSchema({ optional: true }),
        },
    );
    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }
    const filter: { [index: string]: unknown } = {
      customer_id,
      page,
      page_size,
    };

    Object.keys(filter).forEach(
        key => filter[key] === undefined && delete filter[key],
    );

    const response = await this.listInvoicesUseCase.execute({
      filter,
      order: {
        [request.query?.orderField || 'created_at']:
        request.query?.orderDirection || 'asc',
      },
      pagination: {
        page: Number(request.query?.page) || 1,
        page_size: Number(request.query?.page_size) || 10,
      },
    });
    return new HttpOkResponse({
      ...response,
      page_result: response.page_data.map((invoice: Invoice) => invoiceResolver(invoice)),
    });
  }
}
