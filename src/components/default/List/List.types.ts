/**
 * List 컴포넌트 타입 정의
 */

import type { IconName } from '../Icon/Icon.types';

export interface ListItemProps {
  icon?: IconName;
  label?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  'data-testid'?: string;
}

export interface ListProps {
  items?: ListItemProps[];
  className?: string;
  'data-testid'?: string;
}

