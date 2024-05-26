/* eslint-disable max-classes-per-file */

type GenericObject = {
  [key: string]: any;
};

export class HttpResponse {
  constructor(
    public readonly body: GenericObject,
    public readonly statusCode: number,
  ) {}
}

export class HttpOkResponse extends HttpResponse {
  constructor(public readonly body: GenericObject) {
    super(body, 200);
    Object.setPrototypeOf(this, HttpOkResponse.prototype);
    Error.captureStackTrace(this, HttpOkResponse);
  }
}

export class HttpCreatedResponse extends HttpResponse {
  constructor(public readonly body: GenericObject) {
    super(body, 201);
    Object.setPrototypeOf(this, HttpCreatedResponse.prototype);
    Error.captureStackTrace(this, HttpCreatedResponse);
  }
}

export class HttpRedirectResponse extends HttpResponse {
  constructor(public readonly body: GenericObject) {
    super(body, 301);
    Object.setPrototypeOf(this, HttpRedirectResponse.prototype);
    Error.captureStackTrace(this, HttpRedirectResponse);
  }
}
