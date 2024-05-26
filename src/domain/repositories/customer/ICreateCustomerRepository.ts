import { Customer } from '../../entities/Customer';

export type CreateCustomerRepositoryInput = {
  customer_id: string;
  name: string;
  email: string;
};

export type CreateCustomerRepositoryOutput = Customer;
export interface ICreateCustomerRepository {
  execute(
    input: CreateCustomerRepositoryInput,
  ): Promise<CreateCustomerRepositoryOutput>;
}
