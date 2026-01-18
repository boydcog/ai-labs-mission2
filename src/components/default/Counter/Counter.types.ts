/**
 * Counter 컴포넌트 타입 정의
 */

export type CounterType = 'plain' | 'label_only';
export type CounterStatus = 'default' | 'disabled' | 'error';

export interface CounterProps {
  type?: CounterType;
  status?: CounterStatus;
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  'data-testid'?: string;
}

