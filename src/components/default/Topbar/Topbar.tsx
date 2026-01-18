/**
 * Topbar 컴포넌트
 * Figma 디자인 시스템의 상단 바 컴포넌트
 */

import React from 'react';
import type { TopbarProps, TopbarType } from './Topbar.types';
import Icon from '../Icon';
import ProgressBar from '../ProgressBar';

const Topbar: React.FC<TopbarProps> = ({
  type = 'default',
  title,
  progress = 0,
  countdown = 0,
  onBack,
  onClose,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const baseClasses = `
    w-full
    h-16
    px-4
    bg-white
    flex items-center justify-center
    relative
    ${className}
  `;

  const renderContent = () => {
    switch (type) {
      case 'progress':
        return (
          <>
            {onBack && (
              <button
                onClick={onBack}
                className="absolute left-4 p-2 hover:opacity-70 transition-opacity"
                aria-label="Go back"
              >
                <Icon type="line" name="arrow_back_ios" size={24} />
              </button>
            )}
            <div className="flex-1 max-w-md">
              <ProgressBar height={14} progress={progress} />
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="absolute right-4 p-2 hover:opacity-70 transition-opacity"
                aria-label="Close"
              >
                <Icon type="line" name="close" size={24} />
              </button>
            )}
          </>
        );
      case 'logo':
        return (
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Logo</span>
          </div>
        );
      case 'countdown':
        return (
          <>
            {onBack && (
              <button
                onClick={onBack}
                className="absolute left-4 p-2 hover:opacity-70 transition-opacity"
                aria-label="Go back"
              >
                <Icon type="line" name="arrow_back_ios" size={24} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{countdown}</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="absolute right-4 p-2 hover:opacity-70 transition-opacity"
                aria-label="Close"
              >
                <Icon type="line" name="close" size={24} />
              </button>
            )}
          </>
        );
      case 'default':
      case 'Variant5':
      case 'Type6':
      default:
        return (
          <>
            {onBack && (
              <button
                onClick={onBack}
                className="absolute left-4 p-2 hover:opacity-70 transition-opacity"
                aria-label="Go back"
              >
                <Icon type="line" name="arrow_back_ios" size={24} />
              </button>
            )}
            {title && (
              <span className="text-lg font-medium text-[#1e242f]">{title}</span>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute right-4 p-2 hover:opacity-70 transition-opacity"
                aria-label="Close"
              >
                <Icon type="line" name="close" size={24} />
              </button>
            )}
          </>
        );
    }
  };

  return (
    <header
      className={baseClasses}
      data-type={type}
      data-testid={testId}
      {...props}
    >
      {renderContent()}
    </header>
  );
};

export default Topbar;
export type { TopbarProps, TopbarType };

