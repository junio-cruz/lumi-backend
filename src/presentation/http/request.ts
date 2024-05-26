type GenericObject = {
  [key: string]: any;
};

export class HttpRequest {
  constructor(
    public readonly headers?: GenericObject,
    public readonly context?: GenericObject,
    public readonly params?: GenericObject,
    public readonly body?: GenericObject,
    public readonly query?: GenericObject,
    public readonly state?: GenericObject,
  ) {}
}
