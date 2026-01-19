# Project Setup Guide Command

Initialize project settings for Figma-based component development. This command guides through project setup checklist and prepares for page creation.

**Note**: Project global settings are stored in `.cursor/rules/project-context.mdc` and are automatically referenced in all tasks.

## Usage

```
/setup-project
```

## Intent Detection

This command should be executed automatically when user request matches these patterns (see `.cursor/rules/command-routing.mdc`):

**Keywords:**
- 프로젝트 설정, 초기 설정, 셋업, setup
- 프로젝트 초기화, 프로젝트 시작
- Figma 설정, 디자인 시스템 설정
- 아이콘 라이브러리 설정, 디자인 토큰 설정
- 반응형 디자인 설정

**Patterns:**
- "프로젝트 설정해줘"
- "초기 설정해줘"
- "프로젝트 셋업해줘"
- "Figma 설정해줘"
- 프로젝트 관련 초기화 요청

## Core Principles

All project setup must follow these principles:

- **Interactive Checklist**: Guide user through 7-step checklist
- **Configuration Storage**: Save setup info to `.cursor/project-setup.md`
- **Rules Update**: Update rule files based on setup information
- **Component Setup**: Optionally setup components using `/create-component` command

## Execution Flow

### Step 1: Check Existing Components

1. Check `src/components/default/` directory
2. Read `src/components/default/index.ts` to extract component list
3. If components exist:
   - Display current component list to user
   - Ask: "이 설정을 업데이트하시겠습니까? (y/n)" (in Korean)
   - If no: Exit with message to proceed with `/create-page`
   - If yes: Continue to Step 2
4. If no components: Continue to Step 2

### Step 2: Interactive Checklist

Progress through 7 checklist items sequentially, asking user for input:

1. **Project Type**: Web / Mobile / Hybrid
2. **Figma Components Page**: Check if exists, request URL if available
3. **Figma Link Validation**: Validate links, extract component list
4. **Icon Library**: Check current icons, ask if additional needed
5. **App Logo**: Check for logo (Figma link or file path)
6. **Design Tokens**: Check token files status
7. **Responsive Design**: Ask for design dimensions and mode

**All questions should be asked in Korean** for better user experience.

### Step 3: Save Setup Information

After checklist completion, save to `.cursor/project-setup.md`:

```markdown
# Project Setup Checklist

## 1. 프로젝트 타입
- [x] 프로젝트 타입: {projectType}

## 2. Figma 디자인 컴포넌트 페이지
- [x] Figma 컴포넌트 페이지 존재: {hasFigmaComponents}
- [x] Figma 컴포넌트 페이지 링크: {figmaComponentsPageUrl}
- [x] 컴포넌트 목록: {list of component URLs}

## 3-7. ... (other checklist items)
```

### Step 4: Update Rules Based on Setup

Update rule files based on collected information:

1. **`.cursor/rules/figma-component-process.mdc`**
   - Add Figma component page URL if available
   - Add component mapping information

2. **`.cursor/rules/component-usage.mdc`**
   - Reflect icon library information
   - Add project type-specific rules

3. **`.cursor/rules/code-standards.mdc`**
   - Reflect responsive design size information
   - Add project-specific settings

### Step 5: Component Setup (if needed)

If Figma component links are provided:

1. For each component:
   - Execute `/create-component` command
   - Or use format: `@src/components/default/{ComponentName}/ : {Figma URL}`
2. Create/update components
3. Generate Storybook stories
4. Update `src/components/default/index.ts`

### Step 6: Verification

1. Run `pnpm lint`
2. Run `pnpm build`
3. Run `pnpm storybook` (optional)

### Step 7: Ready for Page Creation

After setup completion, notify user:
- "프로젝트 설정이 완료되었습니다. 이제 `/create-page` 커맨드를 사용하여 페이지를 생성할 수 있습니다."

## Detailed Checklist Items

For detailed checklist item definitions and question formats, see the full implementation in the original command file or create a separate rule file for project setup process.

**Key Checklist Items:**

1. **Project Type**: `projectType: "web" | "mobile" | "hybrid"`
2. **Figma Components**: `hasFigmaComponents: boolean`, `figmaComponentsPageUrl: string | null`
3. **Component Links**: `figmaComponents: [{ name: string, url: string }]`
4. **Icon Library**: `iconLibrary: "phosphor" | "custom" | "multiple"`
5. **App Logo**: `hasLogo: boolean`, `logoSource: "figma" | "file" | "none"`, `logoUrl: string | null`
6. **Design Tokens**: `designTokensStatus: "complete" | "needs-update"`
7. **Responsive Design**: `designWidth: number`, `designHeight: number`, `responsiveMode: "mobile-first" | "desktop-first"`

## Notes

- All questions should be asked **in Korean** for user interaction
- Each answer should be saved in checklist format `- [x]` in `.cursor/project-setup.md`
- Figma links are automatically validated using `mcp_Figma_get_metadata`
- After setup completion, `/create-page` can be used immediately
- Setup information is saved to `.cursor/project-setup.md` for reuse
- If existing components exist, show current state first and ask for update confirmation
