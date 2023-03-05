import { UserIcon } from '@heroicons/react/24/outline';
import BaseInputModal from "../../BaseInputModal";

type Props = {
  onSubmit: (email: string) => void;
  onSkip: () => void;
};

export default function NameModal({ onSubmit, onSkip }: Props) {
  return (
    <BaseInputModal
      title="What should we call you"
      subtitle="Test"
      type="text"
      name="name"
      label="Name"
      placeholder="dberon.eth"
      onSkip={onSkip}
      onSubmit={onSubmit}
      icon={UserIcon}
    />
  );
}
