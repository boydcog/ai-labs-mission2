# Hybrid Workflow: Figma URL + Anima Code

**⚠️ MANDATORY**: When both Figma URL and Anima code are provided, you MUST extract and use BOTH sources. Do NOT skip either.

This workflow combines Figma URL and Anima code to leverage the strengths of both:
- **Figma URL**: Provides icons, images, exact design specs, and visual reference
- **Anima Code**: Provides structure, layout, and component hierarchy

**Decision Making**: You decide which source to prioritize for each aspect:
- **Figma takes precedence for**: Visual specs (colors, spacing, typography), assets (icons, images), visual verification
- **Anima takes precedence for**: Component structure, layout patterns, code organization
- **Combine intelligently**: Use the best from each source

**Usage**:
```
/create-page {PageName} : {Figma URL} + {Anima Code}
```

Or:
```
/create-page {PageName}
Figma URL: {Figma URL}
Anima Code:
[Paste Anima generated React/TSX code here]
```

## Why Hybrid Approach?

### Limitations of Anima Code Alone:
- ❌ **Icons**: Custom SVG icons are not extracted (e.g., `focus-icon.svg`, `imagination-icon.svg`)
- ❌ **Images**: Character images and custom graphics are not extracted
- ❌ **Design Specs**: Exact colors, spacing, typography may be approximated
- ❌ **Visual Reference**: No screenshot for comparison

### Benefits of Combining:
- ✅ **Icons**: Extract custom SVG icons from Figma
- ✅ **Images**: Extract character images and graphics from Figma
- ✅ **Design Specs**: Get exact values from Figma design tokens
- ✅ **Visual Reference**: Use Figma screenshot for verification
- ✅ **Structure**: Use Anima code for component hierarchy and layout
- ✅ **Best of Both**: Combine Figma's design accuracy with Anima's code structure

## Step H1 — Extract from Both Sources (MANDATORY)

**⚠️ CRITICAL**: You MUST extract from BOTH sources. Do NOT skip Figma extraction or Anima code analysis.

### 1. Extract from Figma URL (MANDATORY):
**You MUST do this first or in parallel with Anima analysis**:

1. **Check cache first** (MANDATORY):
   - **Generate cache key**: Extract node-id from URL (e.g., `5089-16174` → `5089:16174` → cache key: `5089-16174`)
   - **Check for cached files**:
     * Screenshot: `.figma-cache/screenshots/{nodeId}.png` or `.figma-cache/screenshots/{pageName}-{nodeId}.png`
     * Design specs: `.figma-cache/specs/{nodeId}.json` or `.figma-cache/specs/{pageName}-{nodeId}.json`
   - **If cached files exist**: Use cached files, skip API calls
   - **If cache missing**: Proceed to extract from Figma API

2. **Get design context** (Only if cache missing):
   - Use `mcp_Figma_get_design_context` with `artifactType: "WEB_PAGE_OR_APP_SCREEN"`
   - Extract node-id from URL (e.g., `5089-16174` → `5089:16174`)
   - **Save design specs to cache**: Extract design context and save as JSON to `.figma-cache/specs/{nodeId}.json`
   - Use `mcp_Figma_get_screenshot` with `downloadPath: ".figma-cache/screenshots/{nodeId}.png"`
   - **Do NOT skip this step if cache is missing**

3. **Extract assets** (MANDATORY if available in Figma):
   - **Icons**: Identify all custom icons and extract SVG paths
     * Use `mcp_Figma_get_design_context` for icon nodes
     * Extract SVG code for custom icons
     * Save to `src/assets/images/icons/{icon-name}.svg`
     * **Also save to cache**: `.figma-cache/assets/{nodeId}/icons/{icon-name}.svg` (optional, for reference)
     * **Do NOT use Anima placeholder icons if Figma has the real icons**
   - **Images**: Identify character images and graphics
     * Extract SVG code for characters
     * Save to `src/assets/images/characters/{character-name}.svg`
     * **Also save to cache**: `.figma-cache/assets/{nodeId}/characters/{character-name}.svg` (optional, for reference)
     * **Do NOT use Anima placeholder images if Figma has the real images**
   - **Design tokens**: Extract exact colors, spacing, typography from Figma
     * **These will be used as source of truth**
     * **Save to cache**: Include in `.figma-cache/specs/{nodeId}.json`

