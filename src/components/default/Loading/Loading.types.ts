/**
 * Loading 컴포넌트 타입 정의
 */

export type LoadingSize = 's' | 'm' | 'l';

export interface LoadingProps {
  size?: LoadingSize;
  className?: string;
  'data-testid'?: string;
}

