/**
 * Text 컴포넌트
 * Figma 디자인 시스템의 텍스트 컴포넌트
 */

import React from 'react';
import type { TextProps, TextSize, TextVariant } from './Text.types';

const Text: React.FC<TextProps> = ({
  size = 's',
  variant = 'default',
  children,
  className = '',
  'data-testid': testId,
}) => {
  // Size별 스타일 설정
  const sizeStyles: Record<TextSize, string> = {
    s: 'text-xl font-medium leading-[32px]', // 20px, lineHeight 32px
    m: 'text-[22px] font-semibold leading-[34px]', // 22px, lineHeight 34px
  };

  // Variant별 스타일 설정
  const variantStyles: Record<TextVariant, string> = {
    default: 'text-neutral-dark',
    moco: 'text-neutral-dark',
  };

  const baseClasses = `
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

  // moco variant는 캐릭터 이미지가 포함된 특별한 형태
  if (variant === 'moco' && size === 'm') {
    return (
      <div
        className={`flex flex-col items-center gap-4 ${className}`}
        data-testid={testId}
        data-name={`Property 1=${size}, Property 2=${variant}`}
      >
        {/* 캐릭터 이미지 영역 - 나중에 Character 컴포넌트로 대체 가능 */}
        <div className="h-[53px] w-[72px] relative flex-shrink-0">
          <div className="absolute inset-0 bg-neutral-light rounded flex items-center justify-center">
            <span className="text-xs text-neutral-medium">Moco</span>
          </div>
        </div>
        {/* 텍스트 영역 */}
        <div className="bg-neutral-light border-2 border-neutral-medium rounded-lg px-5 py-4 w-full">
          <p className={baseClasses.trim()}>{children}</p>
        </div>
      </div>
    );
  }

  // 기본 텍스트 렌더링
  return (
    <div
      className={baseClasses.trim()}
      data-testid={testId}
      data-name={`Property 1=${size}, Property 2=${variant}`}
    >
      {children}
    </div>
  );
};

export default Text;
export type { TextProps, TextSize, TextVariant };

