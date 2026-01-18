/**
 * ProgressCircle 컴포넌트 타입 정의
 */

export type ProgressCircleSize = 's' | 'm' | 'l';
export type ProgressValue = 0 | 20 | 40 | 60 | 80 | 100 | number;

export interface ProgressCircleProps {
  size?: ProgressCircleSize;
  progress?: ProgressValue;
  className?: string;
  'data-testid'?: string;
}

