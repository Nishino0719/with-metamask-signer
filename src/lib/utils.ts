import { encrypt } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { ethers } from 'ethers';
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

// export const getPersonalSign = async (
//   account: string,
//   msg: string,
//   password?: string
// ) => {
//   try {
//     // @ts-ignore
//     const sign = await ethereum.request({
//       method: 'personal_sign',
//       params: [
//         `0x${Buffer.from(msg, 'utf8').toString('hex')}`,
//         account,
//         password ?? ''
//       ]
//     });

//     return Promise.resolve(sign);
//   } catch (err) {
//     return Promise.resolve(false);
//   }
// };

export const getPersonalSign = async (
  signer: ethers.providers.JsonRpcSigner,
  chainId: any,
  version: string
) => {
  const domain = {
    name: 'Ether Mail',
    version,
    chainId,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' }
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' }
    ]
  };

  // The data to sign
  const value = {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
    },
    contents: 'いい感じにこれ使って署名してください'
  };
  const signature = await signer._signTypedData(domain, types, value);
  return signature;
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
