/**
 * AssistChip 컴포넌트 타입 정의
 */

import type { IconName } from '../Icon/Icon.types';

export type AssistChipStatus = 'default' | 'disabled' | 'selected';

export interface AssistChipProps {
  status?: AssistChipStatus;
  icon?: IconName;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  'data-testid'?: string;
}

