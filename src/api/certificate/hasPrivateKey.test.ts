import 'cadesplugin';
import { hasPrivateKey } from './hasPrivateKey';

const executionSteps = [Symbol('step 0')];

const executionFlow = {
  [executionSteps[0]]: true,
};

window.cadesplugin.__defineExecutionFlow(executionFlow);

describe('hasPrivateKey', () => {
  test('returns information about existance of private key', async () => {
    const hasPK = await hasPrivateKey.call({
      _cadesCertificate: {
        HasPrivateKey: jest.fn(() => executionSteps[0]),
      },
    });

    expect(hasPK).toStrictEqual(true);
  });
});
