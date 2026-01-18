/**
 * Button 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import type { ButtonHierarchy, ButtonHeight, ButtonType, ButtonStatus } from './Button.types';

const meta: Meta<typeof Button> = {
  title: 'Components/Default/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 버튼 컴포넌트입니다. 다양한 hierarchy, height, type, status variant를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hierarchy: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary'],
      description: '버튼의 계층 구조',
    },
    height: {
      control: 'select',
      options: [64, 60, 48, 40],
      description: '버튼 높이 (px)',
    },
    type: {
      control: 'select',
      options: ['text_only', 'left_icon+text', 'right_icon+text', 'icon_only', 'icon_only_circle'],
      description: '버튼 타입',
    },
    status: {
      control: 'select',
      options: ['default', 'disabled', 'selected', 'destructive'],
      description: '버튼 상태',
    },
    icon: {
      control: 'select',
      options: ['add', 'check', 'close', 'arrow_forward', 'arrow_back'],
      description: '아이콘 이름 (type이 icon 포함일 때 필수)',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 스토리
export const Default: Story = {
  args: {
    hierarchy: 'primary',
    height: 64,
    type: 'text_only',
    status: 'default',
    children: 'Button',
  },
};

// Hierarchy 변형
export const Hierarchies: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {(['primary', 'secondary', 'tertiary', 'quaternary'] as ButtonHierarchy[]).map((hierarchy) => (
        <Button key={hierarchy} hierarchy={hierarchy} height={64} type="text_only">
          {hierarchy.charAt(0).toUpperCase() + hierarchy.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

// Height 변형
export const Heights: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-4">
      {([64, 60, 48, 40] as ButtonHeight[]).map((height) => (
        <Button key={height} hierarchy="primary" height={height} type="text_only">
          {height}px
        </Button>
      ))}
    </div>
  ),
};

// Type 변형
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {([
        { type: 'text_only' as ButtonType, label: 'Text Only' },
        { type: 'left_icon+text' as ButtonType, label: 'Left Icon + Text', icon: 'arrow_back' as const },
        { type: 'right_icon+text' as ButtonType, label: 'Right Icon + Text', icon: 'arrow_forward' as const },
        { type: 'icon_only' as ButtonType, label: 'Icon Only', icon: 'check' as const },
        { type: 'icon_only_circle' as ButtonType, label: 'Icon Only Circle', icon: 'add' as const },
      ]).map(({ type, label, icon }) => (
        <Button key={type} hierarchy="primary" height={64} type={type} icon={icon}>
          {label}
        </Button>
      ))}
    </div>
  ),
};

// Status 변형
export const Statuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {([
        { status: 'default' as ButtonStatus, label: 'Default' },
        { status: 'disabled' as ButtonStatus, label: 'Disabled' },
        { status: 'selected' as ButtonStatus, label: 'Selected' },
        { status: 'destructive' as ButtonStatus, label: 'Destructive' },
      ]).map(({ status, label }) => (
        <Button key={status} hierarchy="primary" height={64} type="text_only" status={status}>
          {label}
        </Button>
      ))}
    </div>
  ),
};

// 모든 조합 예시
export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {(['primary', 'secondary', 'tertiary', 'quaternary'] as ButtonHierarchy[]).map((hierarchy) => (
        <div key={hierarchy} className="space-y-4">
          <h3 className="text-lg font-bold capitalize">{hierarchy} Hierarchy</h3>
          <div className="grid grid-cols-4 gap-4">
            {([
              { type: 'text_only' as ButtonType, label: 'Text' },
              { type: 'left_icon+text' as ButtonType, label: 'Icon L', icon: 'arrow_back' as const },
              { type: 'right_icon+text' as ButtonType, label: 'Icon R', icon: 'arrow_forward' as const },
              { type: 'icon_only' as ButtonType, label: 'Icon', icon: 'check' as const },
            ]).map(({ type, label, icon }) => (
              <Button
                key={type}
                hierarchy={hierarchy}
                height={48}
                type={type}
                icon={icon}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Interactive 버튼
export const Interactive: Story = {
  args: {
    hierarchy: 'primary',
    height: 64,
    type: 'text_only',
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
};

