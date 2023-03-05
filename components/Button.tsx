import { ReactNode } from 'react';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import VSpacer from "./helper/spacer/VSpacer";
import HSpacer from "./helper/spacer/HSpacer";

export enum ButtonSize {
  small,
  medium,
  large,
  xl,
}

type ButtonProps = {
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loadingText?: string;
  style?: 'button' | 'link';
  color?: 'primary' | 'secondary';
};

export default function Button({
  size,
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  loadingText = 'Loading',
  style = 'button',
  color = 'primary',
}: ButtonProps) {
  const buttonSize = size || ButtonSize.medium;
  let baseClasses =
    'inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-full focus:outline-none';

  // Button Primary Style Classes
  const backgroundClassesButtonPrimaryStyle =
    'bg-primary-400 hover:bg-primary-700 disabled:bg-gray-200 shadow-sm';
  const textClassesButtonPrimaryStyle =
    'text-primary-50 disabled:text-gray-400';

  // Button Secondary Style Classes
  const backgroundClassesButtonSecondaryStyle =
    'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200 shadow-sm';
  const textClassesButtonSecondaryStyle =
    'text-gray-500 disabled:text-gray-400';

  // Link Secondary Style Classes
  const textClassesLinkSecondaryStyle =
    'text-gray-500 underline hover:text-primary-400';
  const backgroundClassesLinkSecondaryStyle = 'bg-transparent';

  // Link Primary Style Classes
  const textClassesLinkPrimaryStyle =
    'text-primary-400 underline hover:text-primary-700';
  const backgroundClassesLinkPrimaryStyle = 'bg-transparent';

  // Button Size Classes
  const buttonSizeClasses = {
    [ButtonSize.small]: 'px-3.5 py-2',
    [ButtonSize.medium]: 'px-8 py-2',
    [ButtonSize.large]: 'px-5 py-3',
    [ButtonSize.xl]: 'px-6 py-3',
  };

  let finalClasses = `${baseClasses}`;

  if (style === 'button') {
    if (color === 'primary') {
      finalClasses =
        finalClasses +
        ' ' +
        backgroundClassesButtonPrimaryStyle +
        ' ' +
        textClassesButtonPrimaryStyle;
    } else if (color === 'secondary') {
      finalClasses =
        finalClasses +
        ' ' +
        backgroundClassesButtonSecondaryStyle +
        ' ' +
        textClassesButtonSecondaryStyle;
    }
  }

  if (style === 'link') {
    if (color === 'primary') {
      finalClasses =
        finalClasses +
        ' ' +
        backgroundClassesLinkPrimaryStyle +
        ' ' +
        textClassesLinkPrimaryStyle;
    } else if (color === 'secondary') {
      finalClasses =
        finalClasses +
        ' ' +
        backgroundClassesLinkSecondaryStyle +
        ' ' +
        textClassesLinkSecondaryStyle;
    }
  }

  finalClasses = finalClasses + ' ' + buttonSizeClasses[buttonSize];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={finalClasses}
    >
      {loading ? (
        <div className="flex flex-row gap-2 items-center">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p>{loadingText}</p>
        </div>
      ) : (
        <div> {children} </div>
      )}
    </button>
  );
}
