import { encrypt } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
export const ETHVersion = 'x25519-xsalsa20-poly1305';

export const pkEncrypt = (pk: string, data: string) => {
  const encryptedMessage = bufferToHex(
    Buffer.from(
      JSON.stringify(
        encrypt({
          publicKey: pk,
          data,
          version: ETHVersion
        })
      ),
      'utf8'
    )
  );
  return encryptedMessage;
};

export const getDecryptionMessage = async (
  encryptedMessage: string,
  account: string
) => {
  const decrypt = await window.ethereum.request({
    method: 'eth_decrypt',
    params: [encryptedMessage, account]
  });
  return decrypt;
};

export const getEncryptionPublicKey = async (account: string) => {
  const keyB64 = await window.ethereum.request({
    method: 'eth_getEncryptionPublicKey',
    params: [account]
  });

  return keyB64;
};

export const getPersonalSign = async (
  account: string,
  msg: string,
  password?: string
) => {
  try {
    // @ts-ignore
    const sign = await ethereum.request({
      method: 'personal_sign',
      params: [
        `0x${Buffer.from(msg, 'utf8').toString('hex')}`,
        account,
        password ?? ''
      ]
    });

    return Promise.resolve(sign);
  } catch (err) {
    return Promise.resolve(false);
  }
};

export const pkPack = (data: any) => {
  const { addr, date, version, public_key } = data;
  let parts = [
    'Addr: ' + addr,
    'Date: ' + date,
    'Version: ' + version,
    'Public-Key: ' + public_key
  ];
  return parts.join('\n');
};
