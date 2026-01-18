/**
 * ScoreBarChart 컴포넌트
 * 두 개의 막대 그래프를 나란히 표시하는 점수 비교 컴포넌트
 * Anima 코드 기반으로 업데이트
 */

import React from 'react';
import type { ScoreBarChartProps, ScoreBarData } from './ScoreBarChart.types';

const ScoreBarChart: React.FC<ScoreBarChartProps> = ({
  leftBar,
  rightBar,
  maxBarHeight: _maxBarHeight = 200, // Anima 코드에서는 고정 높이 사용하므로 미사용
  gap = 36, // Anima: gap-3xl (36px)
  className = '',
  'data-testid': testId,
}) => {
  // Anima 코드 기준: 고정 너비 w-16 (64px)
  const barWidth = 64;

  const renderBar = (data: ScoreBarData, testIdPrefix: string, isLeft: boolean) => {
    // Anima 코드 기준: 왼쪽 h-20 (80px), 오른쪽 h-[120px] (120px)
    // 값에 따라 상대적 높이 계산
    const maxValue = Math.max(leftBar.value, rightBar.value, 1);
    const percentage = (data.value / maxValue) * 100;
    
    // Anima 기준 높이를 기반으로 계산
    const baseHeight = isLeft ? 80 : 120;
    const barHeightPx = (percentage / 100) * baseHeight;
    
    // Anima 코드 기준 색상
    const barColor = data.color || (isLeft ? '#b2cefb' : '#8baef3');

    return (
      <div 
        className="flex flex-col items-center gap-2" 
        style={{ width: `${barWidth}px` }}
        data-testid={`${testIdPrefix}-bar`}
      >
        {/* 숫자 레이블 (막대 위) - Anima: text-sm, font-medium, text-[#4a5568] */}
        <div className="text-center">
          <span className="text-sm font-medium text-[#4a5568] tracking-[-0.14px] leading-[21px] whitespace-nowrap">
            {data.value}개
          </span>
        </div>
        
        {/* 막대 - Anima: rounded-lg */}
        <div
          className="w-full rounded-lg transition-all duration-500 ease-out"
          style={{ 
            height: `${barHeightPx}px`, 
            backgroundColor: barColor,
            minHeight: barHeightPx > 0 ? '8px' : '0px' 
          }}
          data-testid={`${testIdPrefix}-bar-element`}
          role="img"
          aria-label={`${data.label}: ${data.value}개`}
        />
        
        {/* 텍스트 레이블 (막대 아래) - Anima: text-base, font-semibold, text-[#2d3748] */}
        <div className="text-center">
          <span className="text-base font-semibold text-[#2d3748] tracking-[-0.16px] leading-6 whitespace-nowrap">
            {data.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`inline-flex items-end justify-center ${className}`}
      style={{ gap: `${gap}px` }}
      data-testid={testId}
      role="group"
      aria-label="점수 비교 차트"
    >
      {renderBar(leftBar, 'left', true)}
      {renderBar(rightBar, 'right', false)}
    </div>
  );
};

export default ScoreBarChart;
export type { ScoreBarChartProps, ScoreBarData };
