import {prisma} from '../..';
import {
  CreateCustomerRepositoryInput,
  CreateCustomerRepositoryOutput,
  ICreateCustomerRepository,
} from '../../../../domain/repositories/customer/ICreateCustomerRepository';

export class CreateCustomerRepository implements ICreateCustomerRepository {
  public async execute(
    input: CreateCustomerRepositoryInput,
  ): Promise<CreateCustomerRepositoryOutput> {
    const customer_repository = prisma.use();
    return await customer_repository.customer.create({
      data: input,
    }) as unknown as CreateCustomerRepositoryOutput;
  }
}
