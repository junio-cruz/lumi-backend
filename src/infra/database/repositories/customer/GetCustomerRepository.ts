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
    const invoice_repository = prisma.use();
    return await invoice_repository.findUnique({
      where: {
        OR: [
          { customer_id: { equals: input.customer_id } },
          { email: { equals: input.customer_id } },
          { name: { equals: input.customer_id } },
        ],
      },
    });
  }
}
