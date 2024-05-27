import {Logger} from '../../../infra/logger/Logger';
import {Invoice} from '../../../domain/entities/Invoice';
import {IAppConfig} from '../../protocols/config/IAppConfig';
import {IGuidGenerator} from '../../protocols/guid/IGuidGenerator';
import {
  CreateInvoiceRepositoryInput,
  ICreateInvoiceRepository
} from '../../../domain/repositories/invoice/ICreateInvoiceRepository';
import {UUIDGuidGenerator} from '../../../infra/guidGenerator/UUIDGuidGenerator';
import {CreateInvoiceRepository} from '../../../infra/database/repositories/invoice/CreateInvoiceRepository';

export type CreateInvoiceUseCaseInput = {
  customer_id: string;
  file: File;
};

export type CreateInvoiceUseCaseOutput = Invoice;

export interface ICreateInvoiceUseCase {
  execute(input: CreateInvoiceUseCaseInput): Promise<CreateInvoiceUseCaseOutput>;
}

export class CreateInvoiceUseCase implements ICreateInvoiceUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly appConfig: IAppConfig,
    private guidGenerator: IGuidGenerator = new UUIDGuidGenerator(),
    private createInvoiceRepository: ICreateInvoiceRepository = new CreateInvoiceRepository(),
  ) {
    this.logger = this.logger.getChild('CreateInvoiceUseCase');
  }

  async execute(
    input: CreateInvoiceUseCaseInput,
  ): Promise<CreateInvoiceUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const createInvoiceRepository: CreateInvoiceRepositoryInput = {
      customer_id: input.customer_id,
      invoice_id: this.guidGenerator.uuidV4(),
      reference_month: '',
      electric_energy: 0,
      scee_energy: 0,
      compensated_energy: 0,
      public_contribution_ilum: 0,
      created_at: new Date(),
    }
    const response = this.createInvoiceRepository.execute(createInvoiceRepository);
    this.logger.debug('update invoice repository response', response);
    this.logger.debug('execute output', response);
    return response;
  }
}
