import BaseModal from '../BaseModal';
import { useStages } from '../../../lib/useStages';
import EmailModal from './EmailModal/EmailModal';
import { useReducer, useState } from 'react';
import NameModal from './NameModal/NameModal';
import TwitterModal from './TwitterModal/TwitterModal';
import DiscordModal from './DiscordModal/DiscordModal';
import TelegramModal from './TelegramModal/TelegramModal';
import CeramicStoreModal, {
  Check,
} from './CeramicStoreModal/CeramicStoreModal';
import MintNFTModal from './MintNFTModal/MintNFTModal';
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

export default function OnboardingModal({
  show,
  onClose,
  onSubmit,
  email,
  showCloseButton = true,
}: ModalProps) {
  const { getStage, next, previous, isInitial, isLast, reset } = useStages([
    'email',
    'name',
    'twitter',
    'discord',
    'telegram',
    'ceramic',
    'nft',
    'success',
  ]);

  const [state, dispatch] = useReducer(stateReducer, {}, () => ({
    name: '',
    email: '',
    twitter_handle: '',
    discord_handle: '',
    telegram_handle: '',
  }));

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

  const handleEmailSubmit = (email: string) => {
    dispatch({ email });
    next();
  };

  const handleNameSubmit = (name: string) => {
    dispatch({ name });
    next();
  };

  const handleTwitterSubmit = (twitter_handle: string) => {
    dispatch({ twitter_handle });
    next();
  };

  const handleDiscordSubmit = (discord_handle: string) => {
    dispatch({ discord_handle });
    next();
  };

  const handleTelegramSubmit = (telegram_handle: string) => {
    dispatch({ telegram_handle });
    next();
  };

  const handleMintFinished = () => {
    next();
    setTimeout(() => {
      window.localStorage.removeItem('did');
      onClose();
      setTimeout(() => {
        reset();
      }, 1000);
    }, 4000);
  };

  let body;
  switch (getStage()) {
    case 'email':
      body = <EmailModal onSubmit={handleEmailSubmit} onSkip={next} />;
      break;
    case 'name':
      body = <NameModal onSubmit={handleNameSubmit} onSkip={next} />;
      break;
    case 'twitter':
      body = <TwitterModal onSubmit={handleTwitterSubmit} onSkip={next} />;
      break;
    case 'discord':
      body = <DiscordModal onSubmit={handleDiscordSubmit} onSkip={next} />;
      break;
    case 'telegram':
      body = <TelegramModal onSubmit={handleTelegramSubmit} onSkip={next} />;
      break;
    case 'ceramic':
      body = (
        <CeramicStoreModal
          onSkip={next}
          checks={checks}
          profileData={state}
          onContinue={next}
        />
      );
      break;
    case 'nft':
      body = (
        <MintNFTModal
          onMintFinished={handleMintFinished}
          onSkip={next}
          address={'h'}
          isOwner={false}
        />
      );
      break;
    case 'success':
      body = <ConfirmationModal type={'success'} />;
      break;
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
