/**
 * Text 컴포넌트 Storybook 스토리
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Design System/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: '텍스트 크기',
    },
    variant: {
      control: 'select',
      options: ['default', 'moco'],
      description: '텍스트 variant',
    },
    children: {
      control: 'text',
      description: '텍스트 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: 's',
    variant: 'default',
    children: 'Prompt',
  },
};

export const Small: Story = {
  args: {
    size: 's',
    variant: 'default',
    children: 'Small Text (20px)',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    variant: 'default',
    children: 'Medium Text (22px)',
  },
};

export const MocoVariant: Story = {
  args: {
    size: 'm',
    variant: 'moco',
    children: 'Moco Text with Character',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Size: s, Variant: default</h3>
        <Text size="s" variant="default">
          Prompt
        </Text>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">Size: m, Variant: default</h3>
        <Text size="m" variant="default">
          Prompt
        </Text>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">Size: m, Variant: moco</h3>
        <Text size="m" variant="moco">
          Moco Text with Character
        </Text>
      </div>
    </div>
  ),
};

