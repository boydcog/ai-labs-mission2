/**
 * Input 컴포넌트 시각적 검증 테스트
 */

import { test, expect } from '@playwright/test';
import { gotoStory, getStoryFrame } from './helpers';

test.describe('Input Component Visual Tests', () => {
  test('Input이 올바르게 렌더링되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-input--default');
    
    const storyFrame = await getStoryFrame(page);
    const input = storyFrame.locator('input').first();
    await expect(input).toBeVisible();
  });

  test('Input 모든 타입이 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-input--types');
    
    const storyFrame = await getStoryFrame(page);
    const inputs = storyFrame.locator('input');
    const count = await inputs.count();
    
    expect(count).toBeGreaterThan(0);
  });
});

