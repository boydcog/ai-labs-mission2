/**
 * Icon 컴포넌트
 * Phosphor Icons를 사용하여 아이콘을 표시하는 컴포넌트
 * https://phosphoricons.com/
 */

import React from 'react';
import * as PhosphorIcons from 'phosphor-react';
import type { IconProps, IconName, IconType } from './Icon.types';
import { PHOSPHOR_ICON_MAP } from './Icon.types';

// IconType을 Phosphor weight로 매핑
// Phosphor Icons의 weight 옵션: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
const getPhosphorWeight = (type: IconType): 'regular' | 'fill' | 'duotone' => {
  switch (type) {
    case 'fill':
      return 'fill';
    case 'graphic':
      return 'duotone';
    case 'line':
    default:
      return 'regular';
  }
};

const Icon: React.FC<IconProps> = ({
  type = 'line',
  name = 'add',
  className = '',
  size = 24,
  'data-testid': testId,
}) => {
  const phosphorName = PHOSPHOR_ICON_MAP[name];
  
  if (!phosphorName) {
    // Icon not found - return placeholder
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        data-name={`type=${type}, name=${name}`}
        data-node-id={`${type}-${name}`}
        data-testid={testId}
      >
        <div
          className="bg-gray-200 rounded flex items-center justify-center text-xs"
          style={{ width: size, height: size }}
          title={`Icon not found: ${name}`}
        >
          ?
        </div>
      </div>
    );
  }

  const IconComponent = (PhosphorIcons as any)[phosphorName] as React.ComponentType<any>;

  if (!IconComponent) {
    // Icon component not found - return placeholder
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        data-name={`type=${type}, name=${name}`}
        data-node-id={`${type}-${name}`}
        data-testid={testId}
      >
        <div
          className="bg-gray-200 rounded flex items-center justify-center text-xs"
          style={{ width: size, height: size }}
          title={`Icon not found: ${phosphorName}`}
        >
          ?
        </div>
      </div>
    );
  }

  // className에서 색상 추출
  const colorClass = className.split(' ').find(cls => cls.startsWith('text-'));
  const iconColor = colorClass 
    ? (colorClass === 'text-white' ? 'white' 
       : colorClass === 'text-black' ? 'black' 
       : 'currentColor') 
    : 'currentColor';

  const weight = getPhosphorWeight(type);

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      data-name={`type=${type}, name=${name}`}
      data-node-id={`${type}-${name}`}
      data-testid={testId}
    >
      <IconComponent
        size={size}
        weight={weight}
        color={iconColor}
        className="block"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Icon;
export type { IconProps, IconName, IconType };
