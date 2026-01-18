/**
 * InputChip 컴포넌트 시각적 검증 테스트
 * Figma 디자인과 구현된 컴포넌트를 비교합니다.
 */

import { test, expect } from '@playwright/test';
import { gotoStory, getStoryFrame } from './helpers';

test.describe('InputChip Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, '/story/components-default-inputchip--default');
  });

  test('InputChip 기본 스타일이 Figma 디자인과 일치해야 함', async ({ page }) => {
    const storyFrame = await getStoryFrame(page);
    const chip = storyFrame.locator('button[data-status="default"]').first();
    
    await expect(chip).toBeVisible();
    
    // 테두리 검증 (Figma 변수: borderWidth/thin = 1px)
    const borderWidth = await chip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderWidth;
    });
    
    expect(borderWidth).toContain('1px');
    
    // Border radius 검증 (Figma 변수: radius/circle = 9999px - 완전히 둥근 형태)
    const borderRadius = await chip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderRadius;
    });
    
    expect(parseFloat(borderRadius)).toBeGreaterThan(20); // 매우 둥근 형태
    
    // 높이 검증 (64px)
    const height = await chip.evaluate((el) => el.offsetHeight);
    expect(height).toBe(64);
  });

  test('InputChip 모든 size variant가 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-inputchip--sizes');
    
    const storyFrame = await getStoryFrame(page);
    const chips = storyFrame.locator('button[data-size]');
    const count = await chips.count();
    
    expect(count).toBe(2); // 64, 56
    
    // 각 크기 검증
    const size64 = chips.filter({ hasText: '64px' }).first();
    const height64 = await size64.evaluate((el) => el.offsetHeight);
    expect(height64).toBe(64);
    
    const size56 = chips.filter({ hasText: '56px' }).first();
    const height56 = await size56.evaluate((el) => el.offsetHeight);
    expect(height56).toBe(56);
  });

  test('InputChip 모든 type variant가 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-inputchip--types');
    
    const storyFrame = await getStoryFrame(page);
    const chips = storyFrame.locator('button[data-type]');
    const count = await chips.count();
    
    expect(count).toBe(3); // text_only, left_icon+text, right_icon+text
  });

  test('InputChip 모든 status variant가 올바른 색상으로 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-inputchip--statuses');
    
    const storyFrame = await getStoryFrame(page);
    const chips = storyFrame.locator('button[data-status]');
    const count = await chips.count();
    
    expect(count).toBe(6); // default, disabled, selected, blurred, correct, incorrect
    
    // Selected 상태 - 파란색 배경 (#6694ef)
    const selectedChip = chips.filter({ hasText: 'Selected' }).first();
    const selectedBg = await selectedChip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.backgroundColor;
    });
    expect(selectedBg).toContain('rgb(102, 148, 239)');
    
    // Correct 상태 - 녹색 배경 (#c6f6d5)
    const correctChip = chips.filter({ hasText: 'Correct' }).first();
    const correctBg = await correctChip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.backgroundColor;
    });
    expect(correctBg).toContain('rgb(198, 246, 213)');
    
    // Incorrect 상태 - 빨간색 배경 (#feb2b2)
    const incorrectChip = chips.filter({ hasText: 'Incorrect' }).first();
    const incorrectBg = await incorrectChip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.backgroundColor;
    });
    expect(incorrectBg).toContain('rgb(254, 178, 178)');
    
    // Disabled 상태 - 투명도 확인
    const disabledChip = chips.filter({ hasText: 'Disabled' }).first();
    const disabledOpacity = await disabledChip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.opacity;
    });
    expect(parseFloat(disabledOpacity)).toBeLessThan(1);
  });
});
