import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 페이지 테스트 설정
 * 페이지 개발 후 실행하는 일반 프로젝트 테스트
 * 컴포넌트 테스트는 제외 (컴포넌트는 안정되어 있다고 가정)
 */
export default defineConfig({
  testDir: './tests/pages',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173', // Vite dev server 기본 URL
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true, // 헤드리스 모드로 실행
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true, // 항상 기존 서버 재사용 (CI 환경에서도)
    timeout: 120 * 1000,
  },
});
