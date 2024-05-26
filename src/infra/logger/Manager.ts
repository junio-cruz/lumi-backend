import { EventEmitter } from 'events';
import { Logger } from './Logger';

export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export type LogEntry = {
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
};

export class LogManager extends EventEmitter {
  private static minLevel: string;

  private consoleLoggerRegistered = false;

  constructor(private readonly minLevel: string = LogLevel.INFO) {
    super();
  }

  public getLogger(module: string): Logger {
    if (!LogManager.minLevel) {
      return new Logger(this, module, this.minLevel);
    }
    return new Logger(this, module, LogManager.minLevel);
  }

  public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
    this.on('log', listener);
    return this;
  }

  public registerConsoleLogger(): LogManager {
    if (this.consoleLoggerRegistered) return this;

    this.onLogEntry(logEntry => {
      const msg = `[${logEntry.level.toUpperCase()}] [${logEntry.module}]: ${
        logEntry.message
      }`;
      switch (logEntry.level) {
        case LogLevel.TRACE:
          if (logEntry.data) {
            console.trace(msg, ' :: ', logEntry.data);
          } else {
            console.trace(msg);
          }
          break;
        case LogLevel.DEBUG:
          if (logEntry.data) {
            console.debug(msg, ' :: ', logEntry.data);
          } else {
            console.debug(msg);
          }
          break;
        case LogLevel.INFO:
          if (logEntry.data) {
            console.info(msg, ' :: ', logEntry.data);
          } else {
            console.info(msg);
          }
          break;
        case LogLevel.WARN:
          if (logEntry.data) {
            console.warn(msg, ' :: ', logEntry.data);
          } else {
            console.warn(msg);
          }
          break;
        case LogLevel.ERROR:
          if (logEntry.data) {
            console.error(msg, ' :: ', logEntry.data);
          } else {
            console.error(msg);
          }
          break;
        default:
          if (logEntry.data) {
            console.log(`{${logEntry.level}} ${msg}`, logEntry.data);
          } else {
            console.log(msg);
          }
      }
    });

    this.consoleLoggerRegistered = true;
    return this;
  }
}

export const logging = (minLevel?: string) =>
  new LogManager(minLevel).registerConsoleLogger();
