/**
 * Button 컴포넌트
 * Figma 디자인 시스템의 버튼 컴포넌트
 */

import React from 'react';
import type { ButtonProps, ButtonHierarchy, ButtonHeight, ButtonType, ButtonStatus } from './Button.types';
import Icon from '../Icon';

const Button: React.FC<ButtonProps> = ({
  hierarchy = 'primary',
  height = 64,
  type: buttonType = 'text_only',
  status = 'default',
  icon,
  children,
  className = '',
  disabled,
  onClick,
  buttonType: htmlButtonType = 'button',
  ...props
}) => {
  const isDisabled = disabled || status === 'disabled';
  const isSelected = status === 'selected';
  const isDestructive = status === 'destructive';

  // Height별 클래스
  const heightClasses: Record<ButtonHeight, string> = {
    64: 'h-16',
    60: 'h-[60px]',
    48: 'h-12',
    40: 'h-10',
  };

  // Hierarchy별 배경색 및 텍스트 색상 (Figma 디자인 기준 - 변수 정의 반영)
  const hierarchyStyles: Record<ButtonHierarchy, { bg: string; text: string; border: string; hover: string; active: string; disabled: string }> = {
    primary: {
      bg: 'bg-[#2a69e9]', // color/surface/primary_n
      text: 'text-[#ffffff]', // color/text/on_primary
      border: 'border-[#2a69e9]', // color/stroke/primary_n
      hover: 'hover:bg-[#1657da]', // color/text/primary_0
      active: 'active:bg-[#1657da]', // color/text/primary_0
      disabled: 'bg-[#dbe1eb] border-[#dbe1eb] text-[#a0aec5]', // color/surface/neutral_a 2, color/text/neutral_4 2
    },
    secondary: {
      bg: 'bg-[#f1f4fd]', // color/surface/primary_lighter
      text: 'text-[#2a69e9]', // color/text/primary_1
      border: 'border-[#f1f4fd]', // color/surface/primary_lighter
      hover: 'hover:bg-[#dee8fc] hover:border-[#2a69e9] hover:text-[#1657da]', // color/surface/primary_light, color/stroke/primary_n, color/text/primary_0
      active: 'active:bg-[#dee8fc] active:border-[#2a69e9] active:text-[#1657da]',
      disabled: 'bg-[#dbe1eb] border-[#dbe1eb] text-[#a0aec5]', // color/surface/neutral_a 2, color/text/neutral_4 2
    },
    tertiary: {
      bg: 'bg-[#ffffff]', // color/surface/neutral_b 2
      text: 'text-[#323d4e]', // color/text/neutral_2
      border: 'border-[#c3ccda]', // color/stroke/neutral_a 2
      hover: 'hover:bg-[#f7fafc] hover:border-[#2a69e9] hover:text-[#323d4e]', // color/bg/neutral1, color/stroke/primary_n
      active: 'active:bg-[#f7fafc] active:border-[#2a69e9] active:text-[#323d4e]',
      disabled: 'bg-[#ffffff] border-[#dbe1eb] text-[#a0aec5]', // color/surface/neutral_b 2, color/stroke/neutral_a, color/text/neutral_4 2
    },
    quaternary: {
      bg: 'bg-transparent',
      text: 'text-[#5b708f]', // color/text/neutral_3
      border: 'border-transparent',
      hover: 'hover:bg-[#f7fafc] hover:text-[#1657da]', // color/bg/neutral1, color/text/primary_0
      active: 'active:bg-[#f7fafc] active:text-[#1657da]',
      disabled: 'bg-transparent text-[#a0aec5]', // color/text/neutral_4 2
    },
  };

  // Status별 스타일 조정 (Figma 디자인 기준)
  const getStatusStyles = (): string => {
    if (isDisabled) {
      return hierarchyStyles[hierarchy].disabled;
    }
    if (isDestructive) {
      if (hierarchy === 'primary') {
        return 'bg-[#f4456b] border-[#f4456b] text-[#ffffff] hover:bg-[#e03d5f] active:bg-[#e03d5f]'; // color/text/error_a 2, color/text/on_primary
      }
      if (hierarchy === 'secondary') {
        return 'bg-[#ffd6df] border-[#ffd6df] text-[#91122e] hover:bg-[#ffc2d0] active:bg-[#ffc2d0]'; // color/surface/error_a, color/text/error_1
      }
      if (hierarchy === 'tertiary') {
        return `${hierarchyStyles[hierarchy].bg} ${hierarchyStyles[hierarchy].border} text-[#f4456b] hover:border-[#f4456b]`; // color/text/error_a 2
      }
      return `${hierarchyStyles[hierarchy].bg} ${hierarchyStyles[hierarchy].text}`;
    }
    if (isSelected) {
      if (hierarchy === 'secondary') {
        return 'bg-[#dee8fc] border-[#2a69e9] text-[#1657da]'; // color/surface/primary_light, color/stroke/primary_n, color/text/primary_0
      }
      if (hierarchy === 'tertiary') {
        return 'bg-[#ffffff] border-[#2a69e9] text-[#323d4e]'; // color/surface/neutral_b 2, color/stroke/primary_n, color/text/neutral_2
      }
      return `${hierarchyStyles[hierarchy].bg} ${hierarchyStyles[hierarchy].text}`;
    }
    return `${hierarchyStyles[hierarchy].bg} ${hierarchyStyles[hierarchy].border} ${hierarchyStyles[hierarchy].text} ${!isDisabled ? hierarchyStyles[hierarchy].hover : ''} ${!isDisabled ? hierarchyStyles[hierarchy].active : ''}`;
  };

  // Type별 레이아웃 (Figma 디자인 기준 - gap 변수 반영)
  const getButtonContent = () => {
    // Figma 변수: gap/gap-2xs (8px), gap/gap-3xs (4px)
    const iconSize = height === 64 ? 24 : height === 60 ? 22 : height === 48 ? 20 : 20; // Figma fontSize 기준 조정
    const gap = height === 64 ? 8 : height === 60 ? 8 : height === 48 ? 4 : 4; // gap/gap-2xs (8px), gap/gap-3xs (4px)

    switch (buttonType) {
      case 'icon_only':
        return icon ? <Icon type="line" name={icon} size={iconSize} /> : null;
      case 'icon_only_circle':
        return icon ? (
          <div className="rounded-full bg-neutral-dark/10 p-2">
            <Icon type="line" name={icon} size={iconSize - 8} />
          </div>
        ) : null;
      case 'left_icon+text':
        return (
          <>
            {icon && <Icon type="line" name={icon} size={iconSize} />}
            {children && <span className="ml-0" style={{ marginLeft: icon ? `${gap}px` : 0 }}>{children}</span>}
          </>
        );
      case 'right_icon+text':
        return (
          <>
            {children && <span>{children}</span>}
            {icon && <span className="inline-flex" style={{ marginLeft: `${gap}px` }}><Icon type="line" name={icon} size={iconSize} /></span>}
          </>
        );
      case 'text_only':
      default:
        return children;
    }
  };

  // Height별 padding 및 텍스트 크기 조정 (Figma 디자인 기준 - 변수 반영)
  const paddingClasses: Record<ButtonHeight, string> = {
    64: 'px-6', // 24px (gap/gap-l)
    60: 'px-5', // 20px (gap/gap-m)
    48: 'px-4', // 16px (gap/gap-s)
    40: 'px-4', // 16px (gap/gap-s)
  };

  const fontSizeClasses: Record<ButtonHeight, string> = {
    64: 'text-[24px]', // fontSize/fontSize150 (24px)
    60: 'text-[22px]', // fontSize/fontSize140 (22px)
    48: 'text-[18px]', // fontSize/fontSize120 (18px)
    40: 'text-[16px]', // fontSize/fontSize110 (16px)
  };

  const lineHeightClasses: Record<ButtonHeight, string> = {
    64: 'leading-[38px]', // lineHeight/lineHeight150 (38px)
    60: 'leading-[34px]', // lineHeight/lineHeight130 (34px)
    48: 'leading-[28px]', // lineHeight/lineHeight110 (28px)
    40: 'leading-[26px]', // lineHeight/lineHeight100 (26px)
  };

  const baseClasses = `
    ${heightClasses[height]}
    ${buttonType.includes('icon_only') ? 'aspect-square p-0' : paddingClasses[height]}
    rounded-lg
    border-2
    ${buttonType.includes('icon_only') ? '' : `${fontSizeClasses[height]} ${lineHeightClasses[height]}`}
    font-semibold
    transition-all
    flex items-center justify-center
    gap-2
    ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    focus:outline-none
    font-sans
    tracking-normal
  `;

  return (
    <button
      type={htmlButtonType}
      className={`${baseClasses} ${getStatusStyles()} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      data-hierarchy={hierarchy}
      data-height={height}
      data-type={buttonType}
      data-status={status}
      {...props}
    >
      {getButtonContent()}
    </button>
  );
};

export default Button;
export type { ButtonProps, ButtonHierarchy, ButtonHeight, ButtonType, ButtonStatus };

