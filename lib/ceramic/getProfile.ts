import { Clients } from './updateProfile';

export const getProfile = async (clients: Clients) => {
  const { ceramic, composeClient } = clients;
  if (ceramic.did !== undefined) {
    const profile = await composeClient.executeQuery(`

query  {
  viewer {
    userProfile {
      id
      name
      email
      twitter_handle
      discord_handle
      telegram_handle
    }
    isViewer
  }
}      `);
    console.log('thisprofile', profile);

    // @ts-ignore
    return profile?.data?.viewer?.userProfile;
  }
};
