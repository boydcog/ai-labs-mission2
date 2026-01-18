/**
 * InputChip 컴포넌트
 * Figma 디자인 시스템의 입력 칩 컴포넌트
 */

import React from 'react';
import type { InputChipProps, InputChipSize, InputChipType, InputChipStatus } from './InputChip.types';
import Icon from '../Icon';

const InputChip: React.FC<InputChipProps> = ({
  size = 64,
  type = 'text_only',
  status = 'default',
  icon,
  children,
  className = '',
  onClick,
  'data-testid': testId,
  ...props
}) => {
  const isDisabled = status === 'disabled';
  const isSelected = status === 'selected';
  const isCorrect = status === 'correct';
  const isIncorrect = status === 'incorrect';
  const isBlurred = status === 'blurred';

  const sizeClasses: Record<InputChipSize, { height: string; padding: string; fontSize: string; iconSize: number }> = {
    64: { height: 'h-16', padding: 'px-6 py-4', fontSize: 'text-base', iconSize: 24 },
    56: { height: 'h-14', padding: 'px-5 py-3', fontSize: 'text-sm', iconSize: 20 },
  };

  const sizeConfig = sizeClasses[size];

  const getStatusStyles = (): string => {
    if (isDisabled) {
      return 'bg-[#f8f9fc] border-[#c3ccda] text-[#a0aec5] cursor-not-allowed opacity-60';
    }
    if (isSelected) {
      return 'bg-[#6694ef] text-white border-[#6694ef]';
    }
    if (isCorrect) {
      return 'bg-[#c6f6d5] text-[#22543d] border-[#9ae6b4]';
    }
    if (isIncorrect) {
      return 'bg-[#feb2b2] text-[#822727] border-[#f56565]';
    }
    if (isBlurred) {
      return 'bg-[#f8f9fc] border-[#c3ccda] text-[#a0aec5] opacity-50';
    }
    return 'bg-white border-[#c3ccda] text-[#1e242f] hover:border-[#6694ef]';
  };

  const getButtonContent = () => {
    const gap = size === 64 ? 'gap-2' : 'gap-1.5';

    switch (type) {
      case 'left_icon+text':
        return (
          <div className={`flex items-center ${gap}`}>
            {icon && <Icon type="line" name={icon} size={sizeConfig.iconSize} className={isSelected || isCorrect || isIncorrect ? 'text-current' : 'text-[#1e242f]'} />}
            {children && <span>{children}</span>}
          </div>
        );
      case 'right_icon+text':
        return (
          <div className={`flex items-center ${gap}`}>
            {children && <span>{children}</span>}
            {icon && <Icon type="line" name={icon} size={sizeConfig.iconSize} className={isSelected || isCorrect || isIncorrect ? 'text-current' : 'text-[#1e242f]'} />}
          </div>
        );
      case 'text_only':
      default:
        return children;
    }
  };

  return (
    <button
      className={`
        ${sizeConfig.height}
        ${sizeConfig.padding}
        ${sizeConfig.fontSize}
        border
        rounded-full
        font-semibold
        transition-all
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-[#6694ef] focus:ring-offset-2
        ${getStatusStyles()}
        ${className}
      `}
      disabled={isDisabled}
      onClick={onClick}
      data-size={size}
      data-type={type}
      data-status={status}
      data-testid={testId}
      {...props}
    >
      {getButtonContent()}
    </button>
  );
};

export default InputChip;
export type { InputChipProps, InputChipSize, InputChipType, InputChipStatus };

