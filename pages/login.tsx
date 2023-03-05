import { useCeramicContext } from '../context';
import { useState } from 'react';
import { authenticateCeramic } from '../utils';
import Button from '../components/Button';
import WalletConnectModal from '../components/Modal/WalletConnectModal/WalletConnectModal';
import LoginModal from '../components/Modal/LoginModal/LoginModal';

export default function Login() {
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
      <h1 className="text-4xl">Sissi App</h1>
      <div className="mt-5">
        <Button onClick={() => setShowWalletConnect((s) => !s)}>Login</Button>
      </div>
      <LoginModal
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
