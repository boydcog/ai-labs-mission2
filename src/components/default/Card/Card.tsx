/**
 * Card 컴포넌트
 * Figma 디자인 시스템의 카드 컴포넌트
 */

import React from 'react';
import type { CardProps, CardType } from './Card.types';
import { ListItem } from '../List';

const Card: React.FC<CardProps> = ({
  type = 'default',
  items = [],
  className = '',
  children,
  'data-testid': testId,
}) => {
  const typeStyles: Record<CardType, string> = {
    training: 'bg-neutral-light',
    default: 'bg-white border-2 border-black',
  };

  const baseClasses = `
    flex flex-col
    gap-5
    p-5
    rounded-2xl
    w-[320px]
    ${typeStyles[type]}
    ${className}
  `;

  return (
    <div
      className={baseClasses.trim()}
      data-testid={testId}
      data-name={`card/${type}`}
    >
      {children || (
        <>
          {items.map((item, index) => (
            <ListItem
              key={index}
              {...item}
              data-testid={`${testId}-item-${index}`}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Card;
export type { CardProps, CardType };

