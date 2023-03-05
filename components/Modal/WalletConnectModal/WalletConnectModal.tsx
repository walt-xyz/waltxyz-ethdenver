import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import {
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect,
  useNetwork,
} from 'wagmi';
import { useRouter } from 'next/router';
import BaseModal from '../BaseModal';
import WalletConnectLogo from '../../icons/WalletConnectLogo';
import MetaMaskLogo from '../../icons/MetaMaskLogo';
import HSpacer from '../../helper/spacer/HSpacer';
import { useEffect, useState } from 'react';
import WalletConnectConnectingModal from './WalletConnectConectingModal';
import WalletConnectResultModal from './WalletConnectResultModal';
import { isMobile } from 'react-device-detect';
import WalletSignMessageModal from './WalletSignMessageModal';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { message } from 'protons-runtime';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  onSuccess: (account: string) => void;
};

type Stage = 'Select' | 'Connect' | 'SignMessage' | 'Result';

export type ActiveWallet = 'MetaMask' | 'WalletConnect' | null;
export default function WalletConnectModal({
  show,
  onClose,
  onSuccess,
}: ModalProps) {
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);
  const [showSignModal, setShowSignModal] = useState<boolean>(false);
  const [showResultSuccessModal, setShowResultSuccessModal] =
    useState<boolean>(false);
  const [showResultErrorModal, setShowResultErrorModal] =
    useState<boolean>(false);
  const [activeWallet, setActiveWallet] = useState<ActiveWallet>(null);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [resultError, setResultError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('Select');
  const [signInProgress, setSignInProgress] = useState<boolean>(false);

  const { connectAsync } = useConnect();
  const { chain } = useNetwork();
  const { disconnectAsync } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  const generalReset = () => {
    setActiveWallet(null);
    setResultError(null);
    setConnectError(null);
    setShowConnectModal(false);
    setShowResultErrorModal(false);
    setShowResultSuccessModal(false);
    setStage('Select');
  };

  const handleClose = () => {
    generalReset();
    onClose();
  };
  const resetError = () => setConnectError(null);

  const handleWalletConnect = async () => {
    resetError();
    setActiveWallet('WalletConnect');
    setStage('Connect');
    setShowConnectModal(true);
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const { account, chain } = await connectAsync({
        connector: new WalletConnectConnector({
          options: {
            qrcode: true,
          },
        }),
      });

      if (!isMobile) {
        await handleSignMessageDesktop('WalletConnect', account);
        return;
      }

      setStage('SignMessage');
      setShowSignModal(true);
      setShowConnectModal(false);
    } catch (e: any) {
      setConnectError(e.message);
      console.error(e.message);
    }
  };

  const handleMetaMaskConnect = async () => {
    resetError();
    setActiveWallet('MetaMask');
    setStage('Connect');
    setShowConnectModal(true);
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
      });
      if (!isMobile) {
        await handleSignMessageDesktop('MetaMask', account);
        return;
      }
      setStage('SignMessage');
      setShowSignModal(true);
      setShowConnectModal(false);
    } catch (e: any) {
      setConnectError(e.message);
      console.error(e.message);
    }
  };

  const handleSignMessageMobile = async (wallet: ActiveWallet) => {
    setSignInProgress(true);
    resetError();
    setActiveWallet(wallet);
    try {
      // @ts-ignore
      const { message } = await requestChallengeAsync({
        address: address as string,
        chainId: chain?.id as number,
      });

      const signature = await signMessageAsync({ message });

      setStage('Result');
      generalReset();
      onSuccess(address as string);
    } catch (e: any) {
      setConnectError(e.message);
      console.error(e.message);
    } finally {
      setSignInProgress(false);
    }
  };

  const handleSignMessageDesktop = async (
    wallet: ActiveWallet,
    account: string
  ) => {
    setSignInProgress(true);
    resetError();
    setActiveWallet(wallet);
    try {
      // @ts-ignore
      const { message } = await requestChallengeAsync({
        address: address as string,
        chainId: chain?.id as number,
      });
      const signature = await signMessageAsync({ message });

      setStage('Result');
      generalReset();
      onSuccess(address as string);
    } catch (e: any) {
      setConnectError(e.message);
      console.error(e.message);
    } finally {
      setSignInProgress(false);
    }
  };

  useEffect(() => {
    if (isMobile && show && isConnected) {
      setStage('SignMessage');
      setShowSignModal(true);
    }
  }, [isConnected]);

  if (stage === 'Connect') {
    return (
      <WalletConnectConnectingModal
        show={showConnectModal}
        onClose={handleClose}
        error={!!connectError}
        activeWallet={activeWallet}
        onBackButtonPress={generalReset}
        onRetry={{
          MetaMask: handleMetaMaskConnect,
          WalletConnect: handleWalletConnect,
        }}
      />
    );
  }

  if (stage === 'SignMessage') {
    return (
      <WalletSignMessageModal
        show={showSignModal}
        onClose={handleClose}
        error={!!connectError}
        activeWallet={activeWallet}
        onBackButtonPress={generalReset}
        signMessage={handleSignMessageMobile}
        onRetry={{
          MetaMask: handleSignMessageMobile.bind(null, 'MetaMask'),
          WalletConnect: handleSignMessageMobile.bind(null, 'WalletConnect'),
        }}
        loading={signInProgress}
      />
    );
  }

  if (stage === 'Result') {
    if (resultError === null) {
      return (
        <WalletConnectResultModal
          show={showResultSuccessModal}
          onClose={handleClose}
          type="success"
        />
      );
    }
    return (
      <WalletConnectResultModal
        show={showResultErrorModal}
        onClose={handleClose}
        type="error"
        title="Rejected"
        description="Your address doesn't hold the necessary NFTs!"
        showButton
        buttonText="Retry"
        buttonOnClick={generalReset}
      />
    );
  }

  return (
    <BaseModal show={show} onClose={handleClose}>
      <div className="flex flex-col items-center">
        <div className="text-center flex flex-col items-center gap-5">
          <p className="text-xl">Sign in</p>
          <p className="text text-gray-600">
            Connect your wallet to get started!
          </p>
        </div>
        <HSpacer size={8} />
        <div className="border border-solid w-full px-5 py-2.5 rounded">
          <div>Connect Wallet</div>

          <HSpacer size={4} />
          <div className="flex flex-col gap-2">
            <div
              className="flex flex-row gap-3 border px-2 py-2 rounded cursor-pointer hover:bg-gray-100"
              onClick={handleWalletConnect}
            >
              <WalletConnectLogo height={20} width={20} type="black" />
              <p>Wallet Connect</p>
            </div>
            {!isMobile && (
              <div
                className="flex flex-row gap-3 border px-2 py-2 rounded cursor-pointer hover:bg-gray-100"
                onClick={handleMetaMaskConnect}
              >
                <MetaMaskLogo height={20} width={20} />
                <p>Meta Mask</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
