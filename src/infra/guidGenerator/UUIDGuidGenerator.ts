import { v4 as uuid } from 'uuid';
import { IGuidGenerator } from '../../application/protocols/guid/IGuidGenerator';

export class UUIDGuidGenerator implements IGuidGenerator {
  public uuidV4(): string {
    return uuid();
  }
}
