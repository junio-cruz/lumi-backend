import {Invoice} from '../../entities/Invoice';

export type CreateInvoiceRepositoryInput = {
  customer_id: string;
  invoice_id: string;
  reference_month: string;
  electric_energy: number;
  scee_energy: number;
  compensated_energy: number;
  public_contribution_ilum: number;
  created_at: Date;
  updated_at?: Date;
};

export type CreateInvoiceRepositoryOutput = Invoice;
export interface ICreateInvoiceRepository {
  execute(
    input: CreateInvoiceRepositoryInput,
  ): Promise<CreateInvoiceRepositoryOutput>;
}
