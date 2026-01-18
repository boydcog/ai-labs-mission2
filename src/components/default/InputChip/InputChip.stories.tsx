/**
 * InputChip 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import InputChip from './InputChip';
import type { InputChipSize, InputChipType, InputChipStatus } from './InputChip.types';

const meta: Meta<typeof InputChip> = {
  title: 'Components/Default/InputChip',
  component: InputChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 입력 칩 컴포넌트입니다. 다양한 크기, 타입, 상태를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [64, 56],
      description: '칩 크기 (px)',
    },
    type: {
      control: 'select',
      options: ['text_only', 'left_icon+text', 'right_icon+text'],
      description: '칩 타입',
    },
    status: {
      control: 'select',
      options: ['default', 'disabled', 'selected', 'blurred', 'correct', 'incorrect'],
      description: '칩 상태',
    },
    icon: {
      control: 'select',
      options: ['add', 'check', 'close'],
      description: '아이콘 이름',
    },
    children: {
      control: 'text',
      description: '칩 텍스트',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof InputChip>;

// 기본 스토리
export const Default: Story = {
  args: {
    size: 64,
    type: 'text_only',
    status: 'default',
    children: 'Chip',
  },
};

// Size 변형
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      {([64, 56] as InputChipSize[]).map((size) => (
        <InputChip key={size} size={size} type="text_only">
          {size}px
        </InputChip>
      ))}
    </div>
  ),
};

// Type 변형
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {([
        { type: 'text_only' as InputChipType, label: 'Text Only' },
        { type: 'left_icon+text' as InputChipType, label: 'Left Icon + Text', icon: 'add' as const },
        { type: 'right_icon+text' as InputChipType, label: 'Right Icon + Text', icon: 'close' as const },
      ]).map(({ type, label, icon }) => (
        <InputChip key={type} size={64} type={type} icon={icon}>
          {label}
        </InputChip>
      ))}
    </div>
  ),
};

// Status 변형
export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {([
        { status: 'default' as InputChipStatus, label: 'Default' },
        { status: 'disabled' as InputChipStatus, label: 'Disabled' },
        { status: 'selected' as InputChipStatus, label: 'Selected' },
        { status: 'blurred' as InputChipStatus, label: 'Blurred' },
        { status: 'correct' as InputChipStatus, label: 'Correct' },
        { status: 'incorrect' as InputChipStatus, label: 'Incorrect' },
      ]).map(({ status, label }) => (
        <InputChip key={status} size={64} type="text_only" status={status}>
          {label}
        </InputChip>
      ))}
    </div>
  ),
};

