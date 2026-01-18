# Figma URL Workflow for Page Creation

This workflow is used when user provides a Figma URL.

**Usage**:
```
/create-page {PageName} : {Figma URL}
```

Or:
```
@src/pages/{PageName}.tsx : {Figma URL}
```

## Step 0 — Select a small target set (MUST be explicit)
1. **Identify 3-5 "priority components"** to match first:
   - Extract from Figma page structure
   - Examples: Button, Input, Card, Modal, Header, Character, Icon
   - If you cannot extract them reliably from Figma, request direct component links immediately
2. **Document priority components** with their Figma node-ids

## Step 1 — Extract from Figma (DO NOT guess)

### 1.1. Check Cache First (MANDATORY)
**Before calling Figma API, check if cached files exist**:

1. **Generate cache key from node-id**:
   - Extract node-id from URL (e.g., `5089-16174` → `5089:16174` → cache key: `5089-16174`)
   - Cache file paths:
     * Screenshot: `.figma-cache/screenshots/{nodeId}.png` or `.figma-cache/screenshots/{pageName}-{nodeId}.png`
     * Design specs: `.figma-cache/specs/{nodeId}.json` or `.figma-cache/specs/{pageName}-{nodeId}.json`
     * Assets: `.figma-cache/assets/{nodeId}/` (for extracted icons/images)

2. **Check if cached files exist**:
   - Use `read_file` to check if screenshot exists: `.figma-cache/screenshots/{nodeId}.png`
   - Use `read_file` to check if specs exist: `.figma-cache/specs/{nodeId}.json`
   - If both exist and are recent → use cached files, skip API calls
   - If missing or outdated → proceed to extract from Figma

3. **Use cached files if available**:
   - Reference screenshot from `.figma-cache/screenshots/{nodeId}.png`
   - Reference design specs from `.figma-cache/specs/{nodeId}.json`
   - Skip `mcp_Figma_get_screenshot` and `mcp_Figma_get_design_context` if cache exists

### 1.2. Extract from Figma (Only if cache missing)
**Only call Figma API if cache is missing**:

For each priority component:
1. **Get structure**:
   - Use `mcp_Figma_get_metadata` to obtain structure (names/types/ids)
   - Use `mcp_Figma_get_design_context` with `artifactType: "REUSABLE_COMPONENT"` or `"COMPONENT_WITHIN_A_WEB_PAGE_OR_APP_SCREEN"`
   - Use `mcp_Figma_get_screenshot` as visual reference

2. **Save to cache** (MANDATORY after extraction):
   - **Save screenshot**: Use `mcp_Figma_get_screenshot` with `downloadPath: ".figma-cache/screenshots/{nodeId}.png"`
   - **Save design specs**: Extract design context and save as JSON:
     ```json
     {
       "nodeId": "5089:16174",
       "extractedAt": "2024-01-01T00:00:00Z",
       "layout": { ... },
       "spacing": { ... },
       "typography": { ... },
       "colors": { ... },
       "radius": { ... },
       "shadows": { ... }
     }
     ```
   - Save to `.figma-cache/specs/{nodeId}.json` using `write` tool

3. **Create Component Spec** per component with:
   - **Layout model**: flex/stack/grid
   - **Spacing**: padding, gap (exact px values)
   - **Typography**: font family, size, weight, line-height, letter-spacing (exact values)
   - **Colors**: bg/text/border (exact hex codes)
   - **Radius**: border radius (exact px)
   - **Shadow**: offset, blur, color (exact values)
   - **States/variants**: if present (default, hover, disabled, etc.)

4. **For full page**:
   - Use `mcp_Figma_get_design_context` with `artifactType: "WEB_PAGE_OR_APP_SCREEN"`
   - Extract node-id from URL (e.g., `5089-16174` → `5089:16174`)
   - Use `mcp_Figma_get_screenshot` with `downloadPath: ".figma-cache/screenshots/{nodeId}.png"`
   - Save design specs to `.figma-cache/specs/{nodeId}.json`

## Step 2 — Create/Update Tokens (MANDATORY if missing)
**Create tokens in ONE place** (choose based on stack):
- If Tailwind: extend `tailwind.config.js` + global CSS variables if needed
- Else: `src/tokens/*.ts` with TypeScript exports

