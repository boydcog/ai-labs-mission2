/**
 * Icon 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon from './Icon';
import type { IconType, IconName } from './Icon.types';

const meta: Meta<typeof Icon> = {
  title: 'Components/Default/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 아이콘 컴포넌트입니다. 다양한 타입(line, fill, graphic)과 이름을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'fill', 'graphic'],
      description: '아이콘 타입',
    },
    name: {
      control: 'select',
      options: [
        'add', 'remove', 'close', 'undo', 'check',
        'arrow_back_ios', 'arrow-back-ios-new', 'arrow_forward_ios',
        'info', 'help', 'draw', 'ink-eraser', 'zoom-in',
        'check_box', 'check_circle', 'chevron_backward', 'chevron_forward',
        'arrow_forward', 'arrow_back', 'block', 'error',
        'backspace', 'cancel',
        'fire', 'attention', 'imagination', 'association', 'brain',
      ],
      description: '아이콘 이름',
    },
    size: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: '아이콘 크기 (px)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// 기본 스토리
export const Default: Story = {
  args: {
    type: 'line',
    name: 'add',
    size: 24,
  },
};

// Line 타입 아이콘들
export const LineIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-4">
      {(['add', 'remove', 'close', 'undo', 'check', 'arrow_back_ios', 'arrow_forward_ios', 'info', 'help', 'draw', 'ink-eraser', 'zoom-in'] as IconName[]).map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon type="line" name={name} size={32} />
          <span className="text-xs text-gray-600">{name}</span>
        </div>
      ))}
    </div>
  ),
};

// Fill 타입 아이콘들
export const FillIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-4">
      {(['check_box', 'check_circle', 'backspace', 'cancel', 'error'] as IconName[]).map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon type="fill" name={name} size={32} />
          <span className="text-xs text-gray-600">{name}</span>
        </div>
      ))}
    </div>
  ),
};

// Graphic 타입 아이콘들
export const GraphicIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-4">
      {(['fire', 'attention', 'imagination', 'association', 'brain'] as IconName[]).map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon type="graphic" name={name} size={32} />
          <span className="text-xs text-gray-600">{name}</span>
        </div>
      ))}
    </div>
  ),
};

// 크기 변형
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      {[16, 24, 32, 40, 48, 64].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon type="line" name="add" size={size} />
          <span className="text-xs text-gray-600">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

// 모든 타입 비교
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {(['line', 'fill', 'graphic'] as IconType[]).map((type) => (
        <div key={type} className="flex flex-col gap-2">
          <h3 className="text-lg font-bold capitalize">{type} Icons</h3>
          <div className="grid grid-cols-8 gap-4">
            {(['add', 'check', 'close'] as IconName[]).map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <Icon type={type} name={name} size={32} />
                <span className="text-xs text-gray-600">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

