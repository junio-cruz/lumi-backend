import {prisma} from '../../index';
import {
  GetInvoiceRepositoryInput,
  GetInvoiceRepositoryOutput,
  IGetInvoiceRepository,
} from '../../../../domain/repositories/invoice/IGetInvoiceRepository';

export class GetInvoiceRepository implements IGetInvoiceRepository {
  public async execute(
    input: GetInvoiceRepositoryInput,
  ): Promise<GetInvoiceRepositoryOutput> {
    const invoice_repository = prisma.use();
    return await invoice_repository.invoice.findUnique({
      where: {
        invoice_id: input.invoice_id,
      },
    }) as GetInvoiceRepositoryOutput;
  }
}
