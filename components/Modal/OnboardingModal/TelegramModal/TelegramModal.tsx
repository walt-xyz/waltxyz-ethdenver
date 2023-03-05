import { UserIcon } from '@heroicons/react/24/outline';
import BaseInputModal from '../../BaseInputModal';

type Props = {
  onSubmit: (email: string) => void;
  onSkip: () => void;
};

export default function TelegramModal({ onSubmit, onSkip }: Props) {
  return (
    <BaseInputModal
      title="Telegram"
      subtitle="Share your Telegram handle"
      type="text"
      name="telegram"
      label="Telegram"
      placeholder=""
      onSkip={onSkip}
      onSubmit={onSubmit}
      icon={UserIcon}
    />
  );
}
