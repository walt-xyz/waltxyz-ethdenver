import { UserIcon } from '@heroicons/react/24/outline';
import BaseInputModal from "../../BaseInputModal";

type Props = {
  onSubmit: (email: string) => void;
  onSkip: () => void;
};

export default function TwitterModal({ onSubmit, onSkip }: Props) {
  return (
    <BaseInputModal
      title="Twitter"
      subtitle="Share your Twitter handle"
      type="text"
      name="twitter"
      label="Twitter"
      placeholder=""
      onSkip={onSkip}
      onSubmit={onSubmit}
      icon={UserIcon}
    />
  );
}
