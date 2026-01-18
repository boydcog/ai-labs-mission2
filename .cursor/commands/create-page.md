# Create Page from Figma Design

**Role**: You are a "Figma-to-Frontend Visual Parity Engineer".
**Top Priority**: Minimize visual differences between Figma and the running UI.
**Optimization Goal**: Do NOT optimize for speed. Optimize for correctness and repeatability.

## Core Principles (MUST FOLLOW)

### 1. Token-First
- **DO NOT** hardcode random px/hex values if they correspond to reusable design tokens
- **IF tokens do not exist**, create tokens FIRST (colors/typography/spacing/radius/shadow)
- Components must reference tokens, not raw values, unless truly unique
- Token locations:
  - Colors: `src/tokens/colors.ts` or `tailwind.config.js`
  - Typography: `src/tokens/typography.ts` or `tailwind.config.js`
  - Spacing: `src/tokens/spacing.ts` or `tailwind.config.js`
  - Radius/Shadow: `src/tokens/radius.ts`, `src/tokens/borderWidth.ts` or `tailwind.config.js`

### 2. Typography-First
- **Visual mismatch is usually typography**
- Fix font-family/weight/line-height/letter-spacing BEFORE layout tweaks
- Extract exact typography values from Figma:
  - Font family (Pretendard, Inter, etc.)
  - Font size (px values)
  - Font weight (400, 500, 600, 700)
  - Line height (px or ratio)
  - Letter spacing (px)

### 3. Component-First
- **Achieve parity for top components in Storybook FIRST**
- Only after components match, compose pages
- Identify 3-5 "priority components" to match first (e.g., Button, Input, Card, Modal, Header)
- If you cannot extract them reliably from Figma, request direct component links immediately

### 4. Deterministic Verification
- All visual comparisons must be done under stable capture conditions:
  - Fonts loaded: `document.fonts.ready`
  - Animations off: inject CSS to disable animations/transitions
  - Scale fixed: `deviceScaleFactor: 1`
  - Viewport fixed: match Figma design (typically 360x800 for mobile)
  - Wait for networkidle
  - Ensure no hover/focus/caret (click blank area)

### 5. Tight Feedback Loop (Max 3 Iterations)
- **One change per iteration**
- Re-capture after each change
- Re-evaluate after each capture
- **Stop after MAX 3 iterations** (component or page level)
- **If still not matching after 3 iterations**: Create checklist file with remaining issues
  - **For pages**: Save to `docs/pages/{PageName}-TODO.md`
  - **For components**: Save to `docs/components/{ComponentName}-TODO.md`
  - **Use template**: Copy from `docs/pages/TODO-template.md` or `docs/components/TODO-template.md`
  - **Format requirements**:
    * Markdown checklist format (`- [ ]`)
    * Include: Expected (Figma), Current (Playwright), Location (element selector)
    * Group by category: Typography, Spacing, Layout, Colors, Icons, Effects
    * Include specific values and element selectors for each issue
  - **Do NOT continue fixing** - wait for next user request to address checklist items
  - **Inform user**: "3번의 반복 후에도 일치하지 않는 항목이 있어 `docs/pages/{PageName}-TODO.md`에 체크리스트를 생성했습니다. 다음 요청에서 이 항목들을 수정하겠습니다."

## Non-goals (for now)
- Responsive behavior is optional and should not be implemented unless explicitly requested
- Do not attempt full-page 1-shot reproduction. Start with component-level parity

## Usage

### Option 1: Figma URL (Standard)
```
/create-page {PageName} : {Figma URL}
```

Or:
```
@src/pages/{PageName}.tsx : {Figma URL}
```

### Option 2: Anima Generated Code (Alternative)
```
/create-page {PageName} : {Anima Code}
```

Or provide Anima code directly:
```
/create-page {PageName}
[Paste Anima generated React/TSX code here]
```

### Option 3: Figma URL + Anima Code (Recommended for Anima)
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

**Why combine?** Anima code alone cannot provide:
- Custom SVG icons (extract from Figma)
- Character images (extract from Figma)
- Exact design specs (use Figma as source of truth)
- Visual reference for verification (use Figma screenshot)

## Workflow Selection

**When user provides Figma URL only**: Follow Figma workflow in `.cursor/commands/create-page-figma.md` (Step 0-11)
**When user provides Anima code only**: Follow Anima integration workflow in `.cursor/commands/create-page-anima.md` (Step A1-A8)
**When user provides Figma URL + Anima code**: Follow Hybrid workflow in `.cursor/commands/create-page-hybrid.md` (Step H1-H8) - **MANDATORY: Use BOTH sources**

**⚠️ CRITICAL**: If both Figma URL and Anima code are provided, you MUST:
1. Extract from BOTH sources (do not skip either)
2. Use Figma as source of truth for design specs (colors, spacing, typography, assets)
3. Use Anima code for component structure and layout patterns
4. Combine both sources intelligently (you decide which to prioritize for each aspect)
5. If there are conflicts, Figma takes precedence for visual specs, Anima for structure

---

