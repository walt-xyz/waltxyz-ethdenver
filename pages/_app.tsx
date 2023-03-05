import '@/styles/loader.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { CeramicWrapper } from '../context';
import { useState, useEffect } from 'react';
import { useCeramicContext } from '../context';
import { authenticateCeramic } from '../utils';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';

type Profile = {
  id?: any;
  name?: string;
  email?: string;
  twitter_handle?: string;
  discord_handle?: string;
  telegram_handle?: string;
};

export default function App({ Component, pageProps }: AppProps) {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [profile, setProfile] = useState<Profile | undefined>();
  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient);
    await getProfile();
  };
  const getProfile = async () => {
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            id
            userProfile {
              id
              email
              name
              twitter_handle
              discord_handle
              telegram_handle
            }
          }
        }
      `);
      // @ts-ignore
      localStorage.setItem('viewer', profile?.data?.viewer?.id);

      // @ts-ignore
      setProfile(profile?.data?.viewer?.userProfile);
    }
  };
  useEffect(() => {
    // if (localStorage.getItem('did')) {
    //   handleLogin();
    //   getProfile();
    // } else {
    //   handleLogin();
    // }
  }, []);

  const { provider, webSocketProvider } = configureChains(
    [mainnet],
    [publicProvider()]
  );

  const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
  });

  return (
    <div>
      <CeramicWrapper>
        <WagmiConfig client={client}>
          <div>
            <Component {...pageProps} ceramic />
          </div>
        </WagmiConfig>
      </CeramicWrapper>
    </div>
  );
}
