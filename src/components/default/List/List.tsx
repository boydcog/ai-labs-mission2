/**
 * List 컴포넌트
 * Figma 디자인 시스템의 리스트 아이템 컴포넌트
 */

import React from 'react';
import type { ListItemProps, ListProps } from './List.types';
import Icon from '../Icon';

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  label,
  subtitle,
  className = '',
  onClick,
  'data-testid': testId,
}) => {
  const baseClasses = `
    flex
    items-center
    gap-3
    relative
    ${onClick ? 'cursor-pointer hover:opacity-70' : ''}
    ${className}
  `;

  return (
    <div
      className={baseClasses.trim()}
      onClick={onClick}
      data-testid={testId}
      data-name="list/task"
    >
      {icon && (
        <div className="shrink-0 w-12 h-12 flex items-center justify-center">
          <Icon type="line" name={icon} size={48} />
        </div>
      )}
      <div className="flex flex-col gap-0 items-start relative shrink-0 flex-1">
        {label && (
          <p className="font-semibold leading-[26px] text-base text-neutral-medium w-full">
            {label}
          </p>
        )}
        {subtitle && (
          <p className="font-semibold leading-[1.5] text-xl text-neutral-dark tracking-[-0.4px] whitespace-pre">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const List: React.FC<ListProps> = ({
  items = [],
  className = '',
  'data-testid': testId,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-0 ${className}`}
      data-testid={testId}
    >
      {items.map((item, index) => (
        <ListItem
          key={index}
          {...item}
          data-testid={item['data-testid'] || `${testId}-item-${index}`}
        />
      ))}
    </div>
  );
};

export default List;
export type { ListItemProps, ListProps };

