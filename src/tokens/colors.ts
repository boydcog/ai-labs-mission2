/**
 * 디자인 시스템 색상 토큰
 * sementic token.json에서 자동으로 생성됩니다.
 */

import { getSemanticColors } from './utils';

const semanticColors = getSemanticColors();

/**
 * 시맨틱 토큰에서 추출한 색상 객체
 * color/text, color/stroke, color/surface, color/bg 등의 카테고리로 구성됩니다.
 */
export const colors = {
  // Text colors
  text: semanticColors.color?.text || {},
  
  // Stroke colors
  stroke: semanticColors.color?.stroke || {},
  
  // Surface colors
  surface: semanticColors.color?.surface || {},
  
  // Background colors
  bg: semanticColors.color?.bg || {},
  
  // 하위 호환성을 위한 레거시 구조 (필요시 사용)
  primary: {
    DEFAULT: semanticColors.color?.text?.primary_1 || semanticColors.color?.bg?.primary_1 || '#2a69e9',
  },
  
  secondary: {
    DEFAULT: semanticColors.color?.text?.neutral_1 || '#1e242f',
  },
  
  neutral: {
    dark: semanticColors.color?.text?.neutral_1 || '#1e242f',
    medium: semanticColors.color?.text?.neutral_2 || '#323d4e',
    light: semanticColors.color?.surface?.neutral_2 || '#edf1f8',
    white: semanticColors.color?.bg?.neutral_1 || '#ffffff',
  },
  
  status: {
    success: semanticColors.color?.text?.success_2 || semanticColors.color?.stroke?.success_1 || '#00b292',
    error: semanticColors.color?.text?.error_2 || semanticColors.color?.stroke?.error_1 || '#f4456b',
  },
} as const;

export type ColorName = keyof typeof colors;
export type ColorValue = typeof colors[ColorName][string] | string;
