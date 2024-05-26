import { IGuidGenerator } from '../../application/protocols/guid/IGuidGenerator';

export class FakeGuidGenerator implements IGuidGenerator {
  public uuidV4(): string {
    return 'valid_uuid';
  }
}
