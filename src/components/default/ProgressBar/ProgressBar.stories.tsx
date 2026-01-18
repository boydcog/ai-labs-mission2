/**
 * ProgressBar 컴포넌트 Storybook 스토리
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ProgressBar from './ProgressBar';
import type { ProgressBarHeight } from './ProgressBar.types';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Default/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 진행률 바 컴포넌트입니다. 다양한 높이와 진행률 값을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'select',
      options: [16, 14, 12, 10, 8],
      description: '진행률 바 높이 (px)',
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
type Story = StoryObj<typeof ProgressBar>;

// 기본 스토리
export const Default: Story = {
  args: {
    height: 16,
    progress: 50,
  },
};

// Height 변형
export const Heights: Story = {
  render: () => (
    <div className="space-y-4 p-4 w-full max-w-md">
      {([16, 14, 12, 10, 8] as ProgressBarHeight[]).map((height) => (
        <div key={height} className="space-y-2">
          <span className="text-sm font-medium">{height}px height</span>
          <ProgressBar height={height} progress={60} />
        </div>
      ))}
    </div>
  ),
};

// Progress 변형
export const ProgressValues: Story = {
  render: () => (
    <div className="space-y-4 p-4 w-full max-w-md">
      {[0, 20, 40, 60, 80, 100].map((progress) => (
        <div key={progress} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{progress}%</span>
          </div>
          <ProgressBar height={16} progress={progress} />
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
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="space-y-4 p-4 w-full max-w-md">
        <ProgressBar height={16} progress={progress} />
        <p className="text-sm text-gray-600">Progress: {progress}%</p>
      </div>
    );
  },
};

