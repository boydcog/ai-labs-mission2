/**
 * Button 컴포넌트 타입 정의
 */

import type { IconName } from '../Icon/Icon.types';

export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type ButtonHeight = 64 | 60 | 48 | 40;
export type ButtonType = 'text_only' | 'left_icon+text' | 'right_icon+text' | 'icon_only' | 'icon_only_circle';
export type ButtonStatus = 'default' | 'disabled' | 'selected' | 'destructive';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  hierarchy?: ButtonHierarchy;
  height?: ButtonHeight;
  type?: ButtonType;
  status?: ButtonStatus;
  icon?: IconName;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: 'button' | 'submit' | 'reset';
}

