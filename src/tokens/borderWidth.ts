/**
 * 디자인 시스템 테두리 두께(border width) 토큰
 * primitive token.json의 Border Width 컬렉션에서 자동으로 생성됩니다.
 */

import { getPrimitiveCollection } from './utils';

const borderWidthCollection = getPrimitiveCollection('Primitive : Border Width');

/**
 * 프리미티브 토큰에서 추출한 border width 값들
 */
export const borderWidth = borderWidthCollection?.numbers || {} as Record<string, number>;

export type BorderWidthValue = typeof borderWidth[keyof typeof borderWidth];
