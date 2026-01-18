/**
 * QuizButton 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizButton from './QuizButton';
import type { QuizButtonHeight, QuizButtonStatus } from './QuizButton.types';

const meta: Meta<typeof QuizButton> = {
  title: 'Components/Default/QuizButton',
  component: QuizButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 퀴즈 버튼 컴포넌트입니다. 다양한 높이와 상태를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'select',
      options: [256, 64, 60, 56],
      description: '버튼 높이 (px)',
    },
    status: {
      control: 'select',
      options: ['default', 'selected', 'correct', 'incorrect'],
      description: '버튼 상태',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
    progress: {
      control: { type: 'number', min: 0, max: 100, step: 5 },
      description: '진행률 (0-100, height가 256일 때만 표시)',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof QuizButton>;

// 기본 스토리
export const Default: Story = {
  args: {
    height: 256,
    status: 'default',
    children: 'Word',
  },
};

// 진행률 표시줄이 있는 큰 버튼
export const WithProgress: Story = {
  args: {
    height: 256,
    status: 'default',
    children: 'Word',
    progress: 40,
  },
};

// 다양한 진행률 예제
export const ProgressExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {[0, 25, 50, 75, 100].map((progress) => (
        <div key={progress} className="flex flex-col items-center gap-2">
          <QuizButton height={256} status="default" progress={progress}>
            Word
          </QuizButton>
          <span className="text-sm font-medium">Progress: {progress}%</span>
        </div>
      ))}
    </div>
  ),
};

// 진행률과 상태 조합 예제
export const ProgressWithStatuses: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      {([
        { status: 'default' as QuizButtonStatus, progress: 40 },
        { status: 'default' as QuizButtonStatus, progress: 80 },
        { status: 'correct' as QuizButtonStatus, progress: 100 },
        { status: 'incorrect' as QuizButtonStatus, progress: 60 },
      ]).map(({ status, progress }) => (
        <div key={`${status}-${progress}`} className="flex flex-col items-center gap-2">
          <QuizButton height={256} status={status} progress={progress}>
            Word
          </QuizButton>
          <span className="text-sm font-medium">
            {status} - {progress}%
          </span>
        </div>
      ))}
    </div>
  ),
};

// Height 변형
export const Heights: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-4">
      {([256, 64, 60, 56] as QuizButtonHeight[]).map((height) => (
        <div key={height} className="flex flex-col items-center gap-2">
          <QuizButton height={height} status="default">
            {height}
          </QuizButton>
          <span className="text-xs text-gray-600">{height}px</span>
        </div>
      ))}
    </div>
  ),
};

// Status 변형 (큰 버튼) - Figma 디자인과 동일한 레이아웃
export const Statuses: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      {([
        { status: 'default' as QuizButtonStatus, label: 'Word', progress: 40 },
        { status: 'default' as QuizButtonStatus, label: 'Word' },
        { status: 'correct' as QuizButtonStatus, label: 'Word' },
        { status: 'incorrect' as QuizButtonStatus, label: 'Word' },
      ]).map(({ status, label, progress }) => (
        <div key={`${status}-${progress || 'no-progress'}`} className="flex flex-col items-center gap-2">
          <QuizButton height={256} status={status} progress={progress}>
            {label}
          </QuizButton>
          <span className="text-sm font-medium">
            {status} {progress !== undefined ? `(progress: ${progress}%)` : ''}
          </span>
        </div>
      ))}
    </div>
  ),
};

// 작은 버튼 Status 변형
export const SmallButtonStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {([
        { status: 'default' as QuizButtonStatus, label: 'Text' },
        { status: 'selected' as QuizButtonStatus, label: 'Text' },
        { status: 'correct' as QuizButtonStatus, label: 'Text' },
        { status: 'incorrect' as QuizButtonStatus, label: 'Text' },
      ]).map(({ status, label }) => (
        <div key={status} className="flex flex-col items-center gap-2">
          <QuizButton height={64} status={status}>
            {label}
          </QuizButton>
          <span className="text-sm font-medium">{status}</span>
        </div>
      ))}
    </div>
  ),
};

// 한글 버튼 예시
export const KoreanText: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {([
        { status: 'default' as QuizButtonStatus, label: '가' },
        { status: 'selected' as QuizButtonStatus, label: '가' },
        { status: 'correct' as QuizButtonStatus, label: '가' },
        { status: 'incorrect' as QuizButtonStatus, label: '가' },
      ]).map(({ status, label }) => (
        <div key={status} className="flex flex-col items-center gap-2">
          <QuizButton height={64} status={status}>
            {label}
          </QuizButton>
          <span className="text-sm font-medium">{status}</span>
        </div>
      ))}
    </div>
  ),
};

// 작은 버튼 크기별 radius 확인
export const SmallButtonSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-4">
      {([64, 60, 56] as QuizButtonHeight[]).map((height) => (
        <div key={height} className="flex flex-col items-center gap-2">
          <QuizButton height={height} status="default">
            {height === 64 ? 'Text' : height === 60 ? 'Text' : '가'}
          </QuizButton>
          <span className="text-xs text-gray-600">{height}px (rounded-full)</span>
        </div>
      ))}
    </div>
  ),
};

