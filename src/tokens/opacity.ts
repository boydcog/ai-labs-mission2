/**
 * 디자인 시스템 투명도(opacity) 토큰
 * primitive token.json의 Opacity 컬렉션에서 자동으로 생성됩니다.
 */

import { getPrimitiveCollection } from './utils';

const opacityCollection = getPrimitiveCollection('Primitive : Opacity');

/**
 * 프리미티브 토큰에서 추출한 opacity 값들
 */
export const opacity = opacityCollection?.numbers || {} as Record<string, number>;

export type OpacityValue = typeof opacity[keyof typeof opacity];
