import { IAppConfig } from '../../application/protocols/config/IAppConfig';

export class FakeAppConfig implements IAppConfig {
  public getValue(key: string): string {
    console.log(key);
    return 'value';
  }

  public isLocal(): boolean {
    return true;
  }

  public isProduction(): boolean {
    return true;
  }
}
