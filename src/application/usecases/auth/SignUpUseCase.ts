import {ILogger} from '../../protocols/logger/ILogger';
import {Customer} from '../../../domain/entities/Customer';
import {IAppConfig} from '../../protocols/config/IAppConfig';
import {IGuidGenerator} from '../../protocols/guid/IGuidGenerator';
import {UUIDGuidGenerator} from '../../../infra/guidGenerator/UUIDGuidGenerator';
import {
  CreateCustomerRepositoryInput,
  ICreateCustomerRepository
} from '../../../domain/repositories/customer/ICreateCustomerRepository';
import {IGetCustomerRepository} from '../../../domain/repositories/customer/IGetCustomerRepository';
import {GetCustomerRepository} from '../../../infra/database/repositories/customer/GetCustomerRepository';
import {CreateCustomerRepository} from '../../../infra/database/repositories/customer/CreateCustomerRepository';

export type SignUpUseCaseInput = {
  name: string;
  email: string;
  password: string;
};

export type SignUpUseCaseOutput = Customer;

export interface ISignUpUseCase {
  execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput>;
}

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    private logger: ILogger,
    private appConfig: IAppConfig,
    private guidGenerator: IGuidGenerator = new UUIDGuidGenerator(),
    private getCustomerRepository: IGetCustomerRepository = new GetCustomerRepository(),
    private createCustomerRepository: ICreateCustomerRepository = new CreateCustomerRepository(),
  ) {
    this.logger = this.logger.getChild('SignUpUseCase');
  }

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const email = input.email.toLowerCase();
    try {
      const customer_found = await this.getCustomerRepository.execute({
        customer_id: email,
      });
      this.logger.debug('customer repository response', customer_found);
      if (customer_found) {
        throw new Error('CUSTOMER_ALREADY_EXISTS');
      }
      const createRepositoryInput: CreateCustomerRepositoryInput = {
        customer_id: this.guidGenerator.uuidV4(),
        email: input.email,
        name: input.name,
      };
      const customer = await this.createCustomerRepository.execute(
        createRepositoryInput,
      );
      this.logger.debug('create customer repository response', customer);
      this.logger.debug('execute output', customer);
      return customer;
    } catch (error) {
      this.logger.error('error', error);
      throw error;
    }
  }
}
