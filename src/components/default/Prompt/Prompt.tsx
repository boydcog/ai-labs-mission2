/**
 * Prompt 컴포넌트
 * Figma 디자인 시스템의 프롬프트 컴포넌트
 */

import React from 'react';
import type { PromptProps, PromptType, PromptContentType } from './Prompt.types';

const Prompt: React.FC<PromptProps> = ({
  type = 'default',
  contentType = 'default',
  label,
  text,
  className = '',
  'data-testid': testId,
}) => {
  const baseClasses = `
    bg-neutral-light
    border-2
    border-neutral-medium
    flex flex-col
    items-start
    justify-center
    min-h-[92px]
    overflow-hidden
    px-5
    py-4
    rounded-2xl
    w-[320px]
    relative
    ${className}
  `;

  return (
    <div
      className={baseClasses.trim()}
      data-testid={testId}
      data-name={`prompt/${type}/${contentType}`}
    >
      {/* 캐릭터 이미지 영역 - 오른쪽 하단 */}
      <div className="absolute bottom-[-2px] right-[-2px] w-[92px] h-[92px] overflow-hidden">
        <div className="absolute inset-0 bg-neutral-light rounded-full flex items-center justify-center">
          <span className="text-xs text-neutral-medium">Moco</span>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-0 items-start relative shrink-0 z-10">
        {label && (
          <p className="font-medium text-base text-neutral-medium leading-[1.4] tracking-[-0.16px] whitespace-nowrap">
            {label}
          </p>
        )}
        {text && (
          <p className="font-semibold text-[28px] text-neutral-dark leading-[40px] tracking-none whitespace-pre">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Prompt;
export type { PromptProps, PromptType, PromptContentType };

