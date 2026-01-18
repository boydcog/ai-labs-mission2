/**
 * Counter 컴포넌트
 * Figma 디자인 시스템의 카운터 컴포넌트
 */

/**
 * Counter 컴포넌트
 * Figma 디자인 시스템의 카운터 컴포넌트
 */

import React, { useState } from 'react';
import type { CounterProps, CounterType, CounterStatus } from './Counter.types';
import Icon from '../Icon';

const Counter: React.FC<CounterProps> = ({
  type = 'plain',
  status = 'default',
  label,
  value: controlledValue,
  min = 0,
  max = 999,
  step = 1,
  onChange,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(0);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isDisabled = status === 'disabled';
  const isError = status === 'error';

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const getStatusStyles = (): string => {
    if (isDisabled) {
      return 'border-[#e2e8f0] bg-[#f7fafc] text-[#a0aec0]';
    }
    if (isError) {
      return 'border-[#e53e3e] bg-[#f7fafc] text-[#2d3748]';
    }
    return 'border-[#ccdbfa] bg-white text-[#171923]';
  };

  const buttonBaseClasses = `
    w-10
    h-10
    border-0
    rounded-lg
    bg-[#2a69e9]
    flex items-center justify-center
    transition-all
    focus:outline-none
    ${isDisabled ? 'cursor-not-allowed bg-[#dbe1eb]' : 'cursor-pointer hover:opacity-90 active:opacity-80'}
  `;

  return (
    <div className={`w-full ${className}`} data-testid={testId}>
      {type === 'label_only' && label && (
        <label className="block text-lg font-medium text-[#4a5568] mb-2 tracking-[-0.18px]">
          {label}
        </label>
      )}
      <div className={`
        flex items-center gap-1
        h-14
        px-3
        py-2
        border-2
        rounded-xl
        ${getStatusStyles()}
      `}>
        <button
          type="button"
          className={buttonBaseClasses}
          onClick={handleDecrement}
          disabled={isDisabled || value <= min}
        >
          <Icon type="line" name="remove" size={24} className="text-white" />
        </button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          readOnly
          className={`
            flex-1
            h-full
            px-0
            border-0
            bg-transparent
            text-center
            font-medium
            text-[26px]
            tracking-[-0.26px]
            focus:outline-none
            ${isDisabled ? 'text-[#a0aec0]' : isError ? 'text-[#2d3748]' : 'text-[#171923]'}
          `}
          disabled={isDisabled}
          {...props}
        />
        <button
          type="button"
          className={buttonBaseClasses}
          onClick={handleIncrement}
          disabled={isDisabled || value >= max}
        >
          <Icon type="line" name="add" size={24} className="text-white" />
        </button>
      </div>
      {type === 'label_only' && isError && (
        <div className="flex items-center gap-1 mt-2">
          <Icon type="line" name="error" size={18} />
          <p className="text-base font-medium text-[#e53e3e] tracking-[-0.16px]">Error Message</p>
        </div>
      )}
    </div>
  );
};

export default Counter;
export type { CounterProps, CounterType, CounterStatus };

