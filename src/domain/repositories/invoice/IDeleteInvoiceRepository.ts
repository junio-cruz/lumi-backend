import {Invoice} from '../../entities/Invoice';

export type DeleteInvoiceRepositoryInput = {
  invoice_id: string;
};

export type DeleteInvoiceRepositoryOutput = Invoice | null;

export interface IDeleteInvoiceRepository {
  execute(input: DeleteInvoiceRepositoryInput): Promise<DeleteInvoiceRepositoryOutput>;
}
