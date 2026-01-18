/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          hover: '#E55A2B',
          active: '#CC4F26',
          disabled: '#FFB499',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          hover: '#3FB8B0',
          active: '#35A39C',
          disabled: '#9FE6E1',
        },
        tertiary: {
          DEFAULT: '#FFE66D',
          hover: '#FFE04A',
          active: '#FFDB33',
          disabled: '#FFF3B3',
        },
        quaternary: {
          DEFAULT: '#F7F7F7',
          hover: '#E8E8E8',
          active: '#D9D9D9',
          disabled: '#F0F0F0',
        },
        neutral: {
          dark: '#1A1A1A',
          medium: '#666666',
          light: '#F7F7F7',
          white: '#FFFFFF',
          black: '#000000',
        },
        status: {
          success: '#48BB78',
          error: '#F56565',
          warning: '#ED8936',
          info: '#4299E1',
          correct: '#48BB78',
          incorrect: '#F56565',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Space Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '32px',
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
      },
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
    },
  },
  plugins: [],
}
