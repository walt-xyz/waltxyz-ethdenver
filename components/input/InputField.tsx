import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

type Props = {
  value: string;
  onChange: (value: string) => void;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  error?: boolean;
  errorText?: string;
};

export default function InputField({
  value,
  onChange,
  type,
  label,
  placeholder,
  name,
  error = false,
  errorText,
}: Props) {
  return (
    <div>
      <label htmlFor="email" className="sr-only">
        {label}
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        type={type}
        name={name}
        id={name}
        className={`${
          !error
            ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            : 'border-red-400'
        } block w-full rounded-md shadow-sm  sm:text-sm`}
        placeholder={placeholder}
        value={value}
        aria-invalid={error}
        aria-describedby="email-error"
      />
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorText}
        </p>
      )}
    </div>
  );
}
