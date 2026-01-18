/**
 * Prompt 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Prompt from './Prompt';

const meta: Meta<typeof Prompt> = {
  title: 'Design System/Prompt',
  component: Prompt,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['small', 'default'],
      description: '프롬프트 타입',
    },
    contentType: {
      control: 'select',
      options: ['word', 'default'],
      description: '프롬프트 콘텐츠 타입',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    text: {
      control: 'text',
      description: '메인 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Prompt>;

export const Default: Story = {
  args: {
    type: 'default',
    contentType: 'default',
    label: '단어',
    text: 'word',
  },
};

export const SmallWord: Story = {
  args: {
    type: 'small',
    contentType: 'word',
    label: '단어',
    text: 'word',
  },
};

export const WithLabel: Story = {
  args: {
    label: '단어',
    text: 'example',
  },
};

export const WithoutLabel: Story = {
  args: {
    text: 'example',
  },
};

export const LongText: Story = {
  args: {
    label: '단어',
    text: 'Very Long Word Example',
  },
};

