/**
 * 디자인 시스템 반경(radius) 토큰
 * primitive token.json의 Radius 컬렉션에서 자동으로 생성됩니다.
 */

import { getPrimitiveCollection } from './utils';

const radiusCollection = getPrimitiveCollection('Primitive : Radius');

/**
 * 프리미티브 토큰에서 추출한 radius 값들
 */
export const radius = radiusCollection?.numbers || {} as Record<string, number>;

export type RadiusValue = typeof radius[keyof typeof radius];
