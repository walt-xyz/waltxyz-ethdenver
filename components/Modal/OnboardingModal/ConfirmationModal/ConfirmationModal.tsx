import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import HSpacer from '../../../helper/spacer/HSpacer';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

type Props = {
  type: 'success' | 'error';
};

export default function ConfirmationModal({ type }: Props) {
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
      <h1 className="text-xl">Congratulations!</h1>
      <HSpacer size={4} />
      <p className="text-gray-500 text-center">
        Your NFT membership has been minted successfully!
      </p>
      <HSpacer size={8} />
      {showConfetti && type === 'success' && <Confetti />}
    </div>
  );
}
