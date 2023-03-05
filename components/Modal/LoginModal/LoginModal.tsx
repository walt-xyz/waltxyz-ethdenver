import BaseModal from '../BaseModal';
import { useStages } from '../../../lib/useStages';
import { useReducer, useState } from 'react';
import AskForData from './AskForData/AskForData';
import { Check } from '../OnboardingModal/CeramicStoreModal/CeramicStoreModal';
import ConfirmDataSharing from './ConfirmDataSharing/ConfirmDataSharing';
import { getProfile } from '../../../lib/ceramic/getProfile';
import { useCeramicContext } from '../../../context';
import { authenticateCeramic } from '../../../utils';
import Voucher from './Voucher/Voucher';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  email?: string;
  showCloseButton?: boolean;
};

export type ProfileData = {
  email?: string;
  name?: string;
  twitter_handle?: string;
  discord_handle?: string;
  telegram_handle?: string;
};

const stateReducer = (state: ProfileData, action: ProfileData) => {
  return { ...state, ...action };
};

export default function LoginModal({
  show,
  onClose,
  onSubmit,
  email,
  showCloseButton = true,
}: ModalProps) {
  const { getStage, next, previous, isInitial, isLast, reset } = useStages([
    'AskForData',
    'ConfirmDataSharing',
    'Voucher',
    'Confirmation',
  ]);

  const [state, dispatch] = useReducer(stateReducer, {}, () => ({
    name: '',
    email: '',
    twitter_handle: '',
    discord_handle: '',
    telegram_handle: '',
  }));
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [loadingProfile, setLoadingProfile] = useState(false);

  const handelCeramicAuth = async () => {
    await authenticateCeramic(ceramic, composeClient);
  };

  let checks: Check[] = [];
  Object.entries(state).forEach(([key, value]) => {
    // format key to be human readable
    let updatedKey = key.replace('_', ' ');
    updatedKey = updatedKey.charAt(0).toUpperCase() + updatedKey.slice(1);
    if (value !== '') {
      const item = {
        name: `${updatedKey}: ${value}`,
        status: key === 'email' ? 'passed' : 'failed',
      };
      checks.push(item as Check);
    }
  });

  const fetchDataFromCeramic = async () => {
    setLoadingProfile(true);
    await handelCeramicAuth();
    try {
      const profile = await getProfile(clients);
      delete profile.id;
      dispatch(profile);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProfile(false);
    }
    next();
  };

  const handleVoucherSubmit = async () => {
    next();
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        reset();
      }, 1000);
    }, 4000);
  };

  let body;
  switch (getStage()) {
    case 'AskForData':
      body = (
        <AskForData
          loading={loadingProfile}
          onSubmit={fetchDataFromCeramic}
          onSkip={next}
        />
      );
      break;
    case 'ConfirmDataSharing':
      body = <ConfirmDataSharing onContinue={next} checks={checks} />;
      break;
    case 'Voucher':
      body = <Voucher onSubmit={handleVoucherSubmit} onSkip={next} />;
      break;
    case 'Confirmation':
      body = <ConfirmationModal type={'success'} />;
      break;
    default:
      body = <div></div>;
  }

  return (
    <BaseModal
      showBack={!isInitial && !isLast}
      show={show}
      onClose={onClose}
      securedByWalt
      onBackPress={previous}
      showClose={showCloseButton}
    >
      {body}
    </BaseModal>
  );
}
