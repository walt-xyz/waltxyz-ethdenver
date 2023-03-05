import Loader from '../../Loader/Loader';
import WalletConnectLogo from '../../icons/WalletConnectLogo';
import MetaMaskLogo from '../../icons/MetaMaskLogo';
import HSpacer from '../../helper/spacer/HSpacer';
import Button from '../../Button';
import BaseModal from '../BaseModal';
import { ActiveWallet } from './WalletConnectModal';
import { UserIcon } from '@heroicons/react/24/outline';

type OnRetry = {
  MetaMask: () => void;
  WalletConnect: () => void;
};

type ModalProps = {
  show: boolean;
  onClose: () => void;
  error: boolean;
  activeWallet: ActiveWallet;
  onBackButtonPress: () => void;
  onRetry: OnRetry;
  signMessage: (wallet: ActiveWallet) => void;
  loading: boolean;
};

const LOADER_SIZE = 52;
const LOGO_HEIGHT = 42;
const LOGO_WIDTH = 42;
const LOADING_RING_COLOR = '#0573F0';

export default function WalletSignMessageModal({
  show,
  onClose,
  error,
  activeWallet,
  onBackButtonPress,
  onRetry,
  signMessage,
  loading,
}: ModalProps) {
  let text = '';

  switch (activeWallet) {
    case 'MetaMask':
      text = 'Contacting MetaMask';
      break;
    case 'WalletConnect':
      text = 'Contacting WalletConnect';
      break;
  }
  return (
    <BaseModal
      show={show}
      onClose={onClose}
      showBack
      onBackPress={onBackButtonPress}
    >
      {!loading && !error ? (
        <div className="flex flex-col items-center">
          <div className="border border-gray-300 p-2 rounded-full">
            <UserIcon height={25} className="text-gray-500" />
          </div>
          <div className="h-4"></div>
          <h1 className="text-xl">Ownership Verification</h1>
          <div className="h-4"></div>
          <p className="text-gray-500 text-center">
            Verify wallet ownership by signing a message.
          </p>
          <div className="h-10"></div>
          <Button onClick={signMessage.bind(null, activeWallet)}>
            Sign Message
          </Button>
          <HSpacer size={12} />
          <div></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {!error ? (
            <div>
              {activeWallet === 'WalletConnect' && (
                <Loader
                  size={LOADER_SIZE}
                  color={LOADING_RING_COLOR}
                  logo={
                    <WalletConnectLogo
                      height={LOGO_HEIGHT}
                      width={LOGO_WIDTH}
                      type="black"
                    />
                  }
                />
              )}
              {activeWallet === 'MetaMask' && (
                <Loader
                  size={LOADER_SIZE}
                  color={LOADING_RING_COLOR}
                  logo={<MetaMaskLogo height={32} width={32} />}
                />
              )}
            </div>
          ) : (
            <div>
              {activeWallet === 'WalletConnect' && (
                <div className="border border-2 border-solid border-red-500 rounded-full p-0.5">
                  <WalletConnectLogo
                    height={LOGO_HEIGHT}
                    width={LOGO_WIDTH}
                    type="black"
                  />
                </div>
              )}
              {activeWallet === 'MetaMask' && (
                <div className="border border-4 border-solid border-red-500 rounded-full p-0.5">
                  <MetaMaskLogo height={32} width={32} />
                </div>
              )}
            </div>
          )}

          <HSpacer size={4} />
          {!error ? (
            <h1 className="text-base">{text}</h1>
          ) : (
            <h1>Signature failed</h1>
          )}
          <HSpacer size={12} />
          {activeWallet && error && (
            <Button onClick={onRetry[activeWallet]}>Retry</Button>
          )}
        </div>
      )}
    </BaseModal>
  );
}
