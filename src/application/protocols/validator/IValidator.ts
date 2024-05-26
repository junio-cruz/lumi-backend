export type ValidateResponse = {
  isValid: boolean;
  errors: string[];
};

export interface IRequestValidator {
  validate(parameters: any, schema: any): Promise<ValidateResponse>;
}
