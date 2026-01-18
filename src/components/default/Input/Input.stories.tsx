/**
 * Input 컴포넌트 Storybook 스토리
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';
import type { InputType, InputStatus } from './Input.types';

const meta: Meta<typeof Input> = {
  title: 'Components/Default/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 입력 필드 컴포넌트입니다. 다양한 타입, 상태, 레이블/헬퍼 텍스트를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    inputType: {
      control: 'select',
      options: ['label+helper', 'label_only', 'plain', 'helper_only'],
      description: '입력 필드 타입',
    },
    status: {
      control: 'select',
      options: ['default', 'focus', 'type', 'filled', 'error', 'disabled', 'success'],
      description: '입력 필드 상태',
    },
    label: {
      control: 'text',
      description: '레이블 텍스트',
    },
    helper: {
      control: 'text',
      description: '헬퍼 텍스트',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    successMessage: {
      control: 'text',
      description: '성공 메시지',
    },
    button: {
      control: 'boolean',
      description: '버튼 포함 여부',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 스토리
export const Default: Story = {
  args: {
    inputType: 'label+helper',
    label: 'Label',
    helper: 'Helper text',
    placeholder: 'Enter text...',
  },
};

// Type 변형
export const Types: Story = {
  render: () => (
    <div className="space-y-6 p-4 w-full max-w-md">
      {([
        { inputType: 'label+helper' as InputType, label: 'Label + Helper', helper: 'Helper text' },
        { inputType: 'label_only' as InputType, label: 'Label Only' },
        { inputType: 'plain' as InputType, placeholder: 'Plain input' },
        { inputType: 'helper_only' as InputType, helper: 'Helper Only' },
      ]).map(({ inputType, label, helper, placeholder }) => (
        <Input
          key={inputType}
          inputType={inputType}
          label={label}
          helper={helper}
          placeholder={placeholder || 'Enter text...'}
        />
      ))}
    </div>
  ),
};

// Status 변형
export const Statuses: Story = {
  render: () => (
    <div className="space-y-6 p-4 w-full max-w-md">
      {([
        { status: 'default' as InputStatus, label: 'Default' },
        { status: 'focus' as InputStatus, label: 'Focus' },
        { status: 'filled' as InputStatus, label: 'Filled', value: 'Filled value' },
        { status: 'error' as InputStatus, label: 'Error', errorMessage: 'Error message' },
        { status: 'success' as InputStatus, label: 'Success', successMessage: 'Success message' },
        { status: 'disabled' as InputStatus, label: 'Disabled' },
      ]).map(({ status, label, errorMessage, successMessage, value }) => (
        <Input
          key={status}
          inputType="label+helper"
          status={status}
          label={label}
          helper={status !== 'error' && status !== 'success' ? 'Helper text' : undefined}
          errorMessage={errorMessage}
          successMessage={successMessage}
          value={value}
          placeholder="Enter text..."
        />
      ))}
    </div>
  ),
};

// With Button
export const WithButton: Story = {
  render: () => (
    <div className="space-y-4 p-4 w-full max-w-md">
      <Input
        inputType="label+helper"
        label="With Button"
        helper="Click the arrow to submit"
        button
        placeholder="Enter text..."
      />
    </div>
  ),
};

// With Label Button (오른쪽 버튼)
export const WithLabelButton: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="space-y-6 p-4 w-full max-w-md">
        <Input
          inputType="label+helper"
          label="Field Label"
          helper="Helper Text (optional)"
          labelButtonText="label"
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          helper="Helper Text (optional)"
          labelButtonText="label"
          status="focus"
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          helper="Helper Text (optional)"
          labelButtonText="label"
          status="filled"
          value="Text"
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          errorMessage="Error Message"
          labelButtonText="label"
          status="error"
          value="Text"
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          successMessage="Success Message (optional)"
          labelButtonText="label"
          status="success"
          value="Text"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

// With Clear Button (X 버튼으로 입력값 지우기)
export const WithClearButton: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('Text');
    const [value2, setValue2] = React.useState('Text');
    const [value3, setValue3] = React.useState('Text');
    const [value4, setValue4] = React.useState('Text');
    
    return (
      <div className="space-y-6 p-4 w-full max-w-md">
        <Input
          inputType="label+helper"
          label="Field Label"
          helper="Helper Text (optional)"
          placeholder="Placeholder"
          showClearButton
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          onClear={() => setValue1('')}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          helper="Helper Text (optional)"
          status="focus"
          placeholder="Placeholder"
          showClearButton
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          onClear={() => setValue2('')}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          errorMessage="Error Message"
          status="error"
          showClearButton
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          onClear={() => setValue3('')}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          successMessage="Success Message (optional)"
          status="success"
          showClearButton
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
          onClear={() => setValue4('')}
        />
      </div>
    );
  },
};

// With Label Button and Clear Button (오른쪽 버튼 + X 버튼 함께)
export const WithLabelButtonAndClear: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('Text');
    const [value2, setValue2] = React.useState('Text');
    const [value3, setValue3] = React.useState('Text');
    const [value4, setValue4] = React.useState('Text');
    
    return (
      <div className="space-y-6 p-4 w-full max-w-md">
        <Input
          inputType="label+helper"
          label="Field Label"
          helper="Helper Text (optional)"
          labelButtonText="label"
          placeholder="Placeholder"
          showClearButton
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          onClear={() => setValue1('')}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          helper="Helper Text (optional)"
          labelButtonText="label"
          status="focus"
          placeholder="Placeholder"
          showClearButton
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          onClear={() => setValue2('')}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          errorMessage="Error Message"
          labelButtonText="label"
          status="error"
          showClearButton
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          onClear={() => setValue3('')}
        />
        <Input
          inputType="label+helper"
          label="Field Label"
          successMessage="Success Message (optional)"
          labelButtonText="label"
          status="success"
          showClearButton
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
          onClear={() => setValue4('')}
        />
      </div>
    );
  },
};

