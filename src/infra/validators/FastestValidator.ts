import Validator from 'fastest-validator';
import {
  IRequestValidator,
  ValidateResponse,
} from '../../application/protocols/validator/IValidator';

export class FastestValidator implements IRequestValidator {
  public async validate(
    parameters: any,
    schema: any,
  ): Promise<ValidateResponse> {
    const validator = new Validator({
      useNewCustomCheckerFunction: true,
    });

    const validationResult = await validator.validate(parameters, schema);
    return validationResult === true
      ? {
          isValid: validationResult,
          errors: [],
        }
      : {
          isValid: false,
          errors: validationResult.map(
            result => result.message || `${result.field} - ${result.type}`,
          ),
        };
  }
}
