import profile from "../../pages/profile";
import axios from "axios";
import {ProfileData} from "../../components/Modal/OnboardingModal/OnboardingModal";

export const generateVC = async (did: string, profileData: ProfileData) => {
    return await axios
      .post(
        "https://signatory.ssikit.walt.id/v1/credentials/issue",
        {
          templateId: "VerifiableId",
          config: {
            issuerDid:
              "did:key:z6MkuUjqQWMdisCbvmbPZLnJ3XQ8tLLauxMSaX5myq5as2oL",
            subjectDid: did,
            proofType: "JWT",
          },
          credentialData: {
            credentialSubject: {
              twitterHandle: `${profileData.twitter_handle}`,
              discordHandle: `${profileData.discord_handle}`,
              telegramHandle: `${profileData.telegram_handle}`,
              email: `${profileData.email}`,
              name: `${profileData.name}`,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const vc = res.data;
          return vc;
        }
      });
  };
