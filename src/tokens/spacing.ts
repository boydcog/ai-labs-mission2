/**
 * 디자인 시스템 간격 토큰
 * sementic token.json의 gap 토큰에서 자동으로 생성됩니다.
 */

import { getSemanticGaps } from './utils';

const gaps = getSemanticGaps();

/**
 * 시맨틱 토큰에서 추출한 gap 값들
 * gap/gap-m -> m, gap/gap-s -> s 등의 키로 접근 가능합니다.
 */
export const spacing = {
  // 시맨틱 gap 토큰들
  ...gaps,
  
  // 하위 호환성을 위한 숫자 키 (필요시 사용)
  0: gaps.none || gaps.gap_none || '0px',
  1: '4px',
  2: gaps.gap_2xs || '8px',
  3: gaps.gap_3xs || '12px',
  4: gaps.gap_s || '16px',
  5: gaps.gap_m || '20px',
  6: gaps.gap_l || '24px',
  8: gaps.gap_2xl || '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export type SpacingValue = typeof spacing[keyof typeof spacing];

