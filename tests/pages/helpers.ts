/**
 * 페이지 테스트 헬퍼 함수
 * Figma 디자인과 실제 구현을 비교하기 위한 유틸리티
 */

import { Page, expect } from '@playwright/test';

/**
 * 페이지가 완전히 로드될 때까지 기다립니다
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
    // 네트워크가 완전히 idle 상태가 아니어도 계속 진행
  });
  
  // React가 완전히 렌더링되었는지 확인
  await page.waitForFunction(() => {
    return document.readyState === 'complete';
  }, { timeout: 10000 });
  
  // 추가 대기 (렌더링 완료 보장)
  await page.waitForTimeout(1000);
}

/**
 * 페이지의 특정 요소가 Figma 디자인과 일치하는지 검증
 */
export async function verifyElementMatchesDesign(
  page: Page,
  selector: string,
  expectedStyles: {
    width?: number;
    height?: number;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    borderWidth?: string;
  }
): Promise<void> {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
  
  const styles = await element.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      width: el.offsetWidth,
      height: el.offsetHeight,
      backgroundColor: computed.backgroundColor,
      color: computed.color,
      fontSize: computed.fontSize,
      padding: computed.padding,
      margin: computed.margin,
      borderRadius: computed.borderRadius,
      borderWidth: computed.borderWidth,
    };
  });
  
  if (expectedStyles.width !== undefined) {
    expect(styles.width).toBe(expectedStyles.width);
  }
  
  if (expectedStyles.height !== undefined) {
    expect(styles.height).toBe(expectedStyles.height);
  }
  
  if (expectedStyles.backgroundColor !== undefined) {
    expect(styles.backgroundColor).toContain(expectedStyles.backgroundColor);
  }
  
  if (expectedStyles.color !== undefined) {
    expect(styles.color).toContain(expectedStyles.color);
  }
  
  if (expectedStyles.fontSize !== undefined) {
    expect(styles.fontSize).toBe(expectedStyles.fontSize);
  }
  
  if (expectedStyles.padding !== undefined) {
    expect(styles.padding).toContain(expectedStyles.padding);
  }
  
  if (expectedStyles.margin !== undefined) {
    expect(styles.margin).toContain(expectedStyles.margin);
  }
  
  if (expectedStyles.borderRadius !== undefined) {
    expect(styles.borderRadius).toContain(expectedStyles.borderRadius);
  }
  
  if (expectedStyles.borderWidth !== undefined) {
    expect(styles.borderWidth).toContain(expectedStyles.borderWidth);
  }
}

/**
 * 페이지 스크린샷을 찍고 Figma 디자인과 비교
 * 실제로는 visual regression testing을 위해 사용
 */
export async function takePageScreenshot(
  page: Page,
  selector: string,
  name: string
): Promise<Buffer> {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
  
  return await element.screenshot({
    path: `tests/pages/screenshots/${name}.png`,
    fullPage: false,
  });
}

/**
 * 레이아웃이 올바른지 검증 (요소들의 위치, 크기, 간격)
 */
export async function verifyLayout(
  page: Page,
  layoutChecks: Array<{
    selector: string;
    checks: {
      visible?: boolean;
      position?: { x?: number; y?: number };
      size?: { width?: number; height?: number };
      spacing?: { top?: number; bottom?: number; left?: number; right?: number };
    };
  }>
): Promise<void> {
  for (const check of layoutChecks) {
    const element = page.locator(check.selector).first();
    
    if (check.checks.visible !== undefined) {
      if (check.checks.visible) {
        await expect(element).toBeVisible();
      } else {
        await expect(element).not.toBeVisible();
      }
    }
    
    if (check.checks.position || check.checks.size || check.checks.spacing) {
      const box = await element.boundingBox();
      
      if (!box) {
        throw new Error(`Element ${check.selector} not found or not visible`);
      }
      
      if (check.checks.position) {
        if (check.checks.position.x !== undefined) {
          expect(box.x).toBe(check.checks.position.x);
        }
        if (check.checks.position.y !== undefined) {
          expect(box.y).toBe(check.checks.position.y);
        }
      }
      
      if (check.checks.size) {
        if (check.checks.size.width !== undefined) {
          expect(box.width).toBe(check.checks.size.width);
        }
        if (check.checks.size.height !== undefined) {
          expect(box.height).toBe(check.checks.size.height);
        }
      }
    }
  }
}
