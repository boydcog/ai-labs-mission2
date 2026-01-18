/**
 * QuizButton 컴포넌트 타입 정의
 */

export type QuizButtonHeight = 256 | 64 | 60 | 56;
export type QuizButtonStatus = 'default' | 'selected' | 'correct' | 'incorrect';

export interface QuizButtonProps {
  height?: QuizButtonHeight;
  status?: QuizButtonStatus;
  children?: React.ReactNode;
  progress?: number; // 진행률 (0-100, height가 256일 때만 표시)
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  'data-testid'?: string;
}

