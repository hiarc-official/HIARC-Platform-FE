import Color from '../util/Color';

interface CircularProgressProps {
  value: number;
  maxValue: number;
  width?: number;
  height?: number;
  strokeColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  maxValue,
  width = 48,
  height = 48,
  strokeColor,
}) => {
  const size = Math.min(width, height);
  const strokeWidth = size * 0.15;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = (value / maxValue) * 100;
  const dashOffset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="flex items-center justify-center relative"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-[#edf8fd]"
        />
        {/*  진행 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="fill-none transition-[stroke-dashoffset] duration-500 ease-in-out origin-center -rotate-90"
          style={{ stroke: strokeColor || Color.primary }}
        />

        {/*  중앙 텍스트 */}
        <text x="50%" y="52%" dy="3%" textAnchor="middle" className="font-bold fill-black">
          <tspan fontSize={`${size * 0.23}px`} fontWeight="bold">
            {value}
          </tspan>
          <tspan fontSize={`${size * 0.12}px`} dx="2px">
            /{maxValue}
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
