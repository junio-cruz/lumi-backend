import {prisma} from '../../index';
import {
  CreateInvoiceRepositoryInput,
  CreateInvoiceRepositoryOutput,
  ICreateInvoiceRepository,
} from '../../../../domain/repositories/invoice/ICreateInvoiceRepository';

export class CreateInvoiceRepository implements ICreateInvoiceRepository {
  public async execute(
    input: CreateInvoiceRepositoryInput,
  ): Promise<CreateInvoiceRepositoryOutput> {
    const invoice_repository = prisma.use();
    return await invoice_repository.invoice.create({
      data: input,
    }) as CreateInvoiceRepositoryOutput;
  }
}
