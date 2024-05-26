export const uuidV4ValidatorSchema = ({ optional = false }) => ({
  type: 'uuid',
  version: 4,
  optional,
});

export const nameValidatorSchema = ({ optional = false }) => ({
  type: 'string',
  optional,
});

export const emailValidatorSchema = ({ optional = false }) => ({
  type: 'email',
  optional,
});

export const passwordValidatorSchema = ({ optional = false }) => ({
  type: 'string',
  pattern: '^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,99}$',
  optional,
});

export const pageValidatorSchema = ({ optional = false }) => ({
  type: 'number',
  integer: true,
  min: 1,
  convert: true,
  optional,
});

export const pageSizeValidatorSchema = ({ optional = false }) => ({
  type: 'number',
  integer: true,
  min: 1,
  convert: true,
  optional,
});

export const fileValidatorSchema = ({ optional = false }) => ({
  type: 'any',
  optional,
});

export const stringValidatorSchema = ({ optional = false }) => ({
  type: 'string',
  optional,
});

export const booleanValidatorSchema = ({ optional = false }) => ({
  type: 'boolean',
  convert: true,
  optional,
});
