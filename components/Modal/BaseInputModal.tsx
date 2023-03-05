import { AtSymbolIcon } from '@heroicons/react/24/outline';
import InputField from "../input/InputField";
import HSpacer from "../helper/spacer/HSpacer";
import Button from "../Button";
import { useState } from 'react';

type Props = {
  title: string;
  subtitle: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  icon: any;
  onSubmit: (value: string) => void;
  onSkip: () => void;
};

export default function BaseInputModal({
  title,
  subtitle,
  type,
  name,
  label,
  placeholder,
  defaultValue,
  onSubmit,
  onSkip,
  icon: Icon,
}: Props) {
  const [value, setValue] = useState(defaultValue || '');
  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-300 p-2 rounded-full">
        <Icon height={25} className="text-gray-500" />
      </div>
      <div className="h-4"></div>
      <h1 className="text-xl">{title}</h1>
      <div className="h-4"></div>
      <p className="text-gray-500 text-center">{subtitle}</p>
      <div className="h-10"></div>
      <div className="w-full">
        <InputField
          value={value}
          onChange={(value) => setValue(value)}
          type={type}
          name={name}
          label={label}
          placeholder={placeholder || ''}
        />
      </div>
      <HSpacer size={12} />
      <div>
        <Button onClick={() => onSubmit(value)} disabled={value.length <= 0}>
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
