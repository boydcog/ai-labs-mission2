/**
 * ProgressBar 컴포넌트 타입 정의
 */

export type ProgressBarHeight = 16 | 14 | 12 | 10 | 8;
export type ProgressValue = 0 | 20 | 40 | 60 | 80 | 100 | number;

export interface ProgressBarProps {
  height?: ProgressBarHeight;
  progress?: ProgressValue;
  className?: string;
  'data-testid'?: string;
}

