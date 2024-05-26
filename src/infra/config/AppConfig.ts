import dotenv from 'dotenv';
import {
  ConfigValue,
  IAppConfig,
} from '../../application/protocols/config/IAppConfig';

dotenv.config({ path: `${__dirname}/../../../.env` });

const ENVS = [
  'NODE_ENV',
  'LOG_LEVEL',
  'MONGO_URL',
  'AWS_REGION',
  'AWS_COGNITO_CLIENT_ID',
  'AWS_COGNITO_USER_POOL_ID',
  'PUBLIC_IMAGES_BUCKET_NAME',
  'TOPIC_ARN',
];

export class AppConfig implements IAppConfig {
  private readonly configValues: ConfigValue = {};

  constructor() {
    ENVS.forEach((env: string) => {
      const value = process.env[env];
      if (!value) throw new Error(`ENV_NOT_DEFINED_OR_MISSING: ${env}`);
      this.configValues[env] = value;
    });
  }

  public getValue(key: string): string {
    const env = this.configValues[key];
    if (!env) throw new Error(`ENV_NOT_DEFINED_OR_MISSING: ${key}`);
    return env;
  }

  public isLocal(): boolean {
    const config = this.getValue('NODE_ENV');
    return ['LOCAL'].includes(config.toUpperCase());
  }

  public isProduction(): boolean {
    const config = this.getValue('NODE_ENV');
    return ['PRD', 'PROD', 'PRODUCTION'].includes(config.toUpperCase());
  }
}
