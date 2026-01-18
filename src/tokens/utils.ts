/**
 * JSON 토큰 파일을 파싱하는 유틸리티 함수
 */

import primitiveTokens from './primitive token.json';
import semanticTokens from './sementic token.json';

/**
 * 모든 시맨틱 토큰을 추출하여 구조화된 객체로 변환
 */
export function getAllSemanticTokens() {
  const systemToken = semanticTokens.collections.system_token.variables;
  const result: Record<string, any> = {
    colors: {},
    numbers: {},
    strings: {},
    booleans: {},
  };

  // Colors 파싱
  systemToken.colors.forEach((color: { name: string; value: string }) => {
    const parts = color.name.split('/');
    if (parts.length >= 3) {
      const [category, type, variant] = parts;
      if (!result.colors[category]) result.colors[category] = {};
      if (!result.colors[category][type]) result.colors[category][type] = {};
      const variantKey = variant.replace(/-/g, '_');
      result.colors[category][type][variantKey] = color.value;
    } else if (parts.length === 2) {
      const [category, type] = parts;
      if (!result.colors[category]) result.colors[category] = {};
      const typeKey = type.replace(/-/g, '_');
      result.colors[category][typeKey] = color.value;
    }
  });

  // Numbers 파싱
  systemToken.numbers.forEach((num: { name: string; value: number }) => {
    const parts = num.name.split('/');
    if (parts.length >= 2) {
      const [category, ...rest] = parts;
      if (!result.numbers[category]) result.numbers[category] = {};
      // gap/gap-m -> gap: { gap_m: 20 }
      let key = rest.join('_').replace(/-/g, '_');
      // gap- 접두사 제거 (gap/gap-m -> gap_m)
      if (key.startsWith('gap_')) {
        key = key.replace('gap_', '');
      }
      result.numbers[category][key] = num.value;
    } else {
      result.numbers[num.name] = num.value;
    }
  });

  // Strings 파싱
  systemToken.strings.forEach((str: { name: string; value: string }) => {
    const parts = str.name.split('/');
    if (parts.length >= 2) {
      const [category, ...rest] = parts;
      if (!result.strings[category]) result.strings[category] = {};
      const key = rest.join('_').replace(/-/g, '_');
      result.strings[category][key] = str.value;
    } else {
      result.strings[str.name] = str.value;
    }
  });

  // Booleans 파싱
  systemToken.booleans.forEach((bool: { name: string; value: boolean }) => {
    const parts = bool.name.split('/');
    if (parts.length >= 2) {
      const [category, ...rest] = parts;
      if (!result.booleans[category]) result.booleans[category] = {};
      const key = rest.join('_').replace(/-/g, '_');
      result.booleans[category][key] = bool.value;
    } else {
      result.booleans[bool.name] = bool.value;
    }
  });

  return result;
}

/**
 * 시맨틱 토큰에서 색상 토큰을 추출하여 구조화된 객체로 변환
 * @deprecated getAllSemanticTokens()를 사용하세요
 */
export function getSemanticColors() {
  const allTokens = getAllSemanticTokens();
  return allTokens.colors;
}

/**
 * 모든 프리미티브 토큰을 추출하여 구조화된 객체로 변환
 */
export function getAllPrimitiveTokens() {
  const collections = primitiveTokens.collections as Record<string, any>;
  const result: Record<string, any> = {};

  Object.keys(collections).forEach((collectionName) => {
    const collection = collections[collectionName];
    const collectionKey = collectionName.replace('Primitive : ', '').toLowerCase().replace(/\s+/g, '');
    
    result[collectionKey] = {
      colors: {},
      numbers: {},
      strings: {},
      booleans: {},
    };

    // Colors
    (collection.variables.colors || []).forEach((color: { name: string; value: string }) => {
      const key = color.name.split('/').pop()?.replace(/-/g, '_') || color.name.replace(/-/g, '_');
      result[collectionKey].colors[key] = color.value;
    });

    // Numbers
    (collection.variables.numbers || []).forEach((num: { name: string; value: number }) => {
      const key = num.name.split('/').pop()?.replace(/-/g, '_') || num.name.replace(/-/g, '_');
      result[collectionKey].numbers[key] = num.value;
    });

    // Strings
    (collection.variables.strings || []).forEach((str: { name: string; value: string }) => {
      const key = str.name.split('/').pop()?.replace(/-/g, '_') || str.name.replace(/-/g, '_');
      result[collectionKey].strings[key] = str.value;
    });

    // Booleans
    (collection.variables.booleans || []).forEach((bool: { name: string; value: boolean }) => {
      const key = bool.name.split('/').pop()?.replace(/-/g, '_') || bool.name.replace(/-/g, '_');
      result[collectionKey].booleans[key] = bool.value;
    });
  });

  return result;
}

