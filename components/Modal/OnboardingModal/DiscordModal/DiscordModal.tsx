import { UserIcon } from '@heroicons/react/24/outline';
import BaseInputModal from '../../BaseInputModal';

type Props = {
  onSubmit: (email: string) => void;
  onSkip: () => void;
};

export default function DiscordModal({ onSubmit, onSkip }: Props) {
  return (
    <BaseInputModal
      title="Discord"
      subtitle="Share your Discord handle"
      type="text"
      name="discord"
      label="Discord"
      placeholder=""
      onSkip={onSkip}
      onSubmit={onSubmit}
      icon={UserIcon}
    />
  );
}
