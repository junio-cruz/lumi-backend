import {Logger} from '../../../infra/logger/Logger';
import {Invoice} from '../../../domain/entities/Invoice';
import {IListInvoicesRepository} from '../../../domain/repositories/invoice/IListInvoicesRepository';
import {ListInvoicesRepository} from '../../../infra/database/repositories/invoice/ListInvoicesRepository';

export type ListInvoicesUseCaseInput = {
  filter?: {
    customer_id?: string;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListInvoicesUseCaseOutput = {
  page: number;
  page_data: Invoice [];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};
export interface IListInvoicesUseCase {
  execute(input: ListInvoicesUseCaseInput): Promise<ListInvoicesUseCaseOutput>;
}

export class ListInvoicesUseCase implements IListInvoicesUseCase {
  constructor(
    private readonly logger: Logger,
    private listInvoicesRepository: IListInvoicesRepository = new ListInvoicesRepository(),
  ) {
    this.logger = this.logger.getChild('ListInvoicesUseCase');
  }

  public async execute(
    input: ListInvoicesUseCaseInput,
  ): Promise<ListInvoicesUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = await this.listInvoicesRepository.execute(input);
    this.logger.debug('execute output', response);
    return response;
  }
}
