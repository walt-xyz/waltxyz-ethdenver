import { useCeramicContext } from '../context';
import { authenticateCeramic } from '../utils';
import OnboardingModal from '../components/Modal/OnboardingModal/OnboardingModal';
import { useState } from 'react';
import WalletConnectModal from '../components/Modal/WalletConnectModal/WalletConnectModal';
import Button from '../components/Button';

export default function Onboarding() {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;

  const [show, setShow] = useState(false);
  const [showWalletConnect, setShowWalletConnect] = useState(false);

  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient);
  };

  const handleWalletConnectSuccess = () => {
    setShowWalletConnect(false);
    setShow(true);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl">Franz App</h1>
      <div className="mt-5">
        <Button onClick={() => setShowWalletConnect((s) => !s)}>
          Start Onboarding
        </Button>
      </div>
      <OnboardingModal
        show={show}
        onSubmit={() => {}}
        onClose={() => setShow(false)}
      />
      <WalletConnectModal
        show={showWalletConnect}
        onClose={() => setShowWalletConnect((s) => !s)}
        onSuccess={handleWalletConnectSuccess}
      />
    </div>
  );
}
