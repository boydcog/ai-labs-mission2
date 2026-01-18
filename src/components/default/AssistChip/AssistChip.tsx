/**
 * AssistChip 컴포넌트
 * Figma 디자인 시스템의 보조 칩 컴포넌트
 */

import React from 'react';
import type { AssistChipProps, AssistChipStatus } from './AssistChip.types';
import Icon from '../Icon';

const AssistChip: React.FC<AssistChipProps> = ({
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

  const getStatusStyles = (): string => {
    if (isDisabled) {
      return 'bg-[#f8f9fc] border-[#c3ccda] text-[#a0aec5] cursor-not-allowed opacity-60';
    }
    if (isSelected) {
      return 'bg-white border-[#6694ef] text-[#1e242f]';
    }
    return 'bg-[#f8f9fc] border-[#c3ccda] text-[#1e242f] hover:bg-white';
  };

  return (
    <button
      className={`
        h-12
        px-4
        py-2
        border
        rounded-xl
        text-sm
        font-semibold
        transition-all
        flex items-center gap-2
        focus:outline-none focus:ring-2 focus:ring-[#6694ef] focus:ring-offset-2
        ${getStatusStyles()}
        ${className}
      `}
      disabled={isDisabled}
      onClick={onClick}
      data-status={status}
      data-testid={testId}
      {...props}
    >
      {icon && (
        <div className="w-6 h-6 rounded-full bg-[#1e242f] flex items-center justify-center flex-shrink-0">
          <Icon type="line" name={icon} size={16} className="text-white" />
        </div>
      )}
      {children && <span>{children}</span>}
    </button>
  );
};

export default AssistChip;
export type { AssistChipProps, AssistChipStatus };

