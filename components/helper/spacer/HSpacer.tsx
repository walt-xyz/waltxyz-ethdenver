import Spacer, { SpacerProps } from '../spacer/Spacer';

type Props = Pick<SpacerProps, 'size'>;

export default function HSpacer({ size }: Props) {
  return <Spacer type="horizontal" size={size} />;
}
