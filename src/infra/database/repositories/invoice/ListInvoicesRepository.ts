import {prisma} from '../..';
import {
  IListInvoicesRepository,
  ListInvoicesRepositoryInput,
  ListInvoicesRepositoryOutput,
} from '../../../../domain/repositories/invoice/IListInvoicesRepository';

export class ListInvoicesRepository implements IListInvoicesRepository {
  public async execute(
    input: ListInvoicesRepositoryInput,
  ): Promise<ListInvoicesRepositoryOutput> {
    const queryFilters = {} as {
      customer_id?: string;
    };

    if (input?.filter?.customer_id) {
      queryFilters.customer_id = input.filter.customer_id;
    }

    const page = input.pagination?.page || 1;
    const pageSize = input.pagination?.page_size || 10;
    const invoice_repository = prisma.use();
    const [count, invoices] = await invoice_repository.$transaction([
      invoice_repository.count({
        where: queryFilters,
      }),
      invoice_repository.findMany({
        where: queryFilters,
        skip: (page - 1) * (pageSize || 0),
        take: pageSize || undefined,
      }),
    ]);

    return {
      page,
      page_data: invoices,
      page_count: invoices.length,
      all_count: count,
      all_pages_count: Math.ceil(count / pageSize),
    };
  }
}
