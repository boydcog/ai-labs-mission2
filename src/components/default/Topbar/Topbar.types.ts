/**
 * Topbar 컴포넌트 타입 정의
 */

export type TopbarType = 'default' | 'progress' | 'logo' | 'countdown' | 'Variant5' | 'Type6';

export interface TopbarProps {
  type?: TopbarType;
  title?: string;
  progress?: number;
  countdown?: number;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
  'data-testid'?: string;
}

