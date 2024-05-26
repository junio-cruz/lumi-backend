import { LogLevel } from './Manager';

export class FakeLogger {
  public getLogger(moduleName: string): this {
    console.log(moduleName);
    return this;
  }

  public log(logLevel: LogLevel, message: string, data?: any): void {
    console.log(logLevel, message, data);
  }

  public trace(message: string, data?: any): void {
    console.log(message, data);
  }

  public debug(message: string, data?: any): void {
    console.log(message, data);
  }

  public info(message: string, data?: any): void {
    console.log(message, data);
  }

  public warn(message: string, data?: any): void {
    console.log(message, data);
  }

  public error(message: string, data?: any): void {
    console.log(message, data);
  }
}
