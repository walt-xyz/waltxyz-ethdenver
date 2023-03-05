import { MoralisNextApi } from '@moralisweb3/next';

if (process.env.MORALIS_API_KEY === undefined) {
  throw new Error('MORALIS_API_KEY is undefined');
}

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY,
  authentication: {
    domain: 'walt.xyz',
    uri: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL,
    timeout: 120,
  },
});
