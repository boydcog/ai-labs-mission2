/**
 * Loading 컴포넌트
 * Figma 디자인 시스템의 로딩 스피너 컴포넌트
 */

import React from 'react';
import type { LoadingProps, LoadingSize } from './Loading.types';

const Loading: React.FC<LoadingProps> = ({
  size = 'm',
  className = '',
  'data-testid': testId,
}) => {
  const sizeConfig: Record<LoadingSize, { container: string; spinner: string }> = {
    s: {
      container: 'w-8 h-8',
      spinner: 'w-8 h-8 border-2',
    },
    m: {
      container: 'w-12 h-12',
      spinner: 'w-12 h-12 border-3',
    },
    l: {
      container: 'w-16 h-16',
      spinner: 'w-16 h-16 border-4',
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      data-testid={testId}
      data-name="system/loading"
    >
      <div className={`${config.container} relative`}>
        {/* 외부 원형 효과 */}
        <div
          className={`${config.spinner} border-primary border-t-transparent rounded-full animate-spin absolute inset-0`}
          style={{ animationDuration: '1s' }}
        />
        {/* 내부 원형 효과 */}
        <div
          className={`${config.spinner} border-secondary border-t-transparent rounded-full animate-spin absolute inset-0 opacity-50`}
          style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}
        />
      </div>
    </div>
  );
};

export default Loading;
export type { LoadingProps, LoadingSize };

