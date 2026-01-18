/**
 * Character 컴포넌트 타입 정의
 */

export type CharacterVariant = 'thumbnail' | 'full_shot' | 'bust_shot';

export interface CharacterProps {
  variant?: CharacterVariant;
  className?: string;
  'data-testid'?: string;
}

