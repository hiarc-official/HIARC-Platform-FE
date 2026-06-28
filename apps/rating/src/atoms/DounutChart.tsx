'use client';
import { useState, useEffect } from 'react';
import Color from '../util/Color'; // 기본 색상 관리 파일

interface DonutChartProps {
  value: number; // 최종 목표 진행률 (예: 30)
  maxValue?: number; // 최대값 (기본: 100)
  strokeColor?: string; // 진행 색상 (기본: 파란색)
  backgroundColor?: string; // 배경 원 색상 (기본: 연한 회색)
  div?: number;
  duration?: number; // 애니메이션 지속 시간 (기본: 1.5초)
}

const DonutChart: React.FC<DonutChartProps> = ({
  value,
  maxValue = 100,
  strokeColor = Color.primary,
  backgroundColor = '#eee',
  div,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // value 값이 바뀔 때마다 바로 반영되도록 처리
    const newValue = value; // value 값으로 바로 설정
    setAnimatedValue(newValue); // 애니메이션 없이 바로 업데이트
  }, [value]); // value가 변경될 때마다 실행

  const size = 180;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedValue / maxValue) * circumference;

  return (
    <div className="w-[282px] h-[241px] flex flex-col items-center justify-center bg-[#f0f9ff] rounded-[20px] p-[10px]">
      <div className="flex justify-center items-center w-full">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* 배경 원 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          {/* 진행 원 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isNaN(progress) ? 0 : circumference - progress} // NaN일 경우 0으로 처리
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          {/* 중앙 텍스트 */}
          <text
            x="53%"
            y="50%"
            style={{
              fontWeight: 700,
              fill: 'black',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
            }}
          >
            <tspan fontSize="45px">{animatedValue}</tspan> {/* 애니메이션 적용된 숫자 */}
            <tspan fontSize="12px" dx="0px" dy="7px">
              %
            </tspan>
          </text>
        </svg>
      </div>
      {/* 하단 설명 텍스트 */}
      <div className="mt-[20px] text-[14px] font-medium text-black text-center">
        div {div} 학회원들의 스트릭 유지율
      </div>
    </div>
  );
};

export default DonutChart;
