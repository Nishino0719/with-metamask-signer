import React, { useState } from 'react';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from 'ethers/lib/utils';
import {
  getDecryptionMessage,
  getEncryptionPublicKey,
  pkEncrypt
} from '../lib/utils';
type Props = {};

export const DecentralizedApplication: React.FC<Props> = (props) => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const balance = useEtherBalance(account);
  const [pKey, setPKey] = useState<any>();
  const [enc, setEnc] = useState<any>();

  const _setPublicKey = async () => {
    const key = await getEncryptionPublicKey(account);
    setPKey(key);
    return key;
  };

  const _enc = () => {
    const encryption = pkEncrypt(pKey, 'hello metamask');
    console.log(encryption);
    setEnc(encryption);
  };
  const _dec = async () => {
    const message = await getDecryptionMessage(enc, account);
    console.log(message);
  };

  return (
    <div className="m-10">
      {!account && (
        <button
          onClick={() => activateBrowserWallet()}
          className="p-5 border rounded-md"
        >
          Connect
        </button>
      )}
      {account && (
        <div className="">
          <button
            onClick={() => deactivate()}
            className="p-5 border rounded-md"
          >
            Logout
          </button>
          {balance && (
            <div className="">
              <p>{account}</p>
              <p>{formatEther(balance)}</p>
              <p>{pKey?.toString()}</p>
              <div className="grid grid-flow-col space-x-10 ">
                <button
                  onClick={_setPublicKey}
                  className="p-3 border rounded shadow border-cyan-400"
                >
                  getEncryptionPublicKey
                </button>
                <button
                  onClick={_enc}
                  className="p-3 border rounded shadow border-cyan-400"
                >
                  pkEncrypt
                </button>
                <button
                  onClick={_dec}
                  className="p-3 border rounded shadow border-cyan-400"
                >
                  Decrypt
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
