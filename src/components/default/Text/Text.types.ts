/**
 * Text 컴포넌트 타입 정의
 */

export type TextSize = 's' | 'm';
export type TextVariant = 'default' | 'moco';

export interface TextProps {
  size?: TextSize;
  variant?: TextVariant;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

