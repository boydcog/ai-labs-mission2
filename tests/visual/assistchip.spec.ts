/**
 * AssistChip 컴포넌트 시각적 검증 테스트
 * Figma 디자인과 구현된 컴포넌트를 비교합니다.
 */

import { test, expect } from '@playwright/test';
import { gotoStory, getStoryFrame } from './helpers';

test.describe('AssistChip Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, '/story/components-default-assistchip--default');
  });

  test('AssistChip 기본 스타일이 Figma 디자인과 일치해야 함', async ({ page }) => {
    const storyFrame = await getStoryFrame(page);
    const chip = storyFrame.locator('button[data-status="default"]').first();
    
    await expect(chip).toBeVisible();
    
    // 테두리 검증 (Figma 변수: borderWidth/thin = 1px)
    const borderWidth = await chip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderWidth;
    });
    
    expect(borderWidth).toContain('1px');
    
    // Border radius 검증 (Figma 변수: rounding/12 = 12px)
    const borderRadius = await chip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderRadius;
    });
    
    expect(borderRadius).toContain('12px');
    
    // 높이 검증 (48px = h-12)
    const height = await chip.evaluate((el) => el.offsetHeight);
    expect(height).toBe(48);
  });

  test('AssistChip 모든 status variant가 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-assistchip--statuses');
    
    const storyFrame = await getStoryFrame(page);
    const chips = storyFrame.locator('button[data-status]');
    const count = await chips.count();
    
    // Statuses 스토리는 아이콘 없는 3개 + 아이콘 있는 3개 = 총 6개
    expect(count).toBe(6);
    
    // 각 상태의 스타일 검증 (아이콘 없는 버전)
    const defaultChip = chips.filter({ hasText: 'Default' }).first();
    await expect(defaultChip).toBeVisible();
    
    const disabledChip = chips.filter({ hasText: 'Disabled' }).first();
    await expect(disabledChip).toBeVisible();
    const disabledOpacity = await disabledChip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.opacity;
    });
    expect(parseFloat(disabledOpacity)).toBeLessThan(1);
    
    const selectedChip = chips.filter({ hasText: 'Selected' }).first();
    await expect(selectedChip).toBeVisible();
    const selectedBorderColor = await selectedChip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderColor;
    });
    // 파란색 테두리 확인 (#6694ef)
    expect(selectedBorderColor).toContain('rgb(102, 148, 239)');
  });

  test('AssistChip 아이콘이 있는 경우 올바르게 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-assistchip--default');
    
    const storyFrame = await getStoryFrame(page);
    // 아이콘 컨테이너 확인
    const iconContainer = storyFrame.locator('button[data-status="default"] div.w-6.h-6').first();
    
    // 아이콘이 있는 경우에만 테스트
    if (await iconContainer.count() > 0) {
      await expect(iconContainer).toBeVisible();
      
      const borderRadius = await iconContainer.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.borderRadius;
      });
      
      expect(borderRadius).toContain('50%'); // 원형 아이콘
    }
  });
});
