/**
 * Input 컴포넌트
 * Figma 디자인 시스템의 입력 필드 컴포넌트
 */

import React, { useState } from 'react';
import type { InputProps, InputFill, InputType, InputStatus } from './Input.types';
import Icon from '../Icon';

const Input: React.FC<InputProps> = ({
  inputType = 'label+helper',
  status = 'default',
  label,
  helper,
  errorMessage,
  successMessage,
  button = false,
  labelButtonText,
  icon,
  showClearButton = false,
  onClear,
  className = '',
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(() => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.join('');
    return String(value);
  });
  
  const isDisabled = disabled || status === 'disabled';
  const isError = status === 'error';
  const isSuccess = status === 'success';
  const isFocusedState = status === 'focus' || isFocused;
  const isFilled = status === 'filled' || (() => {
    if (value === undefined || value === null) {
      return internalValue.length > 0;
    }
    if (typeof value === 'string') {
      return value.length > 0;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return String(value).length > 0;
  })();
  const showClear = showClearButton && isFilled && !isDisabled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } else {
      setInternalValue('');
    }
  };

  const getStatusStyles = (): string => {
    if (isDisabled) {
      return 'border-[#E0E0E0] bg-[#E0E0E0] text-neutral-medium cursor-not-allowed';
    }
    if (isError) {
      return 'border-[#D32F2F] bg-white text-neutral-dark focus:border-[#D32F2F]';
    }
    if (isSuccess) {
      return 'border-[#388E3C] bg-white text-neutral-dark focus:border-[#388E3C]';
    }
    if (isFocusedState || isFilled) {
      return 'border-[#1976D2] bg-white text-neutral-dark focus:border-[#1976D2] focus:outline-none';
    }
    return 'border-[#E0E0E0] bg-[#E0E0E0] text-neutral-dark placeholder-neutral-medium focus:border-[#1976D2] focus:bg-white focus:outline-none';
  };

  const getLabelStyles = (): string => {
    if (isError) {
      return 'text-[#D32F2F]';
    }
    return 'text-neutral-dark';
  };

  const baseInputClasses = `
    w-full
    px-4
    py-3
    border
    rounded-lg
    text-base
    font-medium
    transition-all
    duration-200
    ${getStatusStyles()}
    ${className}
  `;

  const message = isError ? errorMessage : isSuccess ? successMessage : helper;
  const showMessage = (inputType === 'label+helper' || inputType === 'helper_only') && message;
  const currentValue = value !== undefined ? value : internalValue;

  const getLabelButtonStyles = (): string => {
    if (isDisabled) {
      return 'bg-[#E0E0E0] text-neutral-medium';
    }
    if (isFilled || isFocusedState) {
      return 'bg-[#1976D2] text-white';
    }
    return 'bg-[#E0E0E0] text-neutral-medium';
  };

  // 패딩 계산: 아이콘, 클리어 버튼, 라벨 버튼에 따라 조정
  const getPaddingRight = (): string => {
    if (labelButtonText && showClear) return 'pr-28';
    if (labelButtonText) return 'pr-20';
    if (showClear) return 'pr-12';
    if (button) return 'pr-12';
    return '';
  };

  return (
    <div className="w-full" data-testid={props['data-testid']}>
      {inputType !== 'plain' && inputType !== 'helper_only' && label && (
        <label className={`block text-sm font-medium mb-2 ${getLabelStyles()}`}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            {icon}
          </div>
        )}
        <input
          {...props}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled}
          className={`${baseInputClasses} ${icon ? 'pl-12' : ''} ${getPaddingRight()}`}
          data-status={status}
          data-type={inputType}
        />
        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-[#E0E0E0] flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
            disabled={isDisabled}
            aria-label="Clear input"
          >
            <Icon type="line" name="close" size={16} className="text-neutral-dark" />
          </button>
        )}
        {labelButtonText && (
          <button
            type="button"
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${getLabelButtonStyles()} ${showClear ? 'right-20' : ''}`}
            disabled={isDisabled}
          >
            {labelButtonText}
          </button>
        )}
        {button && !labelButtonText && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:opacity-70"
            disabled={isDisabled}
          >
            <Icon type="line" name="arrow_forward" size={20} />
          </button>
        )}
      </div>
      {showMessage && (
        <div className={`mt-2 flex items-center gap-2 text-sm ${isError ? 'text-[#D32F2F]' : isSuccess ? 'text-[#388E3C]' : 'text-neutral-medium'}`}>
          {isError && (
            <Icon type="fill" name="error" size={16} className="text-[#D32F2F]" />
          )}
          {isSuccess && (
            <Icon type="fill" name="check_circle" size={16} className="text-[#388E3C]" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
export type { InputProps, InputFill, InputType, InputStatus };
