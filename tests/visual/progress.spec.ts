/**
 * Progress 컴포넌트 시각적 검증 테스트
 */

import { test, expect } from '@playwright/test';
import { gotoStory, getStoryFrame } from './helpers';

test.describe('Progress Components Visual Tests', () => {
  test('ProgressBar가 올바르게 렌더링되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-progressbar--default');
    
    const storyFrame = await getStoryFrame(page);
    const progressBar = storyFrame.locator('[role="progressbar"]').first();
    await expect(progressBar).toBeVisible();
  });

  test('ProgressCircle이 올바르게 렌더링되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/components-default-progresscircle--default');
    
    const storyFrame = await getStoryFrame(page);
    const progressCircle = storyFrame.locator('[role="progressbar"]').first();
    await expect(progressCircle).toBeVisible();
  });
});

