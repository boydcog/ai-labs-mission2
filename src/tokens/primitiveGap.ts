/**
 * 디자인 시스템 프리미티브 간격(gap) 토큰
 * primitive token.json의 Gap 컬렉션에서 자동으로 생성됩니다.
 */

import { getPrimitiveCollection } from './utils';

const gapCollection = getPrimitiveCollection('Primitive : Gap');

/**
 * 프리미티브 토큰에서 추출한 gap 값들
 */
export const primitiveGap = gapCollection?.numbers || {} as Record<string, number>;

export type PrimitiveGapValue = typeof primitiveGap[keyof typeof primitiveGap];
