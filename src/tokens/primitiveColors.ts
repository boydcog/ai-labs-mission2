/**
 * 디자인 시스템 프리미티브 색상 토큰
 * primitive token.json의 Color 컬렉션에서 자동으로 생성됩니다.
 */

import { getPrimitiveCollection } from './utils';

const colorCollection = getPrimitiveCollection('Primitive : Color');

/**
 * 프리미티브 토큰에서 추출한 모든 색상 값들
 * gray/1300, slateBlue/1300 등의 키로 접근 가능합니다.
 */
export const primitiveColors = colorCollection?.colors || {} as Record<string, string>;

export type PrimitiveColorName = keyof typeof primitiveColors;
export type PrimitiveColorValue = typeof primitiveColors[PrimitiveColorName];
