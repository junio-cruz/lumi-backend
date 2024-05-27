import {Logger} from '../../../infra/logger/Logger';
import {Customer} from '../../../domain/entities/Customer';
import {Encryptor} from '../../../infra/encryptor/encryptor';
import {IEncryptor} from '../../protocols/encryptor/IEncryptor';
import {IGetCustomerRepository} from '../../../domain/repositories/customer/IGetCustomerRepository';
import {GetCustomerRepository} from '../../../infra/database/repositories/customer/GetCustomerRepository';


export type SignInUseCaseInput = {
  email: string;
  password: string;
};

export type SignInUseCaseOutput = Customer;

export interface ISignInUseCase {
  execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput>;
}

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly logger: Logger,
    private encryptor: IEncryptor = new Encryptor(),
    private getCustomerRepository: IGetCustomerRepository = new GetCustomerRepository(),
  ) {
    this.logger = this.logger.getChild('SignInUseCase');
  }

  public async execute(
    input: SignInUseCaseInput,
  ): Promise<SignInUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const customer = await this.getCustomerRepository.execute({ customer_id: input.email.toLowerCase() });
    this.logger.debug('customer repository response', customer);
    if (!customer) {
      throw new Error('CUSTOMER_NOT_FOUND');
    }
    const password = await this.encryptor.decrypt({
      key: input.email,
      cypher_text: customer.password
    })
    this.logger.debug('password', password);
    if (password !== input.password) {
      throw new Error('INVALID_PASSWORD')
    }
    this.logger.debug('execute output', customer);
    return customer;
  }
}
