/**
 * Radius Design Token Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { radius } from '../../tokens/radius';

const meta: Meta = {
  title: 'Base/Radius',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const radiusEntries = Object.entries(radius);

    return (
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Border Radius</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {radiusEntries.map(([name, value]) => (
            <div key={name} className="p-4 border border-gray-200 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-sm font-medium text-gray-700 font-mono mb-1">{name}</div>
                <div className="text-xs text-gray-500 font-mono">{value as number}px</div>
              </div>
              <div
                className="bg-blue-500 mx-auto"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: `${value}px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
