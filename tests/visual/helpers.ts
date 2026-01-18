/**
 * 테스트 헬퍼 함수
 */

import { Page } from '@playwright/test';

/**
 * Storybook이 완전히 로드될 때까지 기다립니다
 */
export async function waitForStorybook(page: Page): Promise<void> {
  // Storybook iframe이 로드될 때까지 대기
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  
  // Storybook의 스토리 컨테이너가 나타날 때까지 기다림
  // 여러 가능한 선택자 시도
  const selectors = [
    '[data-testid="storybook-root"]',
    '#storybook-root',
    '[id*="storybook"]',
    '[class*="os-host"]',
    '[class*="storybook"]',
    'body',
  ];
  
  let found = false;
  for (const selector of selectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      found = true;
      break;
    } catch {
      // 계속 시도
    }
  }
  
  if (!found) {
    // 최소한 body가 로드될 때까지 대기
    await page.waitForSelector('body', { timeout: 10000 });
  }
  
  // Storybook이 완전히 렌더링될 때까지 추가 대기
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
    // 네트워크가 완전히 idle 상태가 아니어도 계속 진행
  });
  
  // 추가 대기 (렌더링 완료 보장)
  await page.waitForTimeout(1000);
  
  // React가 완전히 렌더링되었는지 확인
  await page.evaluate(() => {
    return new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });
  }).catch(() => {
    // 이미 로드되었을 수 있음
  });
}

/**
 * Storybook의 스토리 iframe을 찾아 반환합니다
 */
export async function getStoryFrame(page: Page) {
  // Storybook의 iframe을 찾기 위한 여러 선택자 시도
  const iframeSelectors = [
    'iframe[id*="storybook-preview"]',
    'iframe[id*="storybook"]',
    'iframe[title*="story"]',
    'iframe[title*="preview"]',
    'iframe',
  ];
  
  // 먼저 iframe 요소가 존재하는지 확인
  for (const selector of iframeSelectors) {
    try {
      const iframeElement = page.locator(selector).first();
      const count = await iframeElement.count();
      if (count > 0) {
        // iframe을 찾았으면 frameLocator로 반환
        return page.frameLocator(selector).first();
      }
    } catch {
      // 다음 선택자 시도
    }
  }
  
  // iframe을 찾지 못하면 페이지 자체를 반환 (iframe이 없는 경우)
  // 이 경우 Storybook이 iframe 없이 직접 렌더링하는 경우
  return page;
}

/**
 * Storybook 스토리 페이지로 이동하고 로드될 때까지 기다립니다
 */
export async function gotoStory(page: Page, storyPath: string): Promise<void> {
  const fullPath = storyPath.startsWith('/') ? storyPath : `/${storyPath}`;
  const url = `/?path=${fullPath}`;
  
  await page.goto(url, { 
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  
  await waitForStorybook(page);
  
  // Storybook의 스토리 iframe 찾기 및 대기
  const storyFrame = await getStoryFrame(page);
  
  // iframe 내부가 로드될 때까지 대기
  try {
    await storyFrame.locator('body').waitFor({ timeout: 15000 });
    // 추가 대기 (React 렌더링 완료)
    await page.waitForTimeout(1500);
  } catch {
    // iframe이 없거나 이미 로드됨 - 페이지 자체를 사용
    await page.waitForTimeout(1500);
  }
}
