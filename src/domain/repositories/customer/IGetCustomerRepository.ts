import { Customer } from '../../entities/Customer';

export type GetCustomerRepositoryInput = {
  customer_id: string;
};

export type GetCustomerRepositoryOutput = Customer | null;

export interface IGetCustomerRepository {
  execute(input: GetCustomerRepositoryInput): Promise<GetCustomerRepositoryOutput>;
}
