import {prisma} from '../../index';
import {
  GetCustomerRepositoryInput,
  GetCustomerRepositoryOutput,
  IGetCustomerRepository,
} from '../../../../domain/repositories/customer/IGetCustomerRepository';

export class GetCustomerRepository implements IGetCustomerRepository {
  public async execute(
      input: GetCustomerRepositoryInput,
  ): Promise<GetCustomerRepositoryOutput> {
    const customer_repository = prisma.use();
    return await customer_repository.customer.findFirst({
      where: {
        OR: [{ email: input.customer_id }, { customer_id: input.customer_id }],
      },
    }) as GetCustomerRepositoryOutput;
  }
}
