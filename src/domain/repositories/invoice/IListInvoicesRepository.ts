import {Invoice} from '../../entities/Invoice';

export type ListInvoicesRepositoryInput = {
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

export type ListInvoicesRepositoryOutput = {
  page: number;
  page_data: Invoice[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};

export interface IListInvoicesRepository {
  execute(input: ListInvoicesRepositoryInput): Promise<ListInvoicesRepositoryOutput>;
}
