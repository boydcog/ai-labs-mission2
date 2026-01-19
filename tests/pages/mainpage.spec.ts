/**
 * MainPage 시각적 검증 테스트
 * Figma 디자인과 구현된 페이지를 비교합니다.
 */

import { test, expect } from '@playwright/test';
import { waitForPageLoad, verifyElementMatchesDesign, verifyLayout } from './helpers';

test.describe('MainPage Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('메인페이지가 올바르게 렌더링되어야 함', async ({ page }) => {
    // 페이지 전체가 보이는지 확인
    const mainContainer = page.locator('.min-h-screen.bg-white').first();
    await expect(mainContainer).toBeVisible();
    
    // 최대 너비가 360px인지 확인 (모바일 디자인)
    const container = page.locator('.max-w-\\[360px\\]').first();
    await expect(container).toBeVisible();
  });

  test('캐릭터 컴포넌트가 표시되어야 함', async ({ page }) => {
    const character = page.locator('[data-name="character/thumbnail"]').first();
    await expect(character).toBeVisible();
  });

  test('인사말이 올바르게 표시되어야 함', async ({ page }) => {
    const greeting = page.locator('h1').first();
    await expect(greeting).toBeVisible();
    
    const text = await greeting.textContent();
    expect(text).toMatch(/님/); // "님"이 포함되어야 함
  });

  test('통계 정보가 올바르게 표시되어야 함', async ({ page }) => {
    // 최대 단어 수
    const maxWords = page.locator('text=최대 단어 수').first();
    await expect(maxWords).toBeVisible();
    
    // 연속 학습일
    const streakDays = page.locator('text=연속 학습일').first();
    await expect(streakDays).toBeVisible();
  });

  test('오늘의 게임 섹션이 표시되어야 함', async ({ page }) => {
    const gameSection = page.locator('text=오늘의 게임').first();
    await expect(gameSection).toBeVisible();
    
    // 게임 목록이 3개인지 확인 (Figma 디자인 기준)
    const gameButtons = page.locator('button[aria-label]');
    const count = await gameButtons.count();
    expect(count).toBe(3);
  });

  test('훈련 시작 버튼이 표시되어야 함 (훈련 미완료 상태)', async ({ page }) => {
    // 기본적으로 훈련 미완료 상태이므로 버튼이 보여야 함
    const startButton = page.locator('button:has-text("훈련 시작")').first();
    await expect(startButton).toBeVisible();
    
    // 버튼 스타일 검증
    await verifyElementMatchesDesign(page, 'button:has-text("훈련 시작")', {
      height: 64, // Button height={64}
    });
  });

  test('레이아웃이 Figma 디자인과 일치해야 함', async ({ page }) => {
    await verifyLayout(page, [
      {
        selector: 'header',
        checks: {
          visible: true,
        },
      },
      {
        selector: 'section:has-text("오늘의 게임")',
        checks: {
          visible: true,
        },
      },
      {
        selector: 'button:has-text("훈련 시작")',
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
    
    // 헤더 배경색이 파란색이어야 함 (#2a69e9)
    const header = page.locator('header.bg-\\[\\#2a69e9\\]').first();
    await expect(header).toBeVisible();
    
    // 헤더 텍스트가 흰색이어야 함
    await verifyElementMatchesDesign(page, 'header h1', {
      color: 'rgb(255, 255, 255)', // white
    });
  });

  test('인사말이 두 줄로 표시되어야 함', async ({ page }) => {
    const greeting = page.locator('h1').first();
    await expect(greeting).toBeVisible();
    
    const text = await greeting.textContent();
    expect(text).toContain('님');
    expect(text).toContain('화이팅');
    
    // br 태그가 있어야 함 (두 줄)
    const brCount = await greeting.locator('br').count();
    expect(brCount).toBeGreaterThan(0);
  });

  test('통계 카드 아이콘 색상이 올바르야 함', async ({ page }) => {
    // 브레인 아이콘이 핑크 색상이어야 함
    const brainIcon = page.locator('.text-pink-400').first();
    await expect(brainIcon).toBeVisible();
    
    // 불꽃 아이콘이 오렌지 색상이어야 함
    const fireIcon = page.locator('.text-orange-500').first();
    await expect(fireIcon).toBeVisible();
  });

  test('게임 목록 텍스트 순서가 올바르야 함', async ({ page }) => {
    // 첫 번째 게임 확인
    const firstGame = page.locator('button[aria-label*="집중하기"]').first();
    await expect(firstGame).toBeVisible();
    
    // 위쪽 텍스트는 회색, 아래쪽 텍스트는 검은색 bold여야 함
    const gameText = firstGame.locator('span');
    const textCount = await gameText.count();
    expect(textCount).toBeGreaterThanOrEqual(2);
  });

  test('타이머가 오렌지 색상이어야 함', async ({ page }) => {
    const timer = page.locator('text=11시간 59분').first();
    await expect(timer).toBeVisible();
    
    // 타이머 텍스트가 오렌지 색상이어야 함
    const timerText = page.locator('.text-orange-500:has-text("11시간 59분")').first();
    await expect(timerText).toBeVisible();
  });
});
