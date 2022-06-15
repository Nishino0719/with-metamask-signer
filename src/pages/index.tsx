import { Config, DAppProvider, Mainnet, Ropsten } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import Head from 'next/head';
import { DecentralizedApplication } from '../components/DecentralizedApplication';

const config: Config = {
  readOnlyChainId: Ropsten.chainId,
  readOnlyUrls: {
    [Ropsten.chainId]: getDefaultProvider('ropsten')
  }
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Application</title>
        <meta name="description" content="My Application description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DAppProvider config={config}>
        <DecentralizedApplication />
      </DAppProvider>
    </div>
  );
}
