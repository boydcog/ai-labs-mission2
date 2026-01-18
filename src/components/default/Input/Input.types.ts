/**
 * Input 컴포넌트 타입 정의
 */

export type InputFill = 'outlined';
export type InputType = 'label+helper' | 'label_only' | 'plain' | 'helper_only';
export type InputStatus = 'default' | 'focus' | 'type' | 'filled' | 'error' | 'disabled' | 'success';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fill?: InputFill;
  inputType?: InputType;
  status?: InputStatus;
  label?: string;
  helper?: string;
  errorMessage?: string;
  successMessage?: string;
  button?: boolean;
  labelButtonText?: string;
  icon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
  'data-testid'?: string;
}

