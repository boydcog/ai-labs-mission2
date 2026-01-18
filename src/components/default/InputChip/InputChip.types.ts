/**
 * InputChip 컴포넌트 타입 정의
 */

import type { IconName } from '../Icon/Icon.types';

export type InputChipFunction = 'input';
export type InputChipSize = 64 | 56;
export type InputChipType = 'text_only' | 'left_icon+text' | 'right_icon+text';
export type InputChipStatus = 'default' | 'disabled' | 'selected' | 'blurred' | 'correct' | 'incorrect';

export interface InputChipProps {
  function?: InputChipFunction;
  size?: InputChipSize;
  type?: InputChipType;
  status?: InputChipStatus;
  icon?: IconName;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  'data-testid'?: string;
}