## Figma URL Workflow

**When user provides Figma URL**, follow the detailed workflow in `.cursor/commands/create-page-figma.md`.

The Figma workflow includes:
- Step 0: Select priority components
- Step 1: Extract from Figma
- Step 2: Create/update tokens
- Step 3: Implement components + stories
- Step 4: Visual parity verification
- Step 5: Compose page
- Step 6: Page-level visual verification
- Step 7: Handle overlapping elements
- Step 8: Add routing
- Step 9: Create Playwright visual test
- Step 10: Final verification
- Step 11: Analyze and identify enhancements

See `.cursor/commands/create-page-figma.md` for detailed steps.

---

## Anima Integration Workflow

**When user provides Anima generated code only**, follow the workflow in `.cursor/commands/create-page-anima.md` (Step A1-A8).

**⚠️ LIMITATION**: Anima code alone cannot provide custom SVG icons, character images, or exact design specs. 

**RECOMMENDED**: Use Hybrid workflow (Figma URL + Anima Code) instead. See `.cursor/commands/create-page-hybrid.md`.

The Anima-only workflow includes:
- Analyzing Anima code structure
- Extracting and creating tokens (from Anima code - may be approximate)
- Converting inline styles to Tailwind
- Mapping to existing components
- Adding TypeScript types
- Refactoring to codebase structure
- Visual verification (without Figma reference)
- Final verification

See `.cursor/commands/create-page-anima.md` for detailed steps.

## Hybrid Workflow (Figma URL + Anima Code) - MANDATORY

**When user provides both Figma URL and Anima code**, you MUST follow the workflow in `.cursor/commands/create-page-hybrid.md` (Step H1-H8).

**⚠️ MANDATORY RULE**: If both are provided, you MUST extract and use BOTH sources. Do NOT skip either.

**Decision Making**: You decide which source to prioritize for each aspect:
- **Figma takes precedence for**: Visual specs (colors, spacing, typography), assets (icons, images), visual verification
- **Anima takes precedence for**: Component structure, layout patterns, code organization
- **Combine intelligently**: Use the best from each source

**Why use both?** Best of both worlds:
- ✅ Custom SVG icons can be extracted from Figma
- ✅ Character images can be extracted from Figma
- ✅ Exact design specs from Figma (colors, spacing, typography)
- ✅ Visual reference for verification (Figma screenshot)
- ✅ Component structure from Anima code
- ✅ Layout patterns from Anima code
- ✅ Faster implementation with Anima structure

The Hybrid workflow includes:
- Step H1: Extract from BOTH sources (Figma for assets/specs, Anima for structure) - **MANDATORY: Extract from both**
- Step H2: Create/update tokens (use Figma as source of truth, validate with Anima)
- Step H3: Extract and save assets from Figma (icons, images) - **MANDATORY if available in Figma**
- Step H4: Map Anima structure to Figma design (combine both)
- Step H5: Implement components (combine both sources intelligently)
- Step H6: Convert Anima code to codebase patterns (while respecting Figma specs)
- Step H7: Visual verification (using Figma screenshot as reference)
- Step H8: Final verification

See `.cursor/commands/create-page-hybrid.md` for detailed steps.

---

## MANDATORY RULES - STRICT ENFORCEMENT

### DO:
- **Check cache before calling Figma API** - Always check `.figma-cache/screenshots/{nodeId}.png` and `.figma-cache/specs/{nodeId}.json` first
- **Save Figma screenshots to cache** - Use `downloadPath: ".figma-cache/screenshots/{nodeId}.png"` when calling `mcp_Figma_get_screenshot`
- **Save design specs to cache** - Save extracted design context as JSON to `.figma-cache/specs/{nodeId}.json`
- **Use BOTH Figma and Anima when both are provided** - Extract from both sources, do not skip either
- **Decide intelligently which source to prioritize** - Figma for visual specs/assets, Anima for structure/patterns
- **Apply responsive design automatically** - Even if Figma defines pixels, use responsive units (`w-full`, `h-auto`, percentages, `vw`/`vh`)
- **Test with multiple screen sizes** - Use Playwright to test 320px, 360px, 480px widths and desktop (1280px)
- **Fix header/footer positioning** - If elements should stick to top/bottom, use `sticky`/`fixed` even if reference differs
- **Analyze layout BEFORE implementing** - Take Playwright screenshot first, then decide on layout strategy
- **Decide on screen coverage** - Full screen vs centered (use `w-full max-w-[360px] mx-auto` pattern for mobile-first)
- **Prefer flex/grid over absolute** - Use absolute positioning only for overlapping elements
- **Ask for missing component links** rather than guessing
- **Fix layout first** (container structure, positioning, centering) - most critical for mobile/web compatibility
- **Fix typography second** (most common source of visual mismatch after layout)
- **Use tokens** (no hardcoded px/hex values)
- **Verify via Storybook + stable Playwright capture** (deterministic conditions)
- **Compare Figma screenshot with Playwright screenshot** before proceeding
- **Fix discrepancies in order**: layout → typography → spacing → colors → icons → effects
- **One change per iteration**, re-capture, re-evaluate
- **Max 3 iterations per component/page**, then create checklist file with remaining issues
- **Component-first**: Achieve parity for components in Storybook before composing pages
- **When both Figma and Anima are provided**: Follow Hybrid workflow - extract from BOTH, use Figma for specs, Anima for structure
- **When using Anima code only**: Follow `.cursor/commands/create-page-anima.md` workflow - but note limitations (no custom icons/images)

