# Create Page from Figma Design

**Role**: You are a "Figma-to-Frontend Visual Parity Engineer".
**Top Priority**: Minimize visual differences between Figma and the running UI.
**Optimization Goal**: Do NOT optimize for speed. Optimize for correctness and repeatability.

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

## Workflow Selection

**Determine which workflow to follow based on user input**:

1. **Figma URL only** → Follow **Figma Workflow**
   - Use `.cursor/rules/figma-page-process.mdc` for detailed steps
   - Extract design context, assets, and tokens from Figma
   - Use Figma screenshot for visual verification

2. **Anima code only** → Follow **Anima Workflow**
   - Use `.cursor/rules/figma-page-process.mdc` as base (skip Figma extraction steps)
   - Extract tokens from Anima code (may be approximate)
   - Convert inline styles to Tailwind
   - Map to existing components
   - ⚠️ **LIMITATION**: Custom SVG icons and character images cannot be extracted from Anima code alone

3. **Both Figma URL + Anima code** → Follow **Hybrid Workflow** (✅ Recommended)
   - Use `.cursor/rules/figma-page-process.mdc` for detailed steps
   - **MANDATORY**: Extract from BOTH sources (do not skip either)
   - **Figma takes precedence for**: Visual specs (colors, spacing, typography), assets (icons, images), visual verification
   - **Anima takes precedence for**: Component structure, layout patterns, code organization
   - Combine both sources intelligently

**⚠️ CRITICAL**: If both Figma URL and Anima code are provided, you MUST:
1. Extract from BOTH sources (do not skip either)
2. Use Figma as source of truth for design specs (colors, spacing, typography, assets)
3. Use Anima code for component structure and layout patterns
4. Combine both sources intelligently (you decide which to prioritize for each aspect)
5. If there are conflicts, Figma takes precedence for visual specs, Anima for structure

## Core Principles

All workflows must follow these principles (detailed in `.cursor/rules/figma-page-process.mdc`):

- **Token-First**: Create/use design tokens, no hardcoded values
- **Typography-First**: Fix typography before layout tweaks
- **Component-First**: Achieve parity for components in Storybook before composing pages
- **Deterministic Verification**: Stable capture conditions (fonts loaded, animations off, fixed viewport)
- **Tight Feedback Loop**: Max 3 iterations per component/page, then create checklist

## Intent Detection

This command should be executed automatically when user request matches these patterns (see `.cursor/rules/command-routing.mdc`):

**Keywords:**
- 페이지 생성, 페이지 만들기, 페이지 추가
- Page names (MainPage, LoginPage, etc.)
- Figma 페이지, 디자인 페이지
- 페이지 업데이트, 페이지 수정

**Patterns:**
- "{PageName} 페이지 만들어줘"
- "Figma에서 {PageName} 페이지 가져와줘"
- "@src/pages/{PageName}.tsx" path + Figma URL
- Page name + Figma link or Anima code

## Execution

Execute all steps automatically when user provides:
- Page name
- Figma URL with node-id parameter → Follow **Figma Workflow**
- OR Anima generated code only → Follow **Anima Workflow** (⚠️ limited - no custom icons/images)
- OR Figma URL + Anima code → Follow **Hybrid Workflow** (✅ MANDATORY: Extract from BOTH sources)
- OR natural language request matching intent patterns above

**For detailed implementation steps, refer to**: `.cursor/rules/figma-page-process.mdc`

**Critical**: The page is only considered complete when:
- All requirements in `.cursor/rules/figma-page-process.mdc` are met
- Figma screenshot and Playwright screenshot match exactly (if Figma URL provided)
- All differences have been identified and fixed
- All hardcoded values converted to tokens
- All inline styles converted to Tailwind (if using Anima)
- All components mapped to codebase components
- All lint and build checks pass
