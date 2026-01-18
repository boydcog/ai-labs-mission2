import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 컴포넌트 테스트 설정
 * 프로젝트 템플릿의 기본 컴포넌트가 잘 구현되었는지 확인하는 테스트
 */
export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006', // Storybook 기본 URL
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
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: true, // 항상 기존 서버 재사용 (CI 환경에서도)
    timeout: 120 * 1000,
  },
});
