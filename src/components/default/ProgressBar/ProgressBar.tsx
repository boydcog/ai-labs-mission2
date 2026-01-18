/**
 * ProgressBar 컴포넌트
 * Figma 디자인 시스템의 진행률 바 컴포넌트
 */

import React from 'react';
import type { ProgressBarProps, ProgressBarHeight, ProgressValue } from './ProgressBar.types';

const ProgressBar: React.FC<ProgressBarProps> = ({
  height = 16,
  progress = 0,
  className = '',
  'data-testid': testId,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const heightClasses: Record<ProgressBarHeight, string> = {
    16: 'h-4',
    14: 'h-[14px]',
    12: 'h-3',
    10: 'h-[10px]',
    8: 'h-2',
  };

  return (
    <div
      className={`w-full ${heightClasses[height]} bg-[#edf1f8] rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedProgress}%`}
      data-testid={testId}
    >
      <div
        className={`h-full bg-[#2a69e9] rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
export type { ProgressBarProps, ProgressBarHeight, ProgressValue };

