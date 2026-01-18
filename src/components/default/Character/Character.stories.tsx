/**
 * Character 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Character from './Character';

const meta: Meta<typeof Character> = {
  title: 'Design System/Character',
  component: Character,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['thumbnail', 'full_shot', 'bust_shot'],
      description: '캐릭터 variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Character>;

export const Thumbnail: Story = {
  args: {
    variant: 'thumbnail',
  },
};

export const FullShot: Story = {
  args: {
    variant: 'full_shot',
  },
};

export const BustShot: Story = {
  args: {
    variant: 'bust_shot',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Character variant="thumbnail" />
        <span className="text-sm text-neutral-medium">Thumbnail (272x272)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Character variant="bust_shot" />
        <span className="text-sm text-neutral-medium">Bust Shot (372x272)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Character variant="full_shot" />
        <span className="text-sm text-neutral-medium">Full Shot (372x372)</span>
      </div>
    </div>
  ),
};

