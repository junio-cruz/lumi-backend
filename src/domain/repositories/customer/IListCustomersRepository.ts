import { Customer } from '../../entities/Customer';

export type ListCustomersRepositoryInput = {
  filter?: {
    name?: string;
    created_at?: Date;
    updated_at?: Date;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListCustomersRepositoryOutput = {
  page: number;
  page_data: Customer[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};

export interface IListCustomersRepository {
  execute(input: ListCustomersRepositoryInput): Promise<ListCustomersRepositoryOutput>;
}
