# Figma Component Processing Command

Apply Figma design to React component based on provided Figma link.

## Usage
When user provides a Figma link in format:
```
@src/components/default/{ComponentName}/ : {Figma URL}
```

Or simply:
```
/figma-component @src/components/default/ProgressBar/ : https://www.figma.com/design/...?node-id=5089-16174
```

## Process

### Step 1: Extract Node ID from Figma URL
- Figma URLs format: `https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}&t=...`
- Extract nodeId from URL (e.g., `5089-16174` becomes `5089:16174`)
- If URL format is `https://www.figma.com/design/{fileKey}/branch/{branchKey}/{fileName}`, use branchKey as fileKey

### Step 2: Get Design Context

**⚠️ MANDATORY: Check cache first before calling Figma API**

1. **Check cache first**:
   - **Generate cache key**: Extract node-id from URL (e.g., `5089-16174` → `5089:16174` → cache key: `5089-16174`)
   - **Check for cached files**:
     * Screenshot: `.figma-cache/screenshots/{nodeId}.png` or `.figma-cache/screenshots/{componentName}-{nodeId}.png`
     * Design specs: `.figma-cache/specs/{nodeId}.json` or `.figma-cache/specs/{componentName}-{nodeId}.json`
   - **If cached files exist**: Use cached files, skip API calls
   - **If cache missing**: Proceed to extract from Figma API

2. **Extract from Figma (Only if cache missing)**:
   - Use `mcp_Figma_get_design_context` with extracted nodeId
     - Parameters:
       - `nodeId`: Extracted from URL (format: `"123:456"` or `"123-456"`)
       - `clientLanguages`: `"typescript,tsx"`
       - `clientFrameworks`: `"react"`
       - `artifactType`: `"REUSABLE_COMPONENT"` (for components) or appropriate type
       - `taskType`: `"CHANGE_ARTIFACT"` (for updates) or `"CREATE_ARTIFACT"` (for new)
   - **Save design specs to cache**: Extract design context and save as JSON to `.figma-cache/specs/{nodeId}.json`
   - Use `mcp_Figma_get_screenshot` with `downloadPath: ".figma-cache/screenshots/{nodeId}.png"`
   - **Save screenshot to cache**: Use `downloadPath` parameter to save directly to cache folder

### Step 3: Analyze Existing Component Structure
1. Check if component exists in `src/components/default/{ComponentName}/`
2. Read existing files:
   - `{ComponentName}.tsx` - Component implementation
   - `{ComponentName}.types.ts` - Type definitions
   - `{ComponentName}.stories.tsx` - Storybook stories
   - `index.ts` - Exports

### Step 4: Apply Design Changes
1. Update component implementation based on Figma design:
   - Colors: Use semantic tokens from `src/tokens/sementic token.json`
   - Spacing: Use gap tokens from semantic tokens
   - Typography: Follow design guidelines
   - Border radius: Match Figma design (typically rounded-full, rounded-2xl, etc.)
   - Remove brutalist styles if design is minimal (no black borders, no shadows)
2. Update types if new props are needed
3. Update stories to reflect all design variations

### Step 5: Verify Implementation
1. Check for linter errors using `read_lints`
2. Ensure all design tokens are used correctly
3. Update Storybook stories to show all states from Figma

## Design Token Usage

Always use semantic tokens from `src/tokens/sementic token.json`:
- Colors: `color/text/primary_1` → `#2a69e9`
- Colors: `color/surface/neutral_2` → `#edf1f8`
- Colors: `color/text/success_1` → `#005243`
- Colors: `color/text/error_1` → `#91122e`
- Gaps: `gap/gap-m` → `20px`, `gap/gap-s` → `16px`, etc.

## Common Design Patterns

### ProgressBar
- Background: `bg-[#edf1f8]` (neutral_2)
- Fill: `bg-[#2a69e9]` (primary_1)
- Border radius: `rounded-full`
- No borders or shadows

### Topbar
- Background: `bg-white`
- Text color: `text-[#1e242f]` (neutral_1)
- Icons: Use Icon component with `arrow_back_ios` and `close`
- No bottom border

### QuizButton (Large - 256px)
- Default: `bg-[#f8f9fc]` (neutral_3), `text-[#2a69e9]` (primary_1)
- Correct: `bg-[#c7ebe4]` (success_1), `text-[#005243]` (success_1 text)
- Incorrect: `bg-[#ffd6df]` (error_1), `text-[#91122e]` (error_1 text)
- Border radius: `rounded-2xl`
- Progress bar: Use same colors as ProgressBar component

### QuizButton (Small - 64px, 60px, 56px)
- Default: `bg-white`, `border border-[#dbe1eb]`, `text-[#323d4e]` (neutral_2)
- Correct/Incorrect: Same as large button
- Border radius: `rounded-full` (pill shape)
- Padding: `px-4` for 64px, `px-3` for 56px

### Input
- Right button: Use `labelButtonText` prop
- Clear button: Use `showClearButton` prop with X icon
- States: default, focus, filled, error, success, disabled
- Always include stories for all combinations

## Storybook Story Requirements

When updating components, ensure stories include:
1. All states from Figma design
2. All size variations
3. Interactive examples (with state management)
4. Edge cases (empty, filled, error states)

## Code Style

- Use TypeScript with strict types
- Use Tailwind CSS utility classes
- Follow existing component structure
- Export types from component files
- Use semantic HTML and ARIA attributes for accessibility

## Execution

Execute all steps automatically when user provides:
- Component path (e.g., `@src/components/default/ProgressBar/`)
- Figma URL with node-id parameter

Do not ask for confirmation - proceed with the full workflow immediately.
