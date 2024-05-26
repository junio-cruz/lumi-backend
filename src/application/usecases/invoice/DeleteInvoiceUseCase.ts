import {Logger} from '../../../infra/logger/Logger';
import {Invoice} from '../../../domain/entities/Invoice';
import {IAppConfig} from '../../protocols/config/IAppConfig';
import {IGuidGenerator} from '../../protocols/guid/IGuidGenerator';
import {UUIDGuidGenerator} from '../../../infra/guidGenerator/UUIDGuidGenerator';
import {IDeleteInvoiceRepository} from '../../../domain/repositories/invoice/IDeleteInvoiceRepository';
import {DeleteInvoiceRepository} from '../../../infra/database/repositories/invoice/DeleteInvoiceRepository';

export type DeleteInvoiceUseCaseInput = {
  invoice_id: string;
};

export type DeleteInvoiceUseCaseOutput = Invoice | null;

export interface IDeleteInvoiceUseCase {
  execute(input: DeleteInvoiceUseCaseInput): Promise<DeleteInvoiceUseCaseOutput>;
}

export class DeleteInvoiceUseCase implements IDeleteInvoiceUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly appConfig: IAppConfig,
    private guidGenerator: IGuidGenerator = new UUIDGuidGenerator(),
    private createInvoiceRepository: IDeleteInvoiceRepository = new DeleteInvoiceRepository(),
  ) {
    this.logger = this.logger.getChild('DeleteInvoiceUseCase');
  }

  async execute(
    input: DeleteInvoiceUseCaseInput,
  ): Promise<DeleteInvoiceUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = this.createInvoiceRepository.execute({ invoice_id: input.invoice_id, });
    this.logger.debug('delete invoice repository response', response);
    this.logger.debug('execute output', response);
    return response;
  }
}