/**
 * 시맨틱 토큰에서 gap 관련 숫자 토큰을 추출하여 spacing 객체로 변환
 */
export function getSemanticGaps() {
  const allTokens = getAllSemanticTokens();
  const gaps: Record<string, string> = {};

  if (allTokens.numbers.gap) {
    Object.keys(allTokens.numbers.gap).forEach((key) => {
      gaps[key] = `${allTokens.numbers.gap[key]}px`;
    });
  }

  return gaps;
}

/**
 * 프리미티브 토큰에서 특정 컬렉션의 변수들을 추출
 */
export function getPrimitiveCollection(collectionName: string) {
  const allPrimitive = getAllPrimitiveTokens();
  const collectionKey = collectionName.replace('Primitive : ', '').toLowerCase().replace(/\s+/g, '');
  return allPrimitive[collectionKey] || null;
}

/**
 * 프리미티브 Typography 토큰을 구조화된 객체로 변환
 */
export function getPrimitiveTypography() {
  const collections = primitiveTokens.collections as Record<string, any>;
  const rawCollection = collections['Primitive : Typography'];
  if (!rawCollection?.variables) return null;

  const result: Record<string, any> = {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
    letterSpacing: {},
  };

  // fontSize 파싱 (fontSize/fontSize80 -> fontSize80 또는 값 기반 키)
  (rawCollection.variables.numbers || []).forEach((num: { name: string; value: number }) => {
    if (num.name.startsWith('fontSize/')) {
      const sizeValue = num.value;
      // 숫자 값을 기반으로 일반적인 크기 매핑
      let key: string;
      if (sizeValue <= 12) key = 'xs';
      else if (sizeValue <= 14) key = 'sm';
      else if (sizeValue <= 16) key = 'base';
      else if (sizeValue <= 18) key = 'lg';
      else if (sizeValue <= 24) key = 'xl';
      else if (sizeValue <= 28) key = '2xl';
      else if (sizeValue <= 32) key = '3xl';
      else {
        // 큰 값들은 숫자로 키 생성
        const numKey = num.name.replace('fontSize/fontSize', '');
        key = numKey;
      }
      
      // 이미 같은 값의 키가 있으면 덮어쓰지 않음 (더 작은 값 우선)
      if (!result.fontSize[key] || sizeValue <= parseFloat(result.fontSize[key])) {
        result.fontSize[key] = `${sizeValue}px`;
      }
    } else if (num.name.startsWith('lineHeight/')) {
      // lineHeight/lineHeight100 -> 100 또는 값 기반 키
      const numKey = num.name.replace('lineHeight/lineHeight', '');
      const value = num.value;
      // 값 기반으로 일반적인 키 매핑
      let key: string;
      if (value <= 16) key = 'tight';
      else if (value <= 24) key = 'normal';
      else if (value <= 32) key = 'relaxed';
      else key = numKey;
      
      if (!result.lineHeight[key] || value <= result.lineHeight[key]) {
        result.lineHeight[key] = value;
      }
    } else if (num.name.startsWith('letterSpacing/')) {
      const key = num.name.replace('letterSpacing/', '');
      result.letterSpacing[key] = `${num.value}px`;
    }
  });

  // fontFamily와 fontWeight는 strings에서 가져옴
  (rawCollection.variables.strings || []).forEach((str: { name: string; value: string }) => {
    if (str.name.startsWith('fontFamily/')) {
      const key = str.name.replace('fontFamily/', '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      // 문자열 값을 배열로 변환 (공백으로 구분된 폰트 목록)
      result.fontFamily[key] = str.value.split(',').map((f: string) => f.trim());
    } else if (str.name.startsWith('fontWeight/')) {
      // fontWeight/fontWeight400 -> 400
      const weightMatch = str.name.match(/fontWeight(\d+)/);
      if (weightMatch) {
        const weight = parseInt(weightMatch[1], 10);
        // 일반적인 이름 매핑
        let key: string;
        if (weight === 300) key = 'light';
        else if (weight === 400) key = 'regular';
        else if (weight === 500) key = 'medium';
        else if (weight === 600) key = 'semibold';
        else if (weight === 700) key = 'bold';
        else key = weight.toString();
        
        result.fontWeight[key] = weight;
      }
    }
  });

  // 기본값 설정 (JSON에 없을 경우)
  if (Object.keys(result.fontFamily).length === 0) {
    result.fontFamily = {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['Space Mono', 'Menlo', 'Monaco', 'monospace'],
    };
  }

  if (Object.keys(result.fontWeight).length === 0) {
    result.fontWeight = {
      regular: 400,
      medium: 500,
      bold: 700,
    };
  }

  if (Object.keys(result.lineHeight).length === 0) {
    result.lineHeight = {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    };
  }

  return result;
}
