/**
 * Spacing Design Token Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { getSemanticGaps } from '../../tokens/utils';

const meta: Meta = {
  title: 'Base/Spacing',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const gaps = getSemanticGaps();

    return (
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Spacing & Gaps</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Semantic Gaps</h3>
          <div className="space-y-4">
            {Object.entries(gaps).map(([name, value]) => (
              <div key={name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700 font-mono">{name}</span>
                  <span className="text-xs text-gray-500 font-mono">{value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <div
                    className="bg-blue-100 rounded"
                    style={{ width: value, height: '24px' }}
                  />
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
