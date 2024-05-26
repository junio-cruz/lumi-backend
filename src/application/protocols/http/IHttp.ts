import { HttpError } from '../../../presentation/http/errors';
import { HttpRequest } from '../../../presentation/http/request';
import { HttpResponse } from '../../../presentation/http/response';

export type HttpRequestContext = {
  status: number;
  data?: any;
  error?: any;
};

export interface IHttpController {
  handle(request: HttpRequest): Promise<HttpResponse | HttpError>;
}

export interface HttpServer {
  app: any;

  route(method: string, url: string, callback: IHttpController): void;

  run(port: number): Promise<any>;

  getInstance(): void;

  close(): Promise<void>;
}
