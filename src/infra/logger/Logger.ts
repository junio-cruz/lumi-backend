import { EventEmitter } from 'events';
import { LogEntry, LogLevel } from './Manager';

export class Logger {
  private logManager: EventEmitter;

  private minLevel: number;

  private module: string;

  private readonly levels: { [key: string]: number } = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
  };

  constructor(
    logManager: EventEmitter,
    module: string,
    minLevel: string = LogLevel.INFO,
  ) {
    this.logManager = logManager;
    this.module = module;
    this.minLevel = this.levelToInt(minLevel);
  }

  public getChild(module: string): Logger {
    const copy: Logger = new (this.constructor as { new (): Logger })();
    copy.logManager = this.logManager;
    copy.minLevel = this.minLevel;
    copy.module = `${this.module} | ${module}`;
    return copy;
  }

  /**
   * Central logging method.
   * @param logLevel
   * @param message
   * @param data
   */
  public log(logLevel: LogLevel, message: string, data?: any): void {
    const level = this.levelToInt(logLevel);
    if (level < this.minLevel) return;

    const logEntry: LogEntry = {
      level: logLevel,
      module: this.module,
      message,
      data,
    };

    this.logManager.emit('log', logEntry);
  }

  public trace(message: string, data?: any): void {
    this.log(LogLevel.TRACE, message, data);
  }

  public debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  public info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  public warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  public error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  /**
   * Converts a string level (trace/debug/info/warn/error) into a number
   *
   * @param minLevel
   */
  private levelToInt(minLevel: string): number {
    if (minLevel.toLowerCase() in this.levels)
      return this.levels[minLevel.toLowerCase()];
    return 99;
  }
}
