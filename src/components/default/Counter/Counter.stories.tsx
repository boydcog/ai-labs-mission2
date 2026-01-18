/**
 * Counter 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Counter from './Counter';
import type { CounterStatus } from './Counter.types';

const meta: Meta<typeof Counter> = {
  title: 'Components/Default/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 카운터 컴포넌트입니다. 숫자를 증가/감소시키는 컨트롤입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['plain', 'label_only'],
      description: '카운터 타입',
    },
    status: {
      control: 'select',
      options: ['default', 'disabled', 'error'],
      description: '카운터 상태',
    },
    label: {
      control: 'text',
      description: '레이블 텍스트 (type이 label_only일 때)',
    },
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: '카운터 값',
    },
    min: {
      control: 'number',
      description: '최소값',
    },
    max: {
      control: 'number',
      description: '최대값',
    },
    step: {
      control: 'number',
      description: '증감 단위',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

// 기본 스토리
export const Default: Story = {
  args: {
    type: 'plain',
    status: 'default',
    value: 0,
    min: 0,
    max: 100,
    step: 1,
  },
};

// Type 변형
export const Types: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <Counter type="plain" value={5} />
      <Counter type="label_only" label="Label" value={5} />
    </div>
  ),
};

// Status 변형
export const Statuses: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {([
        { status: 'default' as CounterStatus, label: 'Default' },
        { status: 'disabled' as CounterStatus, label: 'Disabled' },
        { status: 'error' as CounterStatus, label: 'Error' },
      ]).map(({ status, label }) => (
        <div key={status} className="space-y-2">
          <span className="text-sm font-medium">{label}</span>
          <Counter type="label_only" status={status} label={label} value={5} />
        </div>
      ))}
    </div>
  ),
};

