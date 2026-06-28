'use client';
import { Label } from '@hiarc-platform/design-system';

interface DonutChartProps {
  value: number; // 진행률 (0~100)
  maxValue?: number;
  div?: number;
  duration?: number; // 사용 안 함(시그니처 호환용)
}

const TRACK_COLOR = '#DEDEEB'; // gray-200
const PROGRESS_COLOR = '#000947'; // primary-300 (네이비)

const DonutChart: React.FC<DonutChartProps> = ({ value, maxValue = 100, div }) => {
  const size = 168;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeValue = isNaN(value) ? 0 : Math.max(0, Math.min(value, maxValue));
  const progress = (safeValue / maxValue) * circumference;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${safeValue}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={TRACK_COLOR}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={PROGRESS_COLOR}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 600ms ease-out' }}
        />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="#0B1215">
          <tspan fontSize="40" fontWeight={700}>
            {safeValue}
          </tspan>
          <tspan fontSize="14" fontWeight={500} dx="2" dy="-12">
            %
          </tspan>
        </text>
      </svg>
      <Label size="sm" className="text-center text-gray-600">
        div {div} 학회원들의 스트릭 유지율
      </Label>
    </div>
  );
};

export default DonutChart;
