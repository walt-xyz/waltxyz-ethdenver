import { useState } from 'react';
import axios from 'axios';
import { useStages } from '../../../../lib/useStages';
import Start from './Start';
import { useAccount } from 'wagmi';

const MINT_BUTTON_TEXT = 'Mint NFT';

type ModalProps = {
  onMintFinished: () => void;
  onSkip: () => void;
  address: string;
  isOwner: boolean;
};

export default function MintNFTModal({
  onMintFinished,
  onSkip,
  address,
  isOwner,
}: ModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { next, isInitial, getStage, reset, previous } = useStages([
    'Start',
    'Confirmation',
  ]);
  const [mintButtonText, setMintButtonText] =
    useState<string>(MINT_BUTTON_TEXT);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);

  const mintSuccessTitle = `Congratulations!`;
  const mintSuccessDescription = `Your NFT membership has been minted successfully!`;
  const mintErrorTitle = `Error minting NFT`;
  const mintErrorDescription = `There was an error minting your NFT.`;

  const title = mintSuccess ? mintSuccessTitle : mintErrorTitle;
  const description = mintSuccess
    ? mintSuccessDescription
    : mintErrorDescription;

  const handleMint = async () => {
    setLoading(true);
    setMintButtonText(`Minting`);
    try {
      await axios.post(
        ' https://nftkit.walt-test.cloud/v2/nftkit/nft/chain/MUMBAI/contract/0x7Bf34C715e9A7ADEc6c4fa1CFEE4120E2808fD8c/token/mint',
        {
          metadataUri: '',
          metadata: {
            description: 'Walt Membership',
            name: 'Walt Membership',
            image:
              'ipfs://bafkreicl5qtcwcckkblm2qdut4bwyu3dksq36wipfrzui5tnbdydzpuhcq',
            image_data: '',
            external_url: '',
            attributes: [
              {
                trait_type: 'ceramic_hackathon_attendee',
                value: true,
              },
            ],
          },
          recipientAddress: address,
          metadataStorageType: 'OFF_CHAIN',
        }
      );
      setMintSuccess(true);
    } catch (error) {
      setMintSuccess(false);
    } finally {
      onMintFinished();
    }
    setLoading(false);
  };

  const handleMockMint = () => {
    setMintButtonText(`Minting`);
    setMintSuccess(true);
    next();
  };

  const handleContinue = () => {
    onMintFinished();
    setMintButtonText(MINT_BUTTON_TEXT);
    reset();
  };

  const handleSkip = () => {
    onSkip();
    setMintButtonText(MINT_BUTTON_TEXT);
    reset();
  };

  let body: JSX.Element = <> </>;

  switch (getStage()) {
    case 'Start':
      body = (
        <Start
          loading={loading}
          address={address}
          handleMint={handleMint}
          handleMockMint={handleMockMint}
          onSkip={handleSkip}
          buttonText={mintButtonText}
          isOwner={isOwner}
        />
      );
      break;
  }

  return body;
}
