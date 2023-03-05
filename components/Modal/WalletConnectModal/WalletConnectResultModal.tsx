import BaseModal from '../BaseModal';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import HSpacer from '../../helper/spacer/HSpacer';
import Button from '../../Button';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  description?: string;
  type: 'success' | 'error';
  onJoinDiscord?: () => void;
  title?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonOnClick?: () => void;
};

export default function WalletConnectResultModal({
  show,
  onClose,
  description,
  type = 'success',
  showButton,
  buttonOnClick,
  buttonText,
  onJoinDiscord,
  title = type === 'success' ? 'Success' : 'Error',
}: ModalProps) {
  return (
    <BaseModal show={show} onClose={onClose}>
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
        <h1 className="text-xl">Demo completed</h1>
        <HSpacer size={4} />
        <p className="text-gray-500 text-center">We hope you enjoyed it. 😎</p>
        <HSpacer size={10} />
        <Button onClick={onJoinDiscord}>Join Discord</Button>
        <HSpacer size={10} />
        {showButton && <Button onClick={buttonOnClick}>{buttonText}</Button>}
      </div>
    </BaseModal>
  );
}
