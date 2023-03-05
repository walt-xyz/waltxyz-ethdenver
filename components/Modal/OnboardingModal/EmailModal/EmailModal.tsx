import { useStages } from '../../../../lib/useStages';
import Input from './Input';
import Confirmation from './Confirmation';
import { useState } from 'react';

type Props = {
  onSubmit: (email: string) => void;
  onSkip: () => void;
};

export default function EmailModal({ onSubmit, onSkip }: Props) {
  const { next, getStage } = useStages(['input', 'confirmation']);
  const [email, setEmail] = useState<string>('');

  const handleEmailSubmit = (email: string) => {
    setEmail(email);
    next();
  };

  const handleConfirmationSubmit = () => {
    onSubmit(email);
  };

  let body;
  switch (getStage()) {
    case 'input':
      body = <Input onSubmit={handleEmailSubmit} onSkip={onSkip} />;
      break;
    case 'confirmation':
      body = (
        <Confirmation onSubmit={handleConfirmationSubmit} onSkip={onSkip} />
      );
      break;
    default:
      body = <></>;
      break;
  }

  return body;
}
