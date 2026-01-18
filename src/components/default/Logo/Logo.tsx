/**
 * Logo 컴포넌트
 * Figma 디자인 시스템의 로고 컴포넌트
 */

import React from 'react';
import type { LogoProps } from './Logo.types';

const Logo: React.FC<LogoProps> = ({
  className = '',
  size,
  'data-testid': testId,
}) => {
  const logoPath = new URL('../../assets/logo.svg', import.meta.url).href;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={size ? { width: size, height: size } : {}}
      data-testid={testId}
      data-name="logo"
    >
      <img
        src={logoPath}
        alt="Cogthera AI Logo"
        className="w-full h-full object-contain"
        style={size ? { width: size, height: size } : {}}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="210" height="48" viewBox="0 0 210 48"><text x="10" y="30" font-size="24" font-weight="bold" fill="#1a1a1a">Cogthera AI</text></svg>`)}`;
        }}
      />
    </div>
  );
};

export default Logo;
export type { LogoProps };

