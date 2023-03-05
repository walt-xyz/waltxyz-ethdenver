import { ProfileData } from '../../components/Modal/OnboardingModal/OnboardingModal';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ComposeClient } from '@composedb/client';

export type Clients = {
  ceramic: CeramicClient;
  composeClient: ComposeClient;
};

export const updateProfile = async (clients: Clients, data: ProfileData) => {
  const { ceramic, composeClient } = clients;

  if (ceramic.did !== undefined) {
    const update = await composeClient.executeQuery(`
        mutation {
          createuserProfile(input: {
            content: {
                name: "${data.name}"
                email: "${data.email}"
                twitter_handle: "${data.twitter_handle}"
                discord_handle: "${data.discord_handle}"
                telegram_handle: "${data.telegram_handle}"
           
            }
          }) 
          {
            document {
             
              name
              email
              twitter_handle
              discord_handle
              telegram_handle
            }
          }
        }
      `);
    console.log('update', update);
  }
};
