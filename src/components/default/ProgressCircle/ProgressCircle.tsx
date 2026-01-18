/**
 * ProgressCircle 컴포넌트
 * Figma 디자인 시스템의 원형 진행률 컴포넌트
 */

import React from 'react';
import type { ProgressCircleProps, ProgressCircleSize, ProgressValue } from './ProgressCircle.types';
import { colors } from '@/tokens';

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  size = 'm',
  progress = 0,
  className = '',
  'data-testid': testId,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const sizeConfig: Record<ProgressCircleSize, { size: number; strokeWidth: number; radius: number }> = {
    s: { size: 32, strokeWidth: 3, radius: 12 },
    m: { size: 44, strokeWidth: 4, radius: 18 },
    l: { size: 64, strokeWidth: 5, radius: 26 },
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const offset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div
      className={`inline-flex items-center justify-center relative ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedProgress}%`}
      data-testid={testId}
    >
      <svg
        width={config.size}
        height={config.size}
        className="transform -rotate-90"
      >
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={config.radius}
          stroke={colors.neutral.light}
          strokeWidth={config.strokeWidth}
          fill="none"
        />
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={config.radius}
          stroke={colors.primary.DEFAULT}
          strokeWidth={config.strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {size !== 's' && (
        <span className="absolute text-xs font-bold text-neutral-dark">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressCircle;
export type { ProgressCircleProps, ProgressCircleSize, ProgressValue };

