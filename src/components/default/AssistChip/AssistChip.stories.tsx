/**
 * AssistChip 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import AssistChip from './AssistChip';
import type { AssistChipStatus } from './AssistChip.types';

const meta: Meta<typeof AssistChip> = {
  title: 'Components/Default/AssistChip',
  component: AssistChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 보조 칩 컴포넌트입니다. 기본, 비활성화, 선택 상태를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'disabled', 'selected'],
      description: '칩 상태',
    },
    icon: {
      control: 'select',
      options: ['add', 'check', 'close', 'info'],
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
type Story = StoryObj<typeof AssistChip>;

// 기본 스토리
export const Default: Story = {
  args: {
    status: 'default',
    children: 'Assist Chip',
  },
};

// Status 변형
export const Statuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        {([
          { status: 'default' as AssistChipStatus, label: 'Default' },
          { status: 'disabled' as AssistChipStatus, label: 'Disabled' },
          { status: 'selected' as AssistChipStatus, label: 'Selected' },
        ]).map(({ status, label }) => (
          <AssistChip key={status} status={status}>
            {label}
          </AssistChip>
        ))}
      </div>
      <div className="flex gap-4">
        {([
          { status: 'default' as AssistChipStatus, label: 'Label', icon: 'add' as const },
          { status: 'disabled' as AssistChipStatus, label: 'Label', icon: 'add' as const },
          { status: 'selected' as AssistChipStatus, label: 'Label', icon: 'add' as const },
        ]).map(({ status, label, icon }) => (
          <AssistChip key={`${status}-icon`} status={status} icon={icon}>
            {label}
          </AssistChip>
        ))}
      </div>
    </div>
  ),
};

