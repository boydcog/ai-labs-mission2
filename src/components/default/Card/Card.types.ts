/**
 * Card 컴포넌트 타입 정의
 */

import type { ListItemProps } from '../List/List.types';

export type CardType = 'training' | 'default';

export interface CardProps {
  type?: CardType;
  items?: ListItemProps[];
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

