import {
  IRequestValidator,
  ValidateResponse,
} from '../../application/protocols/validator/IValidator';

export class FakeValidator implements IRequestValidator {
  public async validate(
    parameters: object,
    schema: any,
  ): Promise<ValidateResponse> {
    console.log(parameters, schema);
    return {
      isValid: true,
      errors: [],
    };
  }
}
