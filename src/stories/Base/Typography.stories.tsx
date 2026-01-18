/**
 * Typography Design Token Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography } from '../../tokens/typography';

const meta: Meta = {
  title: 'Base/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const fontSizes = Object.entries(typography.fontSize);
    const fontWeights = Object.entries(typography.fontWeight);
    const lineHeights = Object.entries(typography.lineHeight);

    return (
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Typography</h2>

        {/* Font Family */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Font Family</h3>
          <div className="space-y-2">
            {Object.entries(typography.fontFamily).map(([name, fonts]) => (
              <div key={name} className="p-4 border border-gray-200 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2 capitalize">{name}</div>
                <div className="text-base font-mono text-gray-600">
                  {Array.isArray(fonts) ? fonts.join(', ') : String(fonts)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Font Sizes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Font Sizes</h3>
          <div className="space-y-3">
            {fontSizes.map(([name, size]) => (
              <div key={name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{name}</span>
                  <span className="text-xs text-gray-500 font-mono">{size as string}</span>
                </div>
                <div style={{ fontSize: size as string }} className="text-gray-900">
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Font Weights */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Font Weights</h3>
          <div className="space-y-3">
            {fontWeights.map(([name, weight]) => (
              <div key={name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 capitalize">{name}</span>
                  <span className="text-xs text-gray-500 font-mono">{weight as number}</span>
                </div>
                <div style={{ fontWeight: weight as number }} className="text-lg text-gray-900">
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line Heights */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Line Heights</h3>
          <div className="space-y-3">
            {lineHeights.map(([name, height]) => (
              <div key={name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 capitalize">{name}</span>
                  <span className="text-xs text-gray-500 font-mono">{String(height)}</span>
                </div>
                <div style={{ lineHeight: height as number }} className="text-base text-gray-900 w-64">
                  The quick brown fox jumps over the lazy dog. This is a longer text to demonstrate line height.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