4. **Create Component Spec** from Figma:
   - Layout model (flex/stack/grid)
   - Spacing (padding, gap - exact px values)
   - Typography (font family, size, weight, line-height, letter-spacing)
   - Colors (bg/text/border - exact hex codes)
   - Radius, shadows, borders
   - **Save to cache**: Include in `.figma-cache/specs/{nodeId}.json`

### 2. Analyze Anima Code (MANDATORY):
**You MUST do this in parallel or after Figma extraction**:

1. **Extract structure**:
   - Component hierarchy and nesting
   - Layout structure (flex direction, alignment)
   - Component composition patterns
   - State management patterns
   - **This provides the code structure to follow**

2. **Identify reusable patterns**:
   - Button implementations → map to `Button` component
   - Input implementations → map to `Input` component
   - Card implementations → map to `Card` component
   - List implementations → map to `List` component
   - **Use Anima structure as starting point**

3. **Document differences**:
   - Where Anima structure differs from Figma
   - Where Anima uses different component patterns
   - Where Anima has additional logic/state
   - **Use this to decide which source to prioritize for each aspect**

### 3. Combine Both Sources:
**After extracting from both, combine intelligently**:
- Use Figma for: Visual specs, assets, verification reference
- Use Anima for: Structure, layout patterns, code organization
- Resolve conflicts: Figma takes precedence for visual specs, Anima for structure

## Step H2 — Create/Update Tokens (Use Figma as Source of Truth)

**Figma takes precedence for design tokens**:
1. **Extract tokens from Figma** (primary source):
   - Colors: Use exact hex codes from Figma
   - Typography: Use exact values from Figma
   - Spacing: Use exact values from Figma
   - Radius/Shadow: Use exact values from Figma

2. **Cross-reference with Anima code**:
   - If Anima has different values → use Figma values
   - If Anima has additional values not in Figma → verify if needed
   - Document any discrepancies

3. **Create/update tokens**:
   - Check if tokens exist in `src/tokens/*.ts` or `tailwind.config.js`
   - Create missing tokens based on Figma values
   - Update existing tokens if Figma values differ

## Step H3 — Extract and Save Assets from Figma

1. **Extract custom icons**:
   - For each icon identified in Figma:
     * Get icon node-id
     * Use `mcp_Figma_get_design_context` to get SVG code
     * Save to `src/assets/images/icons/{icon-name}.svg`
     * Example: `focus-icon.svg`, `imagination-icon.svg`, `association-icon.svg`

2. **Extract character images**:
   - For each character identified in Figma:
     * Get character node-id
     * Use `mcp_Figma_get_design_context` to get SVG code
     * Save to `src/assets/images/characters/{character-name}.svg`
     * Example: `main-character.svg`

3. **Configure SVG imports**:
   - Ensure `vite-plugin-svgr` is configured in `vite.config.ts`
   - Ensure TypeScript declarations in `src/vite-env.d.ts`:
     ```typescript
     /// <reference types="vite-plugin-svgr/client" />
     ```

4. **Import as React components**:
   ```tsx
   import FocusIconSvg from '@/assets/images/icons/focus-icon.svg?react';
   import MainCharacterSvg from '@/assets/images/characters/main-character.svg?react';
   ```

## Step H4 — Map Anima Structure to Figma Design

1. **Use Anima code for structure**:
   - Component hierarchy
   - Layout patterns (flex/grid)
   - Component composition
   - State management

2. **Use Figma for styling**:
   - Replace Anima inline styles with Figma-based tokens
   - Use exact Figma colors, spacing, typography
   - Use Figma-extracted icons and images

3. **Combine both**:
   - Structure from Anima
   - Styling from Figma
   - Assets (icons/images) from Figma
   - Component mapping to codebase components

## Step H5 — Implement Components

1. **Create/update components**:
   - Use Anima code structure as starting point
   - Replace Anima styling with Figma-based tokens
   - Replace Anima icons with Figma-extracted SVG imports
   - Map to existing codebase components where possible

