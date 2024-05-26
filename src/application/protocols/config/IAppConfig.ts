export type ConfigValue = {
  [key: string]: string;
};

export interface IAppConfig {
  getValue(key: string): string;
  isLocal(): boolean;
  isProduction(): boolean;
}
