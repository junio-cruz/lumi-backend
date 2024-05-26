/* eslint-disable max-classes-per-file */

export class HttpError extends Error {
  constructor(
    public readonly message: string,
    public readonly data: any,
    public readonly stack?: string,
    public readonly statusCode = 500,
  ) {
    super(message);
    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this, HttpError);
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(
    public readonly data: Array<string>,
    public readonly name = 'HttpBadRequestError',
    public readonly stack?: string,
    public readonly message = 'BAD_REQUEST',
    public readonly statusCode = 400,
  ) {
    super(message, data, stack, statusCode);
    Object.setPrototypeOf(this, HttpBadRequestError.prototype);
    Error.captureStackTrace(this, HttpBadRequestError);
  }
}

export class HttpConflictError extends HttpError {
  constructor(
    public readonly data: any,
    public readonly stack?: string,
    public readonly name = 'HttpConflictError',
    public readonly message = 'CONFLICT',
    public readonly statusCode = 409,
  ) {
    super(message, data, stack, statusCode);
    Object.setPrototypeOf(this, HttpConflictError.prototype);
    Error.captureStackTrace(this, HttpConflictError);
  }
}

export class HttpForbiddenError extends HttpError {
  constructor(
    public readonly data = 'Authenticated user is not authorized',
    public readonly stack?: string,
    public readonly name = 'HttpForbiddenError',
    public readonly message = 'FORBIDDEN',
    public readonly statusCode = 403,
  ) {
    super(message, data, stack, statusCode);
    Object.setPrototypeOf(this, HttpForbiddenError.prototype);
    Error.captureStackTrace(this, HttpForbiddenError);
  }
}

export class HttpNotFoundError extends HttpError {
  constructor(
    public readonly data: any,
    public readonly stack?: string,
    public readonly name = 'HttpNotFoundError',
    public readonly message = 'NOT_FOUND',
    public readonly statusCode = 404,
  ) {
    super(message, data, stack, statusCode);
    Object.setPrototypeOf(this, HttpNotFoundError.prototype);
    Error.captureStackTrace(this, HttpNotFoundError);
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(
    public readonly data: Error,
    public readonly stack?: string,
    public readonly name = 'HttpInternalServerError',
    public readonly message = 'INTERNAL_SERVER_ERROR',
    public readonly statusCode = 500,
  ) {
    super(message, data, stack, statusCode);
    Object.setPrototypeOf(this, HttpInternalServerError.prototype);
    Error.captureStackTrace(this, HttpInternalServerError);
  }
}

export class HttpUnauthorizedError extends HttpError {
  constructor(
    public readonly data = 'User must be authenticated',
    public readonly stack?: string,
    public readonly name = 'HttpUnauthorizedError',
    public readonly message = 'UNAUTHORIZED',
    public readonly statusCode = 401,
  ) {
    super(message, data, stack, statusCode);
    Object.setPrototypeOf(this, HttpUnauthorizedError.prototype);
    Error.captureStackTrace(this, HttpUnauthorizedError);
  }
}

export class HttpUnprocessableEntityError extends HttpError {
  constructor(
    public readonly data: string,
    public readonly stack?: string,
    public readonly name = 'HttpUnprocessableEntityError',
    public readonly message = 'UNPROCESSABLE_ENTITY',
    public readonly statusCode = 422,
  ) {
    super(message, data, stack, statusCode);
    Object.setPrototypeOf(this, HttpUnprocessableEntityError.prototype);
    Error.captureStackTrace(this, HttpUnprocessableEntityError);
  }
}
