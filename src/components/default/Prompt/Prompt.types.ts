/**
 * Prompt 컴포넌트 타입 정의
 */

export type PromptType = 'small' | 'default';
export type PromptContentType = 'word' | 'default';

export interface PromptProps {
  type?: PromptType;
  contentType?: PromptContentType;
  label?: string;
  text?: string;
  className?: string;
  'data-testid'?: string;
}

