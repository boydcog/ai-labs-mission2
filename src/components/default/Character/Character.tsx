/**
 * Character 컴포넌트
 * Figma 디자인 시스템의 캐릭터 컴포넌트
 */

import React from 'react';
import MainCharacterSvg from '@/assets/images/characters/main-character.svg?react';
import type { CharacterProps, CharacterVariant } from './Character.types';

const Character: React.FC<CharacterProps> = ({
  variant = 'thumbnail',
  className = '',
  'data-testid': testId,
}) => {
  // Figma에서 추출한 SVG는 148x148이므로 그에 맞게 조정
  const variantStyles: Record<CharacterVariant, string> = {
    thumbnail: 'w-[148px] h-[148px]',
    full_shot: 'w-[372px] h-[372px]',
    bust_shot: 'w-[372px] h-[272px]',
  };

  const baseClasses = `
    relative
    flex items-center justify-center
    ${className.includes('bg-') ? '' : 'bg-transparent'}
    ${variantStyles[variant]}
    ${className}
  `;

  return (
    <div
      className={baseClasses.trim()}
      data-testid={testId}
      data-name={`character/${variant}`}
    >
      <MainCharacterSvg className="w-full h-full" />
    </div>
  );
};

export default Character;
export type { CharacterProps, CharacterVariant };
