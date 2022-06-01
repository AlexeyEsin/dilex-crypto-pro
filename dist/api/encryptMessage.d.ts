/**
 * Шифрует сообщение в base64 а потом с помощью сертификата
 *
 * @param thumbprint - отпечаток сертификата для которого производиться шифрование
 * @param unencryptedMessage - сообщение для шифрования
 *
 * @returns зашифрованное сообщение
 */
export declare const encryptMessage: (thumbprint: string, unencryptedMessage: string) => Promise<string>;
