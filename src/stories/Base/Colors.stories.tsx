/**
 * Colors Design Token Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { getSemanticColors } from '../../tokens/utils';

const meta: Meta = {
  title: 'Base/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const semanticColors = getSemanticColors();
    const colorCategories = {
      text: semanticColors.color?.text || {},
      stroke: semanticColors.color?.stroke || {},
      surface: semanticColors.color?.surface || {},
      bg: semanticColors.color?.bg || {},
    };

    const renderColorSwatch = (name: string, value: string, category: string) => (
      <div key={name} className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
        <div
          className="w-24 h-24 rounded-lg border border-gray-300 shadow-sm"
          style={{ backgroundColor: value }}
        />
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500 font-mono">{value}</div>
          <div className="text-xs text-gray-400 mt-1">{category}</div>
        </div>
      </div>
    );

    return (
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Colors</h2>
        
        {Object.entries(colorCategories).map(([category, colors]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold capitalize">{category} Colors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(colors).map(([name, value]) =>
                renderColorSwatch(name, value as string, category)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
