/**
 * Topbar 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Topbar from './Topbar';
import type { TopbarType } from './Topbar.types';

const meta: Meta<typeof Topbar> = {
  title: 'Components/Default/Topbar',
  component: Topbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 상단 바 컴포넌트입니다. 다양한 타입을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'progress', 'logo', 'countdown', 'Variant5', 'Type6'],
      description: '상단 바 타입',
    },
    title: {
      control: 'text',
      description: '타이틀 텍스트',
    },
    progress: {
      control: { type: 'number', min: 0, max: 100, step: 5 },
      description: '진행률 (0-100, type이 progress일 때)',
    },
    countdown: {
      control: { type: 'number', min: 0, max: 60 },
      description: '카운트다운 값 (type이 countdown일 때)',
    },
    onBack: { action: 'back clicked' },
    onClose: { action: 'close clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

// 기본 스토리
export const Default: Story = {
  args: {
    type: 'default',
    title: 'Subtask',
    onBack: () => {},
    onClose: () => {},
  },
};

// Type 변형
export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      {([
        { type: 'default' as TopbarType, title: 'Subtask' },
        { type: 'progress' as TopbarType, progress: 75 },
        { type: 'logo' as TopbarType },
        { type: 'countdown' as TopbarType, countdown: 30 },
      ]).map(({ type, title, progress, countdown }) => (
        <div key={type} className="border-2 border-gray-300">
          <Topbar
            type={type}
            title={title}
            progress={progress}
            countdown={countdown}
            onBack={type !== 'logo' ? () => {} : undefined}
            onClose={type !== 'logo' ? () => {} : undefined}
          />
        </div>
      ))}
    </div>
  ),
};

// Progress 타입
export const ProgressType: Story = {
  render: () => (
    <div className="space-y-4">
      {[0, 25, 50, 75, 100].map((progress) => (
        <div key={progress} className="border-2 border-gray-300">
          <Topbar 
            type="progress" 
            progress={progress} 
            onBack={() => {}} 
            onClose={() => {}} 
          />
        </div>
      ))}
    </div>
  ),
};

