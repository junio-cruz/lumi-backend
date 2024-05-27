export type EncryptInput = {
    message: string;
    key: string;
}

export type DecryptInput = {
    key: string;
    cypher_text: string;
}

export interface IEncryptor {
    encrypt(input: EncryptInput): Promise<string>;
    decrypt(input: DecryptInput): Promise<string>;
}
