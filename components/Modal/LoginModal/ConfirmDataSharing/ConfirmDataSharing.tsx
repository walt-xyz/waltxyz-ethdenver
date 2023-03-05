import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/20/solid';
import HSpacer from '../../../helper/spacer/HSpacer';
import Button from '../../../Button';
import { Check } from '../../OnboardingModal/CeramicStoreModal/CeramicStoreModal';

type Props = {
  checks: Check[];
  onContinue: () => void;
};

export default function ConfirmDataSharing({ checks, onContinue }: Props) {
  checks.sort((a, b) => {
    if (a.status === 'passed' && b.status === 'failed') {
      return -1;
    }
    if (a.status === 'failed' && b.status === 'passed') {
      return 1;
    }
    return 0;
  });

  return (
    <div className="flex flex-col items-center">
      <div className="h-4"></div>
      <h1 className="text-xl font-bold">Share data</h1>
      <p className="mt-3">dApp wants to read the following data</p>
      <ul className="mt-8 flex flex-col items-left">
        {checks.map((check) => (
          <li
            key={check.name}
            className="flex mt-2 flex-row gap-3 justify-items-center items-center"
          >
            {check.status === 'passed' ? (
              <CheckCircleIcon className="h-5 text-green-500" />
            ) : (
              <ExclamationTriangleIcon className="h-5 text-yellow-500" />
            )}
            <p>{check.name}</p>
          </li>
        ))}
      </ul>
      <HSpacer size={12} />
      <div>
        <Button onClick={onContinue}>Share</Button>
        <Button style="link" color="secondary" onClick={onContinue}>
          Skip
        </Button>
      </div>
      <HSpacer size={8} />
    </div>
  );
}
