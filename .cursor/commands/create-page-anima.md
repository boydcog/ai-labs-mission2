# Anima Code Integration Workflow

This workflow is used when user provides Anima-generated code instead of Figma URL.

**Usage**:
```
/create-page {PageName} : {Anima Code}
```

Or provide Anima code directly:
```
/create-page {PageName}
[Paste Anima generated React/TSX code here]
```

## Step A1 — Analyze Anima Code
1. **Receive Anima generated code**:
   - User provides Anima React/TSX code
   - Code may be in JSX, TSX, or HTML format
   - May contain inline styles, hardcoded values, or CSS modules

2. **Identify code structure**:
   - Extract component structure (functional/class components)
   - Identify all hardcoded values:
     * Colors (hex codes, rgb values)
     * Spacing (px values, margins, paddings)
     * Typography (font sizes, weights, line heights)
     * Border radius, shadows, borders
   - Identify inline styles vs className usage
   - Identify missing TypeScript types
   - Identify components that can be mapped to existing codebase components

3. **Create mapping document**:
   - List all hardcoded values found
   - Map Anima components to existing codebase components (Button, Input, Card, etc.)
   - Identify new components that need to be created
   - Document layout structure (flex/grid/absolute positioning)

## Step A2 — Extract and Create Tokens
1. **Extract design values from Anima code**:
   - Colors: Extract all unique hex/rgb values
   - Typography: Extract font families, sizes, weights, line heights
   - Spacing: Extract all padding, margin, gap values
   - Radius: Extract border radius values
   - Shadows: Extract shadow values

2. **Create/update tokens** (same as Step 2 in standard workflow):
   - Check if tokens exist in `src/tokens/*.ts` or `tailwind.config.js`
   - Create missing tokens
   - Map Anima values to token names
   - Document token mapping

3. **Token mapping rules**:
   - If exact match exists in tokens → use existing token
   - If close match exists → update token or create variant
   - If completely new → create new token with semantic name
   - Never hardcode values in final code

## Step A3 — Convert Inline Styles to Tailwind
1. **Replace inline styles**:
   - Convert `style={{ ... }}` to Tailwind utility classes
   - Map colors to token-based classes (e.g., `bg-[#2a69e9]` → `bg-primary` or token)
   - Map spacing to token-based classes (e.g., `padding: '20px'` → `p-5` or spacing token)
   - Map typography to token-based classes

2. **Handle complex styles**:
   - If Tailwind doesn't support → use CSS variables or extend Tailwind config
   - If truly unique → document why it can't use tokens
   - Preserve layout structure (flex, grid, positioning)

3. **Remove unnecessary code**:
   - Remove unused imports
   - Remove commented code
   - Remove Anima-specific code/comments

## Step A4 — Map to Existing Components
1. **Identify mappable elements**:
   - Buttons → `Button` component from `@/components/default`
   - Inputs → `Input` component
   - Cards → `Card` component
   - Icons → `Icon` component
   - Lists → `List` and `ListItem` components
   - Progress → `ProgressBar` or `ProgressCircle`

2. **Replace Anima components**:
   - Replace Anima button code with `<Button>` component
   - Map props correctly (hierarchy, height, type, status)
   - Replace Anima input code with `<Input>` component
   - Map all other components similarly

3. **Handle unmappable components**:
   - If component doesn't exist in codebase → create new component following codebase patterns
   - Create component in `src/components/default/{ComponentName}/`
   - Follow existing component structure (ComponentName.tsx, ComponentName.types.ts, ComponentName.stories.tsx, index.ts)

## Step A5 — Add TypeScript Types
1. **Add proper types**:
   - Replace `any` types with proper TypeScript types
   - Add interface/type definitions for props
   - Use existing types from codebase when possible
   - Create new types following codebase patterns

2. **Type safety**:
   - Ensure all props are typed
   - Ensure state is typed
   - Ensure event handlers are typed
   - Use strict TypeScript settings

## Step A6 — Refactor to Codebase Structure
1. **Apply codebase patterns**:
   - Use same file structure as existing pages
   - Use same import patterns
   - Use same naming conventions
   - Follow `.cursor/rules/code-standards.mdc`

2. **Page structure**:
   ```tsx
   import { useState } from 'react';
   import { Button, Input, Card, ... } from '@/components/default';
   
   function PageName() {
     // State management
     const [state, setState] = useState();
     
     return (
       <div className="w-full min-h-screen bg-white">
         <div className="w-full max-w-[360px] mx-auto">
           {/* Content */}
         </div>
       </div>
     );
   }
   
   export default PageName;
   ```

3. **Component structure** (if creating new components):
   - Follow structure in `src/components/default/{ComponentName}/`
   - Include types file
   - Include Storybook stories
   - Include index.ts export

## Step A7 — Visual Verification
Follow the same visual verification process as Step 6 in standard workflow (see `create-page.md`):
1. Get Figma screenshot (if available) or use Anima code as reference
2. Get Playwright screenshot
3. Compare side-by-side
4. **Fix discrepancies in order (Max 3 iterations)**:
   - **Iteration 1**: Fix typography → spacing → layout → colors → icons → effects (one fix)
   - Re-take Playwright screenshot and compare
   - **Iteration 2**: If not matching, apply next fix
   - Re-take Playwright screenshot and compare
   - **Iteration 3**: If still not matching, apply final fix
   - Re-take Playwright screenshot and compare
5. **After 3 iterations**:
   - **If matching**: Proceed to Step A8
   - **If still not matching**: 
     * Create checklist file: `docs/pages/{PageName}-TODO.md`
     * Use template from `docs/pages/TODO-template.md`
     * Format as markdown checklist with exact remaining differences
     * Include for each issue:
       - Expected (Figma screenshot if available, or Anima code reference)
       - Current (Playwright screenshot)
       - Location (element selector or component path)
       - Specific fix needed
     * **Stop fixing** - wait for next user request to address checklist
     * **Inform user**: "3번의 반복 후에도 일치하지 않는 항목이 있어 `docs/pages/{PageName}-TODO.md`에 체크리스트를 생성했습니다. 다음 요청에서 이 항목들을 수정하겠습니다."

## Step A8 — Final Verification
- Check linter errors using `read_lints`
- Verify design tokens usage (no hardcoded values)
- Verify all Anima code has been converted
- **Run lint**: Execute `pnpm lint`
- **Run build**: Execute `pnpm build`
- **Run Playwright tests**: Execute `pnpm test` or `npx playwright test tests/pages/{pagename}.spec.ts`
- Fix any errors and re-verify

## MANDATORY RULES for Anima Integration

### DO:
- Convert all inline styles to Tailwind
- Map all hardcoded values to tokens
- Replace Anima components with codebase components when possible
- Add proper TypeScript types
- Follow codebase structure and patterns
- Verify visual parity with Playwright

### DON'T:
- Do NOT leave Anima code as-is
- Do NOT hardcode values from Anima code
- Do NOT skip token creation
- Do NOT skip component mapping
- Do NOT skip TypeScript types
