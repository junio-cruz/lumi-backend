import {Logger} from '../../../infra/logger/Logger';
import {Customer} from '../../../domain/entities/Customer';
import {IGetCustomerRepository} from '../../../domain/repositories/customer/IGetCustomerRepository';
import {GetCustomerRepository} from '../../../infra/database/repositories/customer/GetCustomerRepository';

export type SignInUseCaseInput = {
  customer_id: string;
  password: string;
};

export type SignInUseCaseOutput = Customer;

export interface ISignInUseCase {
  execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput>;
}

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly logger: Logger,
    private getCustomerRepository: IGetCustomerRepository = new GetCustomerRepository(),
  ) {
    this.logger = this.logger.getChild('SignInUseCase');
  }

  public async execute(
    input: SignInUseCaseInput,
  ): Promise<SignInUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const customer = await this.getCustomerRepository.execute({ customer_id: input.customer_id });
    this.logger.debug('customer repository response', customer);
    if (!customer) {
      throw new Error('CUSTOMER_NOT_FOUND');
    }
    this.logger.debug('execute output', customer);
    return customer;
  }
}