### DON'T:
- **Do NOT** call Figma API if cache exists - always check `.figma-cache/` first
- **Do NOT** skip saving to cache - always save screenshots and specs after extraction
- **Do NOT** commit cache files - `.figma-cache/` is gitignored, keep it local only
- **Do NOT** skip Figma extraction when both Figma and Anima are provided - you MUST extract from both
- **Do NOT** skip Anima code when both Figma and Anima are provided - you MUST use both sources
- **Do NOT** use only one source when both are available - always combine intelligently
- **Do NOT** use fixed pixel values from Figma/Anima - always convert to responsive units
- **Do NOT** skip responsive testing - must test at least 3 different screen sizes (320px, 360px, 480px, desktop)
- **Do NOT** ignore header/footer positioning - if they should stick to top/bottom, apply it even if reference differs
- **Do NOT** blindly apply Figma/Anima code layout - always analyze with Playwright screenshot first
- **Do NOT** use excessive absolute positioning - prefer flex/grid for normal flow
- **Do NOT** use fixed widths like `w-[360px]` without container - use `w-full max-w-[360px] mx-auto` pattern
- **Do NOT** use complex calc() for centering - use flex/grid centering utilities
- **Do NOT** implement full pages first (component-first approach)
- **Do NOT** rely on page URL enumeration
- **Do NOT** skip fonts/animations stabilization (deterministic capture)
- **Do NOT** skip layout analysis step - it's critical for mobile/web compatibility
- **Do NOT** skip responsive verification step - it's mandatory
- **Do NOT** "approximate" styling without citing extracted info or tokens mapping
- **Do NOT** consider the page complete until you have visually confirmed it matches Figma EXACTLY
- **Do NOT** exceed 3 iterations - stop and create checklist after 3 attempts
- **Do NOT** continue fixing after 3 iterations - create checklist and wait for next request
- **Do NOT** skip any discrepancies, no matter how small
- **Do NOT** assume something is correct - verify every detail by comparing screenshots
- **Do NOT** leave Anima code as-is - always convert to codebase patterns (see `.cursor/commands/create-page-anima.md`)
- **Do NOT** hardcode values from Anima code - always create/use tokens (see `.cursor/commands/create-page-anima.md`)

## Component Mapping

Map Figma elements to React components:
- Navigation → `Topbar`
- Buttons → `Button`
- Inputs → `Input`
- Progress → `ProgressBar` / `ProgressCircle`
- Chips → `InputChip` / `AssistChip`
- Lists → `List` / `ListItem`
- Cards → `Card`
- Icons → `Icon`
- Quiz elements → `QuizButton`

## Execution

Execute all steps automatically when user provides:
- Page name
- Figma URL with node-id parameter → Follow `.cursor/commands/create-page-figma.md`
- OR Anima generated code only → Follow `.cursor/commands/create-page-anima.md` (⚠️ limited - no custom icons/images)
- OR Figma URL + Anima code → Follow `.cursor/commands/create-page-hybrid.md` (✅ MANDATORY: Extract from BOTH sources)

**⚠️ CRITICAL for Hybrid Workflow**: 
- If both Figma URL and Anima code are provided, you MUST:
  1. **Check cache first** - Look for `.figma-cache/screenshots/{nodeId}.png` and `.figma-cache/specs/{nodeId}.json`
  2. Extract from Figma (design context, assets, tokens, screenshot) - **Only if cache missing**
  3. **Save to cache** - Save screenshots and specs to `.figma-cache/` after extraction
  4. Analyze Anima code (structure, layout patterns, component hierarchy)
  5. Combine both intelligently (you decide which to prioritize for each aspect)
  6. Do NOT skip either source

**Critical**: The page is only considered complete when:
- **For Figma workflow**: All requirements in `.cursor/commands/create-page-figma.md` Step 0-11 are met
- **For Anima-only workflow**: All requirements in `.cursor/commands/create-page-anima.md` Step A1-A8 are met (⚠️ note: custom icons/images may be missing)
- **For Hybrid workflow**: All requirements in `.cursor/commands/create-page-hybrid.md` Step H1-H8 are met (✅ recommended)
- Figma screenshot and Playwright screenshot match exactly (if Figma URL provided)
- All differences have been identified and fixed
- Typography, spacing, layout, colors, icons, and effects all match design
- All custom icons and images extracted from Figma (if Figma URL provided)
- All hardcoded values converted to tokens
- All inline styles converted to Tailwind (if using Anima)
- All components mapped to codebase components
- All lint and build checks pass
- Enhancement opportunities have been addressed (implemented or documented as TODO)
