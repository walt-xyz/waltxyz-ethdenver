import Button from '../../../Button';
import { UserIcon } from '@heroicons/react/24/outline';

type Props = {
  onSubmit: () => void;
  onSkip: () => void;
  loading: boolean;
};

export default function AskForData({ onSubmit, onSkip, loading }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-300 p-2 rounded-full">
        <UserIcon height={25} className="text-gray-500" />
      </div>
      <div className="h-4"></div>
      <h1 className="text-xl">Hey, tamino.eth</h1>
      <div className="h-4"></div>
      <p className="text-gray-500 text-center">
        Share your contacts to get some swag.
      </p>
      <div className="h-12" />
      <div>
        <Button onClick={onSubmit} loading={loading} loadingText="Sharing">
          Share via Ceramic
        </Button>
        <Button onClick={onSkip} style="link" color="secondary">
          Use form
        </Button>
      </div>
      <div className="h-6" />
    </div>
  );
}
