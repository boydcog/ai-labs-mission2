/**
 * 디자인 시스템 타이포그래피 토큰
 * primitive token.json의 Typography 컬렉션에서 자동으로 생성됩니다.
 */

import { getPrimitiveTypography } from './utils';

const primitiveTypography = getPrimitiveTypography();

/**
 * 프리미티브 토큰에서 추출한 타이포그래피 객체
 * fontSize, fontFamily, fontWeight, lineHeight, letterSpacing을 포함합니다.
 */
export const typography = {
  fontFamily: primitiveTypography?.fontFamily || {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['Space Mono', 'Menlo', 'Monaco', 'monospace'],
  },

  fontSize: primitiveTypography?.fontSize || {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '32px',
  },

  fontWeight: primitiveTypography?.fontWeight || {
    regular: 400,
    medium: 500,
    bold: 700,
  },

  lineHeight: primitiveTypography?.lineHeight || {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  letterSpacing: primitiveTypography?.letterSpacing || {},
} as const;

export type TypographyToken = typeof typography;

