import { Logger } from '../../../infra/logger/Logger';

export interface ILogger {
  getChild(module: string): Logger;
  trace(message: string, data?: any): void;
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, data?: any): void;
}
