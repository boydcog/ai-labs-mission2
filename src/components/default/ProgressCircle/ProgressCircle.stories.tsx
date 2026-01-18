/**
 * ProgressCircle 컴포넌트 Storybook 스토리
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ProgressCircle from './ProgressCircle';
import type { ProgressCircleSize } from './ProgressCircle.types';

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/Default/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 원형 진행률 컴포넌트입니다. 다양한 크기와 진행률 값을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: '원형 진행률 크기',
    },
    progress: {
      control: { type: 'number', min: 0, max: 100, step: 5 },
      description: '진행률 (0-100)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

// 기본 스토리
export const Default: Story = {
  args: {
    size: 'm',
    progress: 50,
  },
};

// Size 변형
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-4">
      {(['s', 'm', 'l'] as ProgressCircleSize[]).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <ProgressCircle size={size} progress={60} />
          <span className="text-sm font-medium capitalize">{size} size</span>
        </div>
      ))}
    </div>
  ),
};

// Progress 변형
export const ProgressValues: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-4">
      {[0, 25, 50, 75, 100].map((progress) => (
        <div key={progress} className="flex flex-col items-center gap-2">
          <ProgressCircle size="m" progress={progress} />
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      ))}
    </div>
  ),
};

// 애니메이션 데모
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 200);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <ProgressCircle size="l" progress={progress} />
        <p className="text-sm text-gray-600">Progress: {progress}%</p>
      </div>
    );
  },
};

