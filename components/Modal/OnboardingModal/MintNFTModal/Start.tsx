import HSpacer from '../../../helper/spacer/HSpacer';
import Button from '../../../Button';

type ModalProps = {
  loading: boolean;
  address: string;
  handleMint: () => void;
  handleMockMint: () => void;
  buttonText: string;
  onSkip: () => void;
  isOwner: boolean;
};

export default function Start({
  loading,
  address,
  handleMint,
  buttonText,
  handleMockMint,
  onSkip,
  isOwner,
}: ModalProps) {
  const subtitle = isOwner
    ? 'You already own an Membership NFT!'
    : 'Mint this NFT to unlock gated experiences';

  return (
    <div className="flex flex-col items-center">
      <div className="h-4"></div>
      <h1 className="text-xl font-bold">Claim Membership</h1>
      <p className="mt-8 text-center text-gray-900">{subtitle}</p>
      {isOwner && (
        <div className="m-5">
          <iframe
            src="https://giphy.com/embed/LROkWNz4t7PwN54RAG"
            className="giphy-embed"
            allowFullScreen
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/DWFCOfficial-owner-meadowbank-the-wanderers-LROkWNz4t7PwN54RAG"></a>
          </p>
        </div>
      )}
      <HSpacer size={10} />
      {!isOwner ? (
        <div>
          <Button
            loadingText={buttonText}
            loading={loading}
            onClick={handleMint}
          >
            {buttonText}
          </Button>
          <Button onClick={handleMockMint} style="link" color="secondary">
            No, thanks
          </Button>
        </div>
      ) : (
        <Button onClick={onSkip}>Continue</Button>
      )}
      <HSpacer size={6} />
    </div>
  );
}