**Tokens required**:
- **Colors**: surface/text/border/primary/secondary/brand
  - Location: `src/tokens/colors.ts` or `tailwind.config.js` theme.extend.colors
- **Typography**: font-family, size scale, weights, line-heights, letter-spacing
  - Location: `src/tokens/typography.ts` or `tailwind.config.js` theme.extend.fontSize/fontWeight/lineHeight
- **Spacing scale**: 4px base unit
  - Location: `src/tokens/spacing.ts` or `tailwind.config.js` theme.extend.spacing
- **Radius scale**: border radius values
  - Location: `src/tokens/radius.ts` or `tailwind.config.js` theme.extend.borderRadius
- **Shadow scale**: shadow values
  - Location: `tailwind.config.js` theme.extend.boxShadow

**Rule**: Components must reference tokens, not raw values, unless truly unique.

## Step 3 — Implement Components + Stories (Component-First)
For each priority component:
1. **Implement minimal structural component**:
   - Create/update component in `src/components/default/{ComponentName}/`
   - Use tokens from Step 2
   - Fix typography FIRST (font-family/weight/line-height/letter-spacing)

2. **Create Storybook story** that renders:
   - Default state
   - Primary variant(s)
   - Disabled/hover/focus if relevant
   - Ensure story layout is stable: wrap with padding and fixed background

3. **Story location**: `src/components/default/{ComponentName}/{ComponentName}.stories.tsx`

## Step 4 — Visual Parity Verification (Playwright-only runtime check)
**All captures must be deterministic**:

1. **Use Storybook route** for the story (not the full app page) whenever possible:
   - Navigate to: `http://localhost:6006/?path=/story/{component-path}`
   - Or use full app page if component is not in Storybook: `http://localhost:5173/{route}`

2. **Playwright settings** (MANDATORY):
   ```javascript
   viewport: { width: 360, height: 800 } // Match Figma design
   deviceScaleFactor: 1
   wait for networkidle
   wait for fonts: await page.evaluate(() => document.fonts.ready)
   disable animations/transitions via injected CSS:
     await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' })
   ensure no hover/focus/caret: click blank area
   ```

3. **Capture**:
   - Screenshot the Storybook canvas region only (clip), not the entire page
   - Or screenshot full page if using app route
   - Use `mcp_playwright_playwright_screenshot` with appropriate settings

4. **Comparison**:
   - Compare with the Figma screenshot visually (qualitative)
   - List top 3 differences in order:
     * Typography (font-family/size/weight/line-height/letter-spacing)
     * Spacing (padding/gap/margin)
     * Layout (flex direction/alignment/positioning)
     * Icons (size/color/position)
     * Effects (border/shadow/radius)

5. **Iteration Loop (Max 3 iterations)**:
   - **Iteration 1**: Apply ONE focused fix in this order: typography → spacing → layout → icon → effects
   - Re-capture with Playwright
   - Re-compare with Figma screenshot
   - **Iteration 2**: If not matching, apply next fix
   - Re-capture with Playwright
   - Re-compare with Figma screenshot
   - **Iteration 3**: If still not matching, apply final fix
   - Re-capture with Playwright
   - Re-compare with Figma screenshot

6. **Stop after 3 iterations**:
   - **If matching after 3 iterations**: Proceed to next step
   - **If still not matching after 3 iterations**: 
     * Create checklist file: `docs/components/{ComponentName}-TODO.md`
     * Use template from `docs/components/TODO-template.md`
     * Format as markdown checklist with exact remaining differences
     * Include for each issue:
       - Expected values (from Figma screenshot/design context)
       - Current values (from Playwright screenshot)
       - Location (element selector or component path)
       - Specific fix needed
     * **Stop fixing** - wait for next user request to address checklist
     * **Inform user**: "컴포넌트 레벨에서 3번의 반복 후에도 일치하지 않는 항목이 있어 `docs/components/{ComponentName}-TODO.md`에 체크리스트를 생성했습니다."

## Step 5 — Compose Page (After Components Match)
Only after components achieve parity in Storybook:

