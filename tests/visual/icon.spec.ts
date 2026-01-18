/**
 * Icon 컴포넌트 시각적 검증 테스트
 */

import { test, expect } from '@playwright/test';
import { gotoStory, getStoryFrame } from './helpers';

test.describe('Icon Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, '/story/components-default-icon--default');
  });

  test('Icon이 올바르게 렌더링되어야 함', async ({ page }) => {
    const storyFrame = await getStoryFrame(page);
    const icon = storyFrame.locator('[data-name*="type=line, name=add"]').first();
    
    await expect(icon).toBeVisible();
    
    const width = await icon.evaluate((el) => el.offsetWidth);
    const height = await icon.evaluate((el) => el.offsetHeight);
    
    expect(width).toBe(24);
    expect(height).toBe(24);
  });

  test('모든 Line 아이콘이 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-icon--line-icons');
    
    const storyFrame = await getStoryFrame(page);
    const icons = storyFrame.locator('[data-name*="type=line"]');
    const count = await icons.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('모든 Fill 아이콘이 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-icon--fill-icons');
    
    const storyFrame = await getStoryFrame(page);
    const icons = storyFrame.locator('[data-name*="type=fill"]');
    const count = await icons.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('모든 Graphic 아이콘이 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-icon--graphic-icons');
    
    const storyFrame = await getStoryFrame(page);
    const icons = storyFrame.locator('[data-name*="type=graphic"]');
    const count = await icons.count();
    
    expect(count).toBeGreaterThan(0);
  });
});

