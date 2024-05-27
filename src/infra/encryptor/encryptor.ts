import CryptoJS from 'crypto-js';
import {DecryptInput, EncryptInput, IEncryptor} from '../../application/protocols/encryptor/IEncryptor';

export class Encryptor implements IEncryptor {
    public async encrypt(input: EncryptInput): Promise<string> {
        return CryptoJS.AES.encrypt(input.message, input.key).toString();
    }

    public async decrypt(input: DecryptInput): Promise<string> {
        const bytes  = CryptoJS.AES.decrypt(input.cypher_text, input.key);
        return bytes.toString(CryptoJS.enc.Utf8)
    }
}
