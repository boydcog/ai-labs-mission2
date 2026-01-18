/**
 * Button 컴포넌트 시각적 검증 테스트
 * Figma 디자인과 구현된 컴포넌트를 비교합니다.
 */

import { test, expect } from '@playwright/test';
import { gotoStory, getStoryFrame } from './helpers';

test.describe('Button Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, '/story/components-default-button--default');
  });

  test('Button 기본 스타일이 Figma 디자인과 일치해야 함', async ({ page }) => {
    const storyFrame = await getStoryFrame(page);
    const button = storyFrame.locator('button[data-hierarchy="primary"]').first();
    
    await expect(button).toBeVisible();
    
    // 테두리 검증 (Figma 변수: borderWidth/thick = 2px)
    const borderWidth = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderWidth;
    });
    
    expect(borderWidth).toContain('2px');
    
    // Border radius 검증 (Figma 변수: radius/sm = 8px)
    const borderRadius = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderRadius;
    });
    
    expect(borderRadius).toContain('8px');
  });

  test('Button 모든 hierarchy variant가 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-button--hierarchies');
    
    const storyFrame = await getStoryFrame(page);
    const buttons = storyFrame.locator('button[data-hierarchy]');
    const count = await buttons.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Button height variant가 올바르게 적용되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-button--heights');
    
    const storyFrame = await getStoryFrame(page);
    const buttons = storyFrame.locator('button[data-height]');
    const count = await buttons.count();
    
    expect(count).toBe(4); // 64, 60, 48, 40px
    
    // 각 버튼의 높이 검증
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const height = await button.evaluate((el) => el.offsetHeight);
      expect(height).toBeGreaterThan(0);
    }
  });

  test('Button type variant가 올바르게 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-button--types');
    
    const storyFrame = await getStoryFrame(page);
    const buttons = storyFrame.locator('button[data-type]');
    const count = await buttons.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Button status variant가 올바르게 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-button--statuses');
    
    const storyFrame = await getStoryFrame(page);
    const buttons = storyFrame.locator('button[data-status]');
    const count = await buttons.count();
    
    expect(count).toBe(4); // default, disabled, selected, destructive
  });
});

