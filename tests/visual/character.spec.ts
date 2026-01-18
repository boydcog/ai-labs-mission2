/**
 * Character 컴포넌트 시각적 검증 테스트
 * Figma 디자인과 구현된 컴포넌트를 비교합니다.
 */

import { test, expect } from '@playwright/test';
import { gotoStory, getStoryFrame } from './helpers';

test.describe('Character Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, '/story/design-system-character--thumbnail');
  });

  test('Character 기본 variant가 올바른 크기로 표시되어야 함', async ({ page }) => {
    const storyFrame = await getStoryFrame(page);
    const character = storyFrame.locator('[data-name="character/thumbnail"]').first();
    
    await expect(character).toBeVisible();
    
    // 크기 검증 (272x272)
    const width = await character.evaluate((el) => el.offsetWidth);
    const height = await character.evaluate((el) => el.offsetHeight);
    
    expect(width).toBe(272);
    expect(height).toBe(272);
  });

  test('Character 모든 variant가 올바른 크기로 표시되어야 함', async ({ page }) => {
    await gotoStory(page, '/story/design-system-character--all-variants');
    
    const storyFrame = await getStoryFrame(page);
    // Thumbnail (272x272)
    const thumbnail = storyFrame.locator('[data-name="character/thumbnail"]').first();
    const thumbWidth = await thumbnail.evaluate((el) => el.offsetWidth);
    const thumbHeight = await thumbnail.evaluate((el) => el.offsetHeight);
    expect(thumbWidth).toBe(272);
    expect(thumbHeight).toBe(272);
    
    // Bust Shot (372x272)
    const bustShot = storyFrame.locator('[data-name="character/bust_shot"]').first();
    const bustWidth = await bustShot.evaluate((el) => el.offsetWidth);
    const bustHeight = await bustShot.evaluate((el) => el.offsetHeight);
    expect(bustWidth).toBe(372);
    expect(bustHeight).toBe(272);
    
    // Full Shot (372x372)
    const fullShot = storyFrame.locator('[data-name="character/full_shot"]').first();
    const fullWidth = await fullShot.evaluate((el) => el.offsetWidth);
    const fullHeight = await fullShot.evaluate((el) => el.offsetHeight);
    expect(fullWidth).toBe(372);
    expect(fullHeight).toBe(372);
  });

  test('Character SVG 요소가 렌더링되어야 함', async ({ page }) => {
    const storyFrame = await getStoryFrame(page);
    const character = storyFrame.locator('[data-name="character/thumbnail"]').first();
    
    await expect(character).toBeVisible();
    
    // SVG 요소 확인
    const svg = character.locator('svg').first();
    await expect(svg).toBeVisible();
    
    // SVG 내부 요소들 확인 (몸통, 머리, 넥타이 등)
    const body = svg.locator('ellipse').first();
    await expect(body).toBeVisible();
    
    const head = svg.locator('circle').first();
    await expect(head).toBeVisible();
  });
});
