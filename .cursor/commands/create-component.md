# Create Component from Figma Design

Apply Figma design to React component based on provided Figma link.

**Note**: For detailed implementation steps, refer to `.cursor/rules/figma-component-process.mdc`.

## Usage

```
/create-component @src/components/default/{ComponentName}/ : {Figma URL}
```

Example:
```
/create-component @src/components/default/ProgressBar/ : https://www.figma.com/design/...?node-id=5089-16174
```

## Core Principles

All component creation/updates must follow these principles (detailed in `.cursor/rules/figma-component-process.mdc`):

- **Token-First**: Use design tokens, no hardcoded values
- **Component-First**: Verify components in Storybook before using in pages
- **Cache-First**: Check cache before calling Figma API (MANDATORY)
- **Deterministic Verification**: Stable verification conditions (fonts loaded, animations off, fixed viewport)

## Intent Detection

This command should be executed automatically when user request matches these patterns (see `.cursor/rules/command-routing.mdc`):

**Keywords:**
- 컴포넌트 생성, 컴포넌트 만들기, 컴포넌트 추가
- Component names (Button, Input, ProgressBar, etc.)
- Figma 컴포넌트, 디자인 컴포넌트
- 컴포넌트 업데이트, 컴포넌트 수정

**Patterns:**
- "{ComponentName} 컴포넌트 만들어줘"
- "Figma에서 {ComponentName} 컴포넌트 가져와줘"
- "@src/components/default/{ComponentName}/" path + Figma URL
- Component name + Figma link

## Execution

Execute all steps automatically when user provides:
- Component path (e.g., `@src/components/default/ProgressBar/`)
- Figma URL with node-id parameter
- OR natural language request matching intent patterns above

**For detailed implementation steps, refer to**: `.cursor/rules/figma-component-process.mdc`

**⚠️ Critical**: Component is only considered complete when:
- All requirements in `.cursor/rules/figma-component-process.mdc` are met
- All hardcoded values converted to design tokens
- Storybook stories include all states/variations from Figma design
- All lint and build checks pass
- `pnpm test:component` execution succeeds