1. **Create page component**: `src/pages/{PageName}.tsx`
2. **Import verified components** from `@/components/default`
3. **Structure with**:
   - Topbar (if present)
   - Main content area with proper spacing (use tokens)
   - Sections with semantic HTML

4. **Apply Design System**:
   - Use color tokens (no hardcoded colors)
   - Use spacing tokens (gap/gap-m, gap/gap-s, etc.)
   - Use typography tokens
   - Follow component usage rules

## Step 6 — Page-Level Visual Verification
**MANDATORY: Take and compare screenshots - CRITICAL STEP**:

1. **Get Figma screenshot FIRST** (Check cache first):
   - **Check cache**: Look for `.figma-cache/screenshots/{nodeId}.png` or `.figma-cache/screenshots/{pageName}-{nodeId}.png`
   - **If cached screenshot exists**: Use cached file, skip API call
   - **If cache missing**: 
     * Use `mcp_Figma_get_screenshot` with the exact node-id from Step 1
     * **Save to cache**: Use `downloadPath: ".figma-cache/screenshots/{nodeId}.png"` parameter
   - Save the description/details of the Figma design
   - Note all visual details: colors, sizes, spacing, layout, text arrangement

2. **Get Playwright screenshot of current implementation**:
   - Start dev server if not running: `pnpm dev` or `pnpm start`
   - Use `mcp_playwright_playwright_navigate` to navigate to the page URL (typically `http://localhost:5173` or similar)
   - Set viewport to match Figma design (typically mobile: width=360, height=800)
   - **Apply deterministic settings**:
     * Wait for networkidle
     * Wait for fonts: `await page.evaluate(() => document.fonts.ready)`
     * Disable animations: inject CSS `* { animation: none !important; transition: none !important; }`
     * Ensure no hover/focus/caret (click blank area)
   - Use `mcp_playwright_playwright_screenshot` with `fullPage: true` to capture entire page
   - Save screenshot with descriptive name (e.g., `playwright-{pagename}-current`)

3. **SIDE-BY-SIDE COMPARISON - MANDATORY**:
   - **Compare Figma screenshot description with Playwright screenshot description**
   - **List EVERY difference** you observe in this order:
     * **Typography**: font-family, sizes, weights, line-heights, letter-spacing (FIX FIRST)
     * **Spacing**: padding, gap, margin (FIX SECOND)
     * **Layout**: flex direction, alignment, positioning (FIX THIRD)
     * **Colors**: background, text, border, icon colors (FIX FOURTH)
     * **Icons**: sizes, colors, positions (FIX FIFTH)
     * **Effects**: borders, shadows, radius (FIX SIXTH)
   - **Document all discrepancies** in a structured list
   - **DO NOT proceed to fix until you have completed this comparison**

4. **Fix discrepancies in order (Max 3 iterations)**:
   - **Iteration 1**: Fix typography FIRST (most common source of visual mismatch)
     * Re-take Playwright screenshot
     * Re-compare with Figma screenshot
   - **Iteration 2**: If not matching, fix spacing
     * Re-take Playwright screenshot
     * Re-compare with Figma screenshot
   - **Iteration 3**: If still not matching, fix layout
     * Re-take Playwright screenshot
     * Re-compare with Figma screenshot
   - **After 3 iterations**:
     * **If matching**: Proceed to next step
     * **If still not matching**: 
       - Create checklist file: `docs/pages/{PageName}-TODO.md`
       - Use template from `docs/pages/TODO-template.md`
       - Format as markdown checklist with exact remaining differences
       - Include for each issue:
         * Expected (Figma screenshot/design context)
         * Current (Playwright screenshot)
         * Location (element selector or component path)
         * Specific fix needed
       - **Stop fixing** - wait for next user request to address checklist
       - **Inform user**: "페이지 레벨에서 3번의 반복 후에도 일치하지 않는 항목이 있어 `docs/pages/{PageName}-TODO.md`에 체크리스트를 생성했습니다. 다음 요청에서 이 항목들을 수정하겠습니다."

## Step 7 — Handle Overlapping Elements
**Choose appropriate positioning** (absolute or fixed):

1. **Identify overlapping elements**: Elements that visually overlap (e.g., cards overlapping header/content boundaries)

