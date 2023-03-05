import { Property } from 'csstype';
import AnimationDuration = Property.AnimationDuration;
import WalletConnectLogo from '../icons/WalletConnectLogo';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
  size?: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  color?: string;
  indicatorCap?: 'round' | 'inherit' | 'butt' | 'square' | undefined;
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
  logo: ReactNode;
};

const ProgressBar = (props: Props) => {
  let {
    size = 80,
    trackWidth = 5,
    trackColor = `#ddd`,
    indicatorWidth = 5,
    color = `#07c`,
    indicatorCap = `round`,
    labelColor = `#000`,
    spinnerMode = false,
    spinnerSpeed = 1000,
  } = props;

  const [progress, setProgress] = useState(0);
  const loadingDuration = 800;

  useEffect(() => {
    let loadingTimeout = setTimeout(() => {
      setProgress(progress + 1);
    }, loadingDuration / 100);

    if (progress === 100) {
      setProgress(0);
    }

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [progress]);

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <>
      <div className="svg-pi-wrapper" style={{ width: size, height: size }}>
        <svg className="svg-pi" style={{ width: size, height: size }}>
          <circle
            className="svg-pi-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`svg-pi-indicator ${
              spinnerMode ? 'svg-pi-indicator--spinner' : ''
            }`}
            style={{
              animationDuration: (spinnerSpeed *
                1000) as unknown as AnimationDuration,
            }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={color}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>

        <div className="svg-pi-label">
          <span className="svg-pi-label__loading">{props.logo}</span>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
