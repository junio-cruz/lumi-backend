import {prisma} from '../../index';
import {
  DeleteInvoiceRepositoryInput,
  DeleteInvoiceRepositoryOutput,
  IDeleteInvoiceRepository,
} from '../../../../domain/repositories/invoice/IDeleteInvoiceRepository';

export class DeleteInvoiceRepository implements IDeleteInvoiceRepository {
  public async execute(
    input: DeleteInvoiceRepositoryInput,
  ): Promise<DeleteInvoiceRepositoryOutput> {
    const invoice_repository = prisma.use();
    return await invoice_repository.findUnique({
      where: {
        invoice_id: input.invoice_id,
      },
    });
  }
}