2. **Choose positioning strategy**:
   - **`absolute`**: Use when element should be positioned relative to its nearest positioned ancestor
     * Best for: Elements that should scroll with their parent container
     * Example: Statistics card overlapping header and main content, positioned relative to header
     * Ensure parent has `position: relative` or appropriate positioning context
   - **`fixed`**: Use when element should be positioned relative to viewport and stay in place during scroll
     * Best for: Sticky headers, floating action buttons, modals, tooltips
     * Example: Navigation bar that stays at top during scroll
     * Consider: May need z-index management and viewport calculations

3. **Decision criteria**:
   - If element should scroll with page content → use `absolute`
   - If element should stay fixed in viewport → use `fixed`
   - If element overlaps but should move with parent → use `absolute` with `relative` parent
   - If element needs to overlay entire page → use `fixed` with appropriate z-index

4. **Implementation**:
   - Apply positioning even if Figma doesn't explicitly show it
   - Use `transform` (translate-x, translate-y) for precise centering and offset
   - Use appropriate z-index values to control stacking order
   - Ensure parent containers have correct positioning context
   - Test scrolling behavior to verify positioning choice is correct

## Step 8 — Add Routing
1. Check if `src/App.tsx` contains routing setup:
   - If it already has `BrowserRouter` and `Routes`, add the new route
   - If it contains README/guide content, replace it with routing setup
2. Import the new page component in `src/App.tsx`
3. Add a Route for the page:
   ```tsx
   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   import {PageName} from './pages/{PageName}';
   
   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/{route-path}" element={<{PageName} />} />
           {/* Add more routes here */}
         </Routes>
       </BrowserRouter>
     );
   }
   ```

## Step 9 — Create Playwright Visual Test
1. Create test file: `tests/pages/{pagename}.spec.ts`
2. Use helpers from `tests/pages/helpers.ts`:
   - `waitForPageLoad()` - 페이지 로드 대기
   - `verifyElementMatchesDesign()` - 요소 스타일 검증
   - `verifyLayout()` - 레이아웃 검증
   - `takePageScreenshot()` - 스크린샷 촬영
3. **Apply deterministic settings** in test:
   - Wait for fonts: `await page.evaluate(() => document.fonts.ready)`
   - Disable animations: inject CSS
   - Fixed viewport
   - Wait for networkidle

## Step 10 — Final Verification
- Check linter errors using `read_lints`
- Verify design tokens usage (no hardcoded values)
- **Run lint**: Execute `pnpm lint`
- **Run build**: Execute `pnpm build`
- **Run Playwright tests**: Execute `pnpm test` or `npx playwright test tests/pages/{pagename}.spec.ts`
- Fix any errors and re-verify

## Step 11: Analyze Page and Identify Enhancement Opportunities
1. **Review the created page**:
   - Read the page component code
   - Analyze functionality and user interactions
   - Check for missing features or incomplete implementations
   - Identify areas that need business logic or API integration

2. **Identify potential enhancements**:
   - **State management**: Are there hardcoded values that should come from API/context?
   - **User interactions**: Are button clicks, form submissions, navigation properly handled?
   - **Data fetching**: Does the page need to fetch data from an API?
   - **Error handling**: Are error states and loading states implemented?
   - **Accessibility**: Are all interactive elements accessible?
   - **Performance**: Are there optimization opportunities?
   - **Business logic**: Are there conditional flows that need clarification?

3. **Ask user about enhancements**:
   - For each identified opportunity, ask the user:
     - "이 페이지에서 [기능/로직]이 필요할까요? 예를 들어 [구체적 설명]"
     - "사용자가 [액션]을 할 때 어떤 동작이 일어나야 하나요?"
     - "이 데이터는 어디서 가져와야 하나요? (API, 로컬 스토리지, Context 등)"
   
4. **If user confirms enhancement**:
   - Implement the enhancement immediately
   - Update tests if needed
   - Re-run verification steps

5. **If enhancement is unclear or not needed yet**:
   - Create TODO entry in `docs/pages/{PageName}-TODO.md`
   - Document the identified opportunity with:
     - Description of what needs to be done
     - Why it might be needed
     - Potential implementation approach
     - Questions that need to be answered
