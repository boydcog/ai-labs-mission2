/**
 * QuizButton 컴포넌트
 * Figma 디자인 시스템의 퀴즈 버튼 컴포넌트
 */

import React from 'react';
import type { QuizButtonProps, QuizButtonHeight, QuizButtonStatus } from './QuizButton.types';

const QuizButton: React.FC<QuizButtonProps> = ({
  height = 256,
  status = 'default',
  children,
  progress,
  className = '',
  onClick,
  'data-testid': testId,
  ...props
}) => {
  const isCorrect = status === 'correct';
  const isIncorrect = status === 'incorrect';
  const isLarge = height === 256;

  const heightClasses: Record<QuizButtonHeight, string> = {
    256: 'h-64 w-64',
    64: 'h-16 min-w-[64px] px-4',
    60: 'h-[60px] min-w-[60px] px-4',
    56: 'h-14 min-w-[56px] px-3',
  };

  const radiusClasses: Record<QuizButtonHeight, string> = {
    256: 'rounded-2xl',
    64: 'rounded-full',
    60: 'rounded-full',
    56: 'rounded-full',
  };

  const getStatusStyles = (): string => {
    if (isCorrect) {
      // 정답: 연한 녹색 배경, 진한 녹색 텍스트
      return 'bg-[#c7ebe4] text-[#005243] border-transparent';
    }
    if (isIncorrect) {
      // 오답: 연한 빨간색 배경, 진한 빨간색 텍스트
      return 'bg-[#ffd6df] text-[#91122e] border-transparent';
    }
    if (isLarge) {
      // 큰 버튼 기본/선택 상태: 연한 회색 배경, 진한 파란색 텍스트
      return 'bg-[#f8f9fc] text-[#2a69e9] border-transparent';
    }
    // 작은 버튼 기본/선택 상태: 연한 파란색/회색 배경, 진한 파란색 텍스트 (Figma 디자인 기준)
    return 'bg-[#f8f9fc] text-[#2a69e9] border-transparent';
  };

  const clampedProgress = progress !== undefined ? Math.max(0, Math.min(100, progress)) : undefined;

  return (
    <button
      className={`
        ${heightClasses[height]}
        ${radiusClasses[height]}
        font-bold
        transition-all
        flex flex-col items-center justify-center
        ${isLarge ? 'gap-3' : 'gap-0'}
        focus:outline-none focus:ring-2 focus:ring-[#2a69e9] focus:ring-offset-2
        ${getStatusStyles()}
        ${className}
      `.trim()}
      onClick={onClick}
      data-height={height}
      data-status={status}
      data-testid={testId}
      {...props}
    >
      {children && (
        <span className={`
          ${isLarge ? 'text-2xl' : 'text-base'}
          font-bold
        `}>
          {children}
        </span>
      )}
      {isLarge && clampedProgress !== undefined && (
        <div className="w-full px-4">
          <div className="w-full h-1.5 bg-[#edf1f8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2a69e9] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>
      )}
    </button>
  );
};

export default QuizButton;
export type { QuizButtonProps, QuizButtonHeight, QuizButtonStatus };

