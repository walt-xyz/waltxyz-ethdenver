import BaseModal from '../BaseModal';
import Button from '../../Button';
import WalletConnectLogo from '../../icons/WalletConnectLogo';
import HSpacer from '../../helper/spacer/HSpacer';
import Loader from '../../Loader/Loader';
import { ActiveWallet } from './WalletConnectModal';
import MetaMaskLogo from '../../icons/MetaMaskLogo';

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
};

const LOADER_SIZE = 52;
const LOGO_HEIGHT = 42;
const LOGO_WIDTH = 42;
const LOADING_RING_COLOR = '#0573F0';

export default function WalletConnectConnectingModal({
  show,
  onClose,
  error,
  activeWallet,
  onBackButtonPress,
  onRetry,
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
          <h1>Connection failed</h1>
        )}
        <HSpacer size={12} />
        {activeWallet && error && (
          <Button onClick={onRetry[activeWallet]}>Retry</Button>
        )}
      </div>
    </BaseModal>
  );
}
