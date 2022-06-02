import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { encryptEnvelopedData } from './encryptEnvelopedData';
import { _getCadesCert } from '../helpers/_getCadesCert';

const [rawCertificateMock] = rawCertificates;
const [parsedCertificateMock] = parsedCertificates;

jest.mock('../helpers/_getCadesCert', () => ({ _getCadesCert: jest.fn(() => rawCertificateMock) }));

beforeEach(() => {
  (_getCadesCert as jest.Mock).mockClear();
});

const executionSteps = [Symbol('step 0'), Symbol('step 1'), Symbol('step 2')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_ContentEncoding: jest.fn(),
    propset_Content: jest.fn(),
    Encrypt: jest.fn(() => executionSteps[2]),
    Recipients: executionSteps[1],
  },
  [executionSteps[1]]: {
    Add: jest.fn(),
  },
  [executionSteps[2]]: 'encrypedEnveleopedData',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation(() => {
  return executionSteps[0];
});

describe('encryptEnvelopedData', () => {
  test('uses Buffer to encrypt the message', async () => {
    const originalBufferFrom = global.Buffer.from;

    (global.Buffer.from as jest.Mock) = jest.fn(() => ({
      toString: jest.fn(),
    }));

    await encryptEnvelopedData(parsedCertificateMock.thumbprint, 'message');

    expect(global.Buffer.from).toHaveBeenCalledTimes(1);

    global.Buffer.from = originalBufferFrom;
  });

  test('uses encryptEnvelopedData certificate', async () => {
    await encryptEnvelopedData(parsedCertificateMock.thumbprint, 'message');

    expect(_getCadesCert).toHaveBeenCalledWith(parsedCertificateMock.thumbprint);
  });

  test('returns encrypted enveloped data', async () => {
    const encrypedEnveleopedData = await encryptEnvelopedData(parsedCertificateMock.thumbprint, 'unencryptedData');

    expect(encrypedEnveleopedData).toEqual('encrypedEnveleopedData');
  });
});
