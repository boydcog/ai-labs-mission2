/**
 * Logo 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Design System/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: '로고 크기 (px)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 100,
  },
};

export const Medium: Story = {
  args: {
    size: 150,
  },
};

export const Large: Story = {
  args: {
    size: 210,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Logo size={100} />
        <span className="text-sm text-neutral-medium">100px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size={150} />
        <span className="text-sm text-neutral-medium">150px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size={210} />
        <span className="text-sm text-neutral-medium">210px (Default)</span>
      </div>
    </div>
  ),
};

