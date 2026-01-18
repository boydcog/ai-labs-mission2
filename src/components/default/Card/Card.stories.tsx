/**
 * Card 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['training', 'default'],
      description: '카드 타입',
    },
    items: {
      control: 'object',
      description: '카드 내부 리스트 아이템들',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Training: Story = {
  args: {
    type: 'training',
    items: [
      {
        icon: 'attention',
        label: '집중하기',
        subtitle: 'Subtask',
      },
      {
        icon: 'imagination',
        label: '연상하기',
        subtitle: 'Subtask',
      },
      {
        icon: 'association',
        label: '연합하기',
        subtitle: 'Subtask',
      },
    ],
  },
};

export const Default: Story = {
  args: {
    type: 'default',
    items: [
      {
        icon: 'check_box',
        label: 'Task 1',
        subtitle: 'Subtask 1',
      },
      {
        icon: 'check_circle',
        label: 'Task 2',
        subtitle: 'Subtask 2',
      },
    ],
  },
};

export const WithCustomContent: Story = {
  args: {
    type: 'training',
    children: (
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">Custom Card Content</h3>
        <p className="text-neutral-medium">This card contains custom content instead of list items.</p>
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    type: 'training',
    items: [],
  },
};

