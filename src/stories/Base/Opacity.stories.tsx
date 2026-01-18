/**
 * Opacity Design Token Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { opacity } from '../../tokens/opacity';

const meta: Meta = {
  title: 'Base/Opacity',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const opacityEntries = Object.entries(opacity);

    // opacity 값이 없으면 기본값 사용
    const defaultOpacities = opacityEntries.length === 0 
      ? [
          { name: 'opacity-0', value: 0 },
          { name: 'opacity-25', value: 0.25 },
          { name: 'opacity-50', value: 0.5 },
          { name: 'opacity-75', value: 0.75 },
          { name: 'opacity-100', value: 1 },
        ]
      : opacityEntries.map(([name, value]) => ({
          name,
          // opacity 값이 0-100 범위면 0-1로 변환
          value: (value as number) > 1 ? (value as number) / 100 : (value as number),
        }));

    return (
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Opacity</h2>
        
        {opacityEntries.length === 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Opacity 토큰이 없습니다. 기본값을 표시합니다.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {defaultOpacities.map(({ name, value }) => (
            <div key={name} className="p-4 border border-gray-200 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-sm font-medium text-gray-700 font-mono mb-1">{name}</div>
                <div className="text-xs text-gray-500 font-mono">{value}</div>
              </div>
              <div className="relative w-full h-16">
                <div className="absolute inset-0 bg-gray-200 rounded"></div>
                <div
                  className="absolute inset-0 bg-blue-500 rounded"
                  style={{ opacity: value }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
