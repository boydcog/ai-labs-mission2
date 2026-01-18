import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  globals: {
    backgrounds: {
      light: '#ffffff',
      dark: '#1a1a1a',
    },
  },
  initialGlobals: {
    backgrounds: 'light',
  },
};

export default preview;