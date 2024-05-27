import {prisma} from '../../index';
import {
  GetCustomerRepositoryInput,
  GetCustomerRepositoryOutput,
  IGetCustomerRepository,
} from '../../../../domain/repositories/customer/IGetCustomerRepository';
import {GetInvoiceRepositoryOutput} from "../../../../domain/repositories/invoice/IGetInvoiceRepository";

export class GetCustomerRepository implements IGetCustomerRepository {
  public async execute(
      input: GetCustomerRepositoryInput,
  ): Promise<GetCustomerRepositoryOutput> {
    const customer_repository = prisma.use();
    return await customer_repository.customer.findFirst({
      where: {
        OR: [
          { email: { equals: input.customer_id } },
          { customer_id: { equals: input.customer_id } }
        ]
      },
    }) as GetInvoiceRepositoryOutput;
  }
}
