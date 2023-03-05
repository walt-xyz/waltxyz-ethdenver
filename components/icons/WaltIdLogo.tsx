type Props = {
  height: number;
  width: number;
  className?: string;
  type?: 'primary' | 'gray' | 'black';
};

export default function WaltIdLogo({
  width,
  height,
  className,
  type = 'primary',
}: Props) {
  let firstColor = '#0573F0';
  let secondColor = '#E6F6FF';

  if (type === 'gray') {
    firstColor = '#CBD2D9';
    secondColor = '#52606D';
  }

  if (type === 'black') {
    firstColor = '#111827';
    secondColor = '#f3f4f6';
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 141 141"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="70.5" cy="70.5" r="70.5" fill={firstColor} />
      <rect
        x="39.0461"
        y="45.5538"
        width="30.3692"
        height="8.67692"
        fill={secondColor}
      />
      <path
        d="M112.8 74.8385L105.208 73.7538C99.7846 103.038 68.3307 103.038 68.3307 103.038L67.2461 111.715C100.218 112.583 111.354 87.4923 112.8 74.8385Z"
        fill={secondColor}
      />
    </svg>
  );
}
