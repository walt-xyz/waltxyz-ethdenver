import { AtSymbolIcon } from '@heroicons/react/24/outline';
import Button from '../../../Button';
import InputField from "../../../input/InputField";
import HSpacer from "../../../helper/spacer/HSpacer";
import { useState } from 'react';

type Props = {
  onSubmit: (email: string) => void;
  onSkip: () => void;
};

export default function Input({ onSubmit, onSkip }: Props) {
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-300 p-2 rounded-full">
        <AtSymbolIcon height={25} className="text-gray-500" />
      </div>
      <div className="h-4"></div>
      <h1 className="text-xl">E-Mail</h1>
      <div className="h-4"></div>
      <p className="text-gray-500 text-center">Share your e-mail address.</p>
      <div className="h-10"></div>
      <div className="w-full">
        <InputField
          value={email}
          onChange={(value) => setEmail(value)}
          type="email"
          name="email"
          label="Email"
          placeholder="dom@walt.xyz"
        />
      </div>
      <div className='h-12' />
      <div>
        <Button onClick={() => onSubmit(email)} disabled={email.length <= 0}>
          Submit
        </Button>
        <Button onClick={onSkip} style="link" color="secondary">
          Skip
        </Button>
      </div>
      <div className='h-6' />
    </div>
  );
}
