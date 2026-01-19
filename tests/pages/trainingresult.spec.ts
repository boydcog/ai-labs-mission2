/**
 * TrainingResultPage 시각적 검증 테스트
 * Figma 디자인과 구현된 페이지를 비교합니다.
 */

import { test, expect } from '@playwright/test';
import { waitForPageLoad, verifyElementMatchesDesign, verifyLayout } from './helpers';

test.describe('TrainingResultPage Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 폰트 로드 대기
    await page.goto('/training-result');
    await waitForPageLoad(page);
    
    // 폰트 로드 대기
    await page.evaluate(() => document.fonts.ready);
    
    // 애니메이션 및 트랜지션 비활성화
    await page.addStyleTag({
      content: '* { animation: none !important; transition: none !important; }',
    });
    
    // 빈 영역 클릭하여 hover/focus 제거
    await page.click('body', { position: { x: 10, y: 10 } });
  });

  test('훈련 결과 페이지가 올바르게 렌더링되어야 함', async ({ page }) => {
    // 페이지 전체가 보이는지 확인
    const mainContainer = page.locator('.min-h-screen.bg-white').first();
    await expect(mainContainer).toBeVisible();
    
    // 최대 너비가 360px인지 확인 (모바일 디자인)
    const container = page.locator('.max-w-\\[360px\\]').first();
    await expect(container).toBeVisible();
  });

  test('Topbar가 올바르게 표시되어야 함', async ({ page }) => {
    const topbar = page.locator('header[data-type="default"]').first();
    await expect(topbar).toBeVisible();
    
    // 제목이 "게임 결과"인지 확인
    const title = page.locator('text=게임 결과').first();
    await expect(title).toBeVisible();
    
    // 뒤로 가기 버튼이 있는지 확인
    const backButton = page.locator('button[aria-label="Go back"]').first();
    await expect(backButton).toBeVisible();
    
    // 닫기 버튼이 있는지 확인
    const closeButton = page.locator('button[aria-label="Close"]').first();
    await expect(closeButton).toBeVisible();
  });

  test('안내 메시지가 올바르게 표시되어야 함', async ({ page }) => {
    const message = page.locator('text=평소보다 더 집중하셨네요').first();
    await expect(message).toBeVisible();
    
    // Text 컴포넌트가 올바른 스타일을 사용하는지 확인
    const textComponent = page.locator('[data-name*="Property 1=m"]').first();
    await expect(textComponent).toBeVisible();
  });

  test('점수 비교 차트가 올바르게 표시되어야 함', async ({ page }) => {
    // ScoreBarChart 컴포넌트가 있는지 확인
    const chart = page.locator('[role="group"][aria-label="점수 비교 차트"]').first();
    await expect(chart).toBeVisible();
    
    // 좌측 막대가 있는지 확인
    const leftBar = page.locator('[data-testid="left-bar"]').first();
    await expect(leftBar).toBeVisible();
    
    // 우측 막대가 있는지 확인
    const rightBar = page.locator('[data-testid="right-bar"]').first();
    await expect(rightBar).toBeVisible();
    
    // "최근 3일 평균" 레이블이 있는지 확인
    const leftLabel = page.locator('text=최근 3일 평균').first();
    await expect(leftLabel).toBeVisible();
    
    // "오늘 점수" 레이블이 있는지 확인
    const rightLabel = page.locator('text=오늘 점수').first();
    await expect(rightLabel).toBeVisible();
  });

  test('막대 그래프 색상이 올바르야 함', async ({ page }) => {
    // 막대 그래프가 연한 파란색 (#dee8fc)을 사용하는지 확인
    const bar = page.locator('.bg-\\[\\#dee8fc\\]').first();
    await expect(bar).toBeVisible();
  });

  test('다음 버튼이 올바르게 표시되어야 함', async ({ page }) => {
    const nextButton = page.locator('button:has-text("다음")').first();
    await expect(nextButton).toBeVisible();
    
    // 버튼 스타일 검증
    await verifyElementMatchesDesign(page, 'button:has-text("다음")', {
      height: 64, // Button height={64}
    });
  });

  test('레이아웃이 Figma 디자인과 일치해야 함', async ({ page }) => {
    await verifyLayout(page, [
      {
        selector: 'header[data-type="default"]',
        checks: {
          visible: true,
        },
      },
      {
        selector: '[role="group"][aria-label="점수 비교 차트"]',
        checks: {
          visible: true,
        },
      },
      {
        selector: 'button:has-text("다음")',
        checks: {
          visible: true,
        },
      },
    ]);
  });

  test('반응형 디자인이 올바르게 적용되어야 함', async ({ page }) => {
    // 모바일 크기 (360px)
    await page.setViewportSize({ width: 360, height: 800 });
    await page.waitForTimeout(500);
    
    const container = page.locator('div.w-full.max-w-\\[360px\\]').first();
    const box = await container.boundingBox();
    
    if (box) {
      // 모바일에서 최대 너비가 360px을 넘지 않아야 함
      expect(box.width).toBeLessThanOrEqual(360);
    }
  });

  test('색상 토큰이 올바르게 사용되어야 함', async ({ page }) => {
    // 배경색이 white여야 함
    await verifyElementMatchesDesign(page, '.min-h-screen.bg-white', {
      backgroundColor: 'rgb(255, 255, 255)', // white
    });
  });

  test('점수 값이 올바르게 표시되어야 함', async ({ page }) => {
    // "5개" 텍스트가 있는지 확인 (좌측 막대)
    const leftValue = page.locator('text=5개').first();
    await expect(leftValue).toBeVisible();
    
    // "8개" 텍스트가 있는지 확인 (우측 막대)
    const rightValue = page.locator('text=8개').first();
    await expect(rightValue).toBeVisible();
  });
});
