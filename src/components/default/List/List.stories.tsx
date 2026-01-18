/**
 * List 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import List, { ListItem } from './List';

const meta: Meta<typeof List> = {
  title: 'Design System/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '리스트 아이템 배열',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    items: [
      {
        icon: 'check_box',
        label: 'Task',
        subtitle: 'Subtask',
      },
    ],
  },
};

export const MultipleItems: Story = {
  args: {
    items: [
      {
        icon: 'check_box',
        label: '집중하기',
        subtitle: 'Subtask',
      },
      {
        icon: 'check_circle',
        label: '연상하기',
        subtitle: 'Subtask',
      },
      {
        icon: 'arrow_forward',
        label: '연합하기',
        subtitle: 'Subtask',
      },
    ],
  },
};

export const WithoutIcon: Story = {
  args: {
    items: [
      {
        label: 'Task',
        subtitle: 'Subtask without icon',
      },
    ],
  },
};

export const SingleItem: Story = {
  render: () => (
    <ListItem
      icon="check_box"
      label="Task"
      subtitle="Subtask"
    />
  ),
};

export const ClickableItem: Story = {
  render: () => (
    <ListItem
      icon="check_box"
      label="Clickable Task"
      subtitle="Click me!"
      onClick={() => alert('Clicked!')}
    />
  ),
};

