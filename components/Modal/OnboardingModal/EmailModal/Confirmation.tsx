import { AtSymbolIcon } from '@heroicons/react/24/outline';
import InputField from "../../../input/InputField";
import Button from '../../../Button';
import HSpacer from "../../../helper/spacer/HSpacer";
import { useState } from 'react';

type Props = {
  onSubmit: (value: string) => void;
  onSkip: () => void;
};

export default function Confirmation({ onSubmit, onSkip }: Props) {
  const [code, setCode] = useState('');

  const error = code.length <= 0;

  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-300 p-2 rounded-full">
        <AtSymbolIcon height={25} className="text-gray-500" />
      </div>
      <div className="h-4"></div>
      <h1 className="text-xl">Confirmation</h1>
      <div className="h-4"></div>
      <p className="text-gray-500 text-center">
        Enter any number, as this is a demo.
      </p>
      <div className="h-10"></div>
      <div className="w-full">
        <InputField
          value={code}
          onChange={(value) => setCode(value)}
          type="number"
          name="confirmationCode"
          label="Confirmation Code"
          placeholder="You can enter any number to continue"
        />
      </div>
      <div className="h-10"></div>
      <div className="flex flex-row">
        <Button onClick={() => onSubmit(code)} disabled={error}>
          Submit
        </Button>
        <Button onClick={onSkip} style="link" color="secondary">
          Skip
        </Button>
      </div>
      <HSpacer size={8} />
    </div>
  );
}
