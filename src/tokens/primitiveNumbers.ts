/**
 * 디자인 시스템 프리미티브 숫자 토큰
 * primitive token.json의 Number 컬렉션에서 자동으로 생성됩니다.
 */

import { getPrimitiveCollection } from './utils';

const numberCollection = getPrimitiveCollection('Primitive : Number');

/**
 * 프리미티브 토큰에서 추출한 모든 숫자 값들
 */
export const primitiveNumbers = numberCollection?.numbers || {} as Record<string, number>;

export type PrimitiveNumberName = keyof typeof primitiveNumbers;
export type PrimitiveNumberValue = typeof primitiveNumbers[PrimitiveNumberName];
