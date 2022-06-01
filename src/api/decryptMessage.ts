import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

/**
 *
 * @param encryptedMessage - сообщение для расшифрования
 *
 * @returns расшифрованное собщение
 */
export const decryptMessage = _afterPluginsLoaded(
  async (encryptedMessage: string): Promise<string> => {
    const { cadesplugin } = window;

    return eval(
      _generateCadesFn(function decryptMessage(): string {
        let decryptedMessage;
        let cadesRecepients;

        const cadesEnvelopedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPEnvelopedData');
        try {
          void (
            __cadesAsyncToken__ +
            cadesEnvelopedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY)
          );
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации расшифрования');
        }

        try {
          void (__cadesAsyncToken__ + cadesEnvelopedData.Decrypt(encryptedMessage));
          decryptedMessage = cadesEnvelopedData.Content;
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при рашифровании данных');
        }

        return decryptedMessage;
      }),
    );
  },
);
