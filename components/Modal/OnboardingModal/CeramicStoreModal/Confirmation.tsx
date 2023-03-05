import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import HSpacer from '../../../helper/spacer/HSpacer';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import Button from '../../../Button';

type Props = {
  type: 'success' | 'error';
  onContinue: () => void;
};

export default function Confirmation({ type, onContinue }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {type === 'success' ? (
        <div className="border border-green-200 p-2 rounded-full bg-green-100">
          <CheckIcon height={25} className="text-green-700" />
        </div>
      ) : (
        <div className="border border-red-200 p-2 rounded-full bg-red-100">
          <XMarkIcon height={25} className="text-red-700" />
        </div>
      )}
      <HSpacer size={4} />
      <h1 className="text-xl">Data saved successfully</h1>
      <HSpacer size={8} />
      <HSpacer size={10} />
      <Button onClick={onContinue}>Continue</Button>
      <HSpacer size={4} />
    </div>
  );
}
