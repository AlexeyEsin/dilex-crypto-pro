import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';

/**
 * Шифрует сообщение в base64 а потом с помощью сертификата
 *
 * @param thumbprint - отпечаток сертификата для которого производиться шифрование
 * @param unencryptedMessage - сообщение для шифрования
 *
 * @returns зашифрованное сообщение
 */
export const encryptMessage = _afterPluginsLoaded(
    async (thumbprint: string, unencryptedMessage: string): Promise<string> => {
        const { cadesplugin } = window;
        const cadesCertificate = await _getCadesCert(thumbprint);

        return eval(
            _generateCadesFn(function encryptMessage(): string {
                let encryptedMessage;
                let messageBase64;
                let cadesRecepients;

                const cadesEnvelopedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
                try {

                    messageBase64 = Buffer.from(unencryptedMessage, 'binary').toString('base64');

                } catch (error) {
                    console.error(error);

                    throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при кодировании строки в base64');
                }

                try {
                    void (
                        __cadesAsyncToken__ +
                        cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY)
                    );
                    void (__cadesAsyncToken__ + cadesEnvelopedData.propset_Content(messageBase64));
                    cadesRecepients = __cadesAsyncToken__ + cadesEnvelopedData.Recipients;
                    cadesRecepients.Add(cadesCertificate);

                } catch (error) {
                    console.error(error);

                    throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации шифрования');
                }

                try {
                    encryptedMessage = __cadesAsyncToken__ + cadesEnvelopedData.Encrypt();
                } catch (error) {
                    console.error(error);

                    throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при шифровании данных');
                }

                return encryptedMessage;
            }),
        );
    },
);