2. **Icon handling**:
   - **Custom icons**: Use Figma-extracted SVG imports
     ```tsx
     import FocusIconSvg from '@/assets/images/icons/focus-icon.svg?react';
     <FocusIconSvg className="w-8 h-8" />
     ```
   - **Standard icons**: Use `Icon` component from `@/components/default`
     ```tsx
     <Icon type="line" name="attention" size={16} />
     ```

3. **Image handling**:
   - **Characters**: Use Figma-extracted SVG imports
     ```tsx
     import MainCharacterSvg from '@/assets/images/characters/main-character.svg?react';
     <MainCharacterSvg className="w-full h-full" />
     ```

## Step H6 — Convert Anima Code to Codebase Patterns

Follow Step A3-A6 from `.cursor/commands/create-page-anima.md`:
- Convert inline styles to Tailwind (using Figma tokens)
- Map to existing components
- Add TypeScript types
- Refactor to codebase structure

**Key difference**: Use Figma tokens instead of extracting from Anima code.

## Step H7 — Visual Verification

Follow Step 6 from `.cursor/commands/create-page-figma.md`:
1. **Get Figma screenshot** (Check cache first):
   - Check `.figma-cache/screenshots/{nodeId}.png` first
   - If cache exists, use cached screenshot
   - If cache missing, use `mcp_Figma_get_screenshot` with `downloadPath: ".figma-cache/screenshots/{nodeId}.png"`
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
   - **If matching**: Proceed to Step H8
   - **If still not matching**: 
     * Create checklist file: `docs/pages/{PageName}-TODO.md`
     * Use template from `docs/pages/TODO-template.md`
     * Format as markdown checklist with exact remaining differences
     * Include for each issue:
       - Expected (Figma screenshot/design context)
       - Current (Playwright screenshot)
       - Location (element selector or component path)
       - Specific fix needed
     * **Stop fixing** - wait for next user request to address checklist
     * **Inform user**: "3번의 반복 후에도 일치하지 않는 항목이 있어 `docs/pages/{PageName}-TODO.md`에 체크리스트를 생성했습니다. 다음 요청에서 이 항목들을 수정하겠습니다."

## Step H8 — Final Verification

- Check linter errors using `read_lints`
- Verify design tokens usage (all from Figma, no Anima hardcoded values)
- Verify all icons/images are from Figma (not Anima placeholders)
- **Run lint**: Execute `pnpm lint`
- **Run build**: Execute `pnpm build`
- **Run Playwright tests**: Execute `pnpm test` or `npx playwright test tests/pages/{pagename}.spec.ts`
- Fix any errors and re-verify

## MANDATORY RULES for Hybrid Workflow

### DO:
- **Check cache first** - Always check `.figma-cache/screenshots/{nodeId}.png` and `.figma-cache/specs/{nodeId}.json` before calling Figma API
- **Save to cache** - Always save screenshots with `downloadPath: ".figma-cache/screenshots/{nodeId}.png"` and specs to `.figma-cache/specs/{nodeId}.json`
- **Extract from BOTH sources** - You MUST extract from Figma AND analyze Anima code
- **Use Figma as source of truth** for all design tokens (colors, spacing, typography)
- **Extract all icons and images from Figma** (not from Anima code)
- **Use Anima code for structure** (component hierarchy, layout patterns)
- **Combine both sources intelligently** - Decide which to prioritize for each aspect
- **Verify visual parity** with Figma screenshot (use cached screenshot if available)
- **Start with Figma extraction** - Get design context and assets first, then use Anima for structure

### DON'T:
- **Do NOT** call Figma API if cache exists - check `.figma-cache/` first
- **Do NOT** skip saving to cache - always save after extraction
- **Do NOT** commit cache files - `.figma-cache/` is gitignored
- **Do NOT** skip Figma extraction when both are provided - it's MANDATORY
- **Do NOT** skip Anima code analysis when both are provided - it's MANDATORY
- **Do NOT** use only one source when both are available
- **Do NOT** use Anima hardcoded values if Figma has different values
- **Do NOT** use Anima placeholder icons/images - extract from Figma
- **Do NOT** skip asset extraction from Figma
- **Do NOT** assume Anima code matches Figma exactly
- **Do NOT** prioritize one source over the other without analyzing both first
