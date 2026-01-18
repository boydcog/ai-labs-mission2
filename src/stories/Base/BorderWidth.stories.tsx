/**
 * Border Width Design Token Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { borderWidth } from '../../tokens/borderWidth';

const meta: Meta = {
  title: 'Base/BorderWidth',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const borderWidthEntries = Object.entries(borderWidth);

    return (
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Border Width</h2>

        <div className="space-y-4">
          {borderWidthEntries.map(([name, value]) => (
            <div key={name} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 font-mono">{name}</span>
                <span className="text-xs text-gray-500 font-mono">{value as number}px</span>
              </div>
              <div
                className="bg-gray-100 rounded"
                style={{
                  width: '200px',
                  height: '40px',
                  borderWidth: `${value}px`,
                  borderStyle: 'solid',
                  borderColor: '#2a69e9',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
