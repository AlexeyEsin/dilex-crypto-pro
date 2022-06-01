import { _afterPluginsLoaded } from '../../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, _generateCadesFn } from '../../helpers/_generateCadesFn';
import { Certificate } from './certificate';

/**
 * Проверяет имеет ли сертификат приватный ключ
 *
 * @returns имеет ли приватный ключ
 */
export const hasPrivateKey = _afterPluginsLoaded(function (): string {
  const cadesCertificate = (this as Certificate)._cadesCertificate;

  return eval(
    _generateCadesFn(function hasPrivateKey(): boolean {
      let hasPK: boolean;

      try {
        hasPK = __cadesAsyncToken__ + cadesCertificate.HasPrivateKey();
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при проверке наличия приватного ключа');
      }

      return hasPK;
    }),
  );
});
