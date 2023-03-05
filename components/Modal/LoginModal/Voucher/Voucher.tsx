import Button from '../../../Button';
import { UserIcon } from '@heroicons/react/24/outline';

type Props = {
  onSubmit: () => void;
  onSkip: () => void;
};

export default function Voucher({ onSubmit, onSkip }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-300 p-2 rounded-full">
        <UserIcon height={25} className="text-gray-500" />
      </div>
      <div className="h-4"></div>
      <h1 className="text-xl">Before you go</h1>
      <div className="h-4"></div>
      <p className="text-gray-500 text-center">
        We see you participated in the Ceramic Hackathon. We love hackers, so
        you can claim a free (slightly burned) burger at EthDenver.
      </p>
      <div className="h-12" />
      <div>
        <Button onClick={onSubmit} loadingText="Sharing">
          Claim Voucher
        </Button>
        <Button onClick={onSkip} style="link" color="secondary">
          No, thanks
        </Button>
      </div>
      <div className="h-6" />
    </div>
  );
}
