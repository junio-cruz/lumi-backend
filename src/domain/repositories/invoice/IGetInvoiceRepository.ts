import {Invoice} from '../../entities/Invoice';

export type GetInvoiceRepositoryInput = {
  invoice_id: string;
};

export type GetInvoiceRepositoryOutput = Invoice | null;

export interface IGetInvoiceRepository {
  execute(input: GetInvoiceRepositoryInput): Promise<GetInvoiceRepositoryOutput>;
}
