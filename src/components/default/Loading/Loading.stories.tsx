/**
 * Loading 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Design System/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: '로딩 스피너 크기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    size: 'm',
  },
};

export const Small: Story = {
  args: {
    size: 's',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
  },
};

export const Large: Story = {
  args: {
    size: 'l',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Loading size="s" />
        <span className="text-sm text-neutral-medium">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="m" />
        <span className="text-sm text-neutral-medium">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="l" />
        <span className="text-sm text-neutral-medium">Large</span>
      </div>
    </div>
  ),
};

