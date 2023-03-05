import { useState } from 'react';
import { useStages } from '../../../../lib/useStages';
import Confirmation from './Confirmation';
import Base from './Base';
import { updateProfile } from '../../../../lib/ceramic/updateProfile';
import { authenticateCeramic } from '../../../../utils';
import { useCeramicContext } from '../../../../context';
import { ProfileData } from '../OnboardingModal';
import {generateVC} from "../../../../lib/vc/generateVC";

export type Check = {
  name: string;
  status: 'passed' | 'failed';
};

type Props = {
  onSkip: () => void;
  checks: Check[];
  profileData: ProfileData;
  onContinue: () => void;
};

export default function CeramicStoreModal({
  onSkip,
  checks,
  profileData,
  onContinue,
}: Props) {
  const { next, getStage } = useStages(['input', 'confirmation']);
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [storingOnCeramic, setStoringOnCeramic] = useState<boolean>(false);

  const handelCeramicAuth = async () => {
    await authenticateCeramic(ceramic, composeClient);
  };

  const handleStoreOnCeramic = async () => {
    setStoringOnCeramic(true);
    await handelCeramicAuth();
    const did = ceramic.did ? ceramic.did.id : '';
    const vc = await generateVC(did, profileData);
    const data = {...profileData, vc };
    await updateProfile(clients, data);
    next();
    setStoringOnCeramic(false);
  };

  let body;
  switch (getStage()) {
    case 'input':
      body = (
        <Base
          onStoreOnCeramic={handleStoreOnCeramic}
          onSkip={onSkip}
          checks={checks}
          loading={storingOnCeramic}
          loadingText={'Storing'}
        />
      );
      break;
    case 'confirmation':
      body = <Confirmation type="success" onContinue={onContinue} />;
      break;
    default:
      body = <></>;
      break;
  }

  return body;
}
