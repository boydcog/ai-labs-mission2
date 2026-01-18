/**
 * ScoreBarChart Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import ScoreBarChart from './ScoreBarChart';

const meta: Meta<typeof ScoreBarChart> = {
  title: 'Default/ScoreBarChart',
  component: ScoreBarChart,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'white',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScoreBarChart>;

export const Default: Story = {
  args: {
    leftBar: {
      value: 5,
      label: '최근 3일 평균',
    },
    rightBar: {
      value: 8,
      label: '오늘 점수',
    },
    maxBarHeight: 200,
    gap: 24,
  },
};

export const EqualValues: Story = {
  args: {
    leftBar: {
      value: 6,
      label: '최근 3일 평균',
    },
    rightBar: {
      value: 6,
      label: '오늘 점수',
    },
    maxBarHeight: 200,
    gap: 24,
  },
};

export const LeftHigher: Story = {
  args: {
    leftBar: {
      value: 10,
      label: '최근 3일 평균',
    },
    rightBar: {
      value: 5,
      label: '오늘 점수',
    },
    maxBarHeight: 200,
    gap: 24,
  },
};
