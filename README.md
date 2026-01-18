# Figma MCP 기반 React 프로젝트 보일러플레이트

Cursor IDE와 Figma MCP(Model Context Protocol)를 활용하여 Figma 디자인을 자동으로 React 컴포넌트로 변환하는 프로젝트 보일러플레이트입니다.

## 🎯 프로젝트 개요

이 프로젝트는 Cursor의 AI 기능과 Figma MCP를 결합하여:
- Figma 디자인을 자동으로 React 컴포넌트로 변환
- 디자인 시스템 토큰을 코드로 자동 추출
- 컴포넌트 및 페이지를 Figma 링크만으로 생성
- Storybook을 통한 컴포넌트 문서화 및 시각화

## 🚀 빠른 시작

### 1. 프로젝트 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# Storybook 실행
pnpm storybook
```

### 2. Cursor에서 프로젝트 초기 설정

Cursor IDE에서 다음 커맨드를 실행하세요:

```
/setup-project
```

이 커맨드는 다음을 수행합니다:
- 기존 컴포넌트 확인
- 프로젝트 타입 설정 (웹/모바일/하이브리드)
- Figma 디자인 컴포넌트 페이지 링크 설정
- 아이콘 라이브러리 설정
- 앱 로고 설정
- 디자인 토큰 확인
- 반응형 디자인 설정

### 3. Figma 컴포넌트 적용

Figma 디자인 컴포넌트를 React 컴포넌트로 변환:

```
/figma-component @src/components/default/ProgressBar/ : https://www.figma.com/design/...?node-id=5089-16174
```

또는:

```
@src/components/default/{ComponentName}/ : {Figma URL}
```

### 4. 페이지 생성

Figma 페이지 디자인을 React 페이지로 변환:

```
/create-page LoginPage : https://www.figma.com/design/...?node-id=1234-5678
```

## 📁 프로젝트 구조

```
ai_mvp/
├── .cursor/
│   ├── commands/              # Cursor 커맨드 정의
│   │   ├── setup-project.md   # 프로젝트 초기 설정
│   │   ├── figma-component.md # 컴포넌트 생성/업데이트
│   │   └── create-page.md     # 페이지 생성
│   ├── rules/                 # Cursor 규칙 정의
│   │   ├── code-standards.mdc      # 코드 표준
│   │   ├── component-usage.mdc     # 컴포넌트 사용 규칙
│   │   ├── figma-component-process.mdc  # 컴포넌트 처리 프로세스
│   │   ├── figma-page-process.mdc       # 페이지 처리 프로세스
│   │   └── project-context.mdc         # 프로젝트 전역 설정 관리
│   ├── templates/             # 코드 템플릿
│   │   ├── component-template.mdc  # 컴포넌트 생성 템플릿
│   │   └── page-template.mdc       # 페이지 생성 템플릿
│   ├── snippets/              # 코드 스니펫
│   │   └── common-patterns.mdc    # 자주 사용하는 코드 패턴
│   └── context/               # 컨텍스트 파일
│       └── design-tokens-reference.mdc  # 디자인 토큰 참조
├── src/
│   ├── components/
│   │   └── default/           # 디자인 시스템 기본 컴포넌트
│   │       ├── Button/
│   │       ├── Icon/
│   │       ├── Input/
│   │       ├── ProgressBar/
│   │       ├── Topbar/
│   │       └── ...
│   ├── tokens/                 # 디자인 토큰
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── sementic token.json
│   │   └── primitive token.json
│   ├── stories/                # Storybook 스토리
│   │   └── Base/              # 디자인 토큰 스토리
│   │       ├── Colors.stories.tsx
│   │       ├── Typography.stories.tsx
│   │       └── ...
│   └── App.tsx                 # 프로젝트 가이드 페이지
└── .storybook/                 # Storybook 설정
```

## 🛠️ 기술 스택

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Component Library**: Storybook 10+
- **Icons**: Phosphor Icons (`@phosphor-icons/core`)
- **Testing**: Playwright (시각적 검증)

## 📖 Cursor 커맨드 가이드

### `/setup-project`

프로젝트 초기 설정을 진행합니다. 다음 정보를 수집합니다:
- 프로젝트 타입 (웹/모바일/하이브리드)
- Figma 디자인 컴포넌트 페이지 링크
- 아이콘 라이브러리 설정
- 앱 로고
- 디자인 토큰 상태
- 반응형 디자인 설정

**사용 예시:**
```
/setup-project
```

### `/figma-component`

Figma 디자인 컴포넌트를 React 컴포넌트로 변환합니다.

**사용 예시:**
```
/figma-component @src/components/default/Button/ : https://www.figma.com/design/...?node-id=123-456
```

**처리 과정:**
1. Figma URL에서 Node ID 추출
2. Figma MCP를 통해 디자인 컨텍스트 가져오기
3. 기존 컴포넌트 구조 분석
4. 디자인 토큰 적용
5. 컴포넌트 생성/업데이트
6. Storybook 스토리 생성
7. Lint 및 Build 검증

### `/create-page`

Figma 페이지 디자인을 React 페이지 컴포넌트로 변환합니다.

**사용 예시:**
```
/create-page LoginPage : https://www.figma.com/design/...?node-id=123-456
```

**처리 과정:**
1. Figma 페이지 구조 분석
2. 기존 컴포넌트 매핑
3. 페이지 레이아웃 생성
4. 상태 관리 추가
5. 반응형 디자인 적용
6. Lint 및 Build 검증

## 🎨 디자인 시스템

### 디자인 토큰

디자인 토큰은 `src/tokens/` 폴더에 정의되어 있으며, Storybook에서 시각적으로 확인할 수 있습니다:

```bash
pnpm storybook
```

Storybook에서 **Base** 섹션을 확인하세요:
- **Base/Colors**: 모든 색상 토큰
- **Base/Typography**: 폰트 패밀리, 크기, 굵기, 줄 간격
- **Base/Spacing**: 간격 및 gap 토큰
- **Base/BorderWidth**: 테두리 두께
- **Base/Radius**: 모서리 반경
- **Base/Opacity**: 투명도 값

### 컴포넌트 구조

모든 기본 컴포넌트는 `src/components/default/`에 위치하며, 다음 구조를 따릅니다:

```
ComponentName/
├── ComponentName.tsx          # 컴포넌트 구현
├── ComponentName.types.ts     # 타입 정의
├── ComponentName.stories.tsx  # Storybook 스토리
└── index.ts                   # Export
```

### 반응형 디자인

이 프로젝트는 **모바일 우선** 디자인을 따릅니다:
- 기본 디자인 크기: **360px x 732px**
- 모바일 범위: 320px ~ 480px (반응형)
- 데스크탑/태블릿: 모바일 UI 유지, 중앙 정렬 (최대 너비 360px)

## 📚 Storybook

모든 컴포넌트와 디자인 토큰은 Storybook에서 확인할 수 있습니다:

```bash
pnpm storybook
```

브라우저에서 `http://localhost:6006`로 접속하여:
- 각 컴포넌트의 모든 variant 확인
- 인터랙티브하게 컴포넌트 조작
- 디자인 토큰 시각화
- 컴포넌트 문서 확인

## ✅ 코드 품질

### 파일 크기 제한
- 단일 파일은 **300줄 이내**로 유지
- 초과 시 컴포넌트 분리 또는 유틸리티 함수 분리

### 코드 재사용
- 비슷한 작업이 코드베이스에 존재하면 재사용 또는 확장
- 기존 패턴 일관성 유지

### 작업 후 검증
모든 작업 완료 후 반드시 실행:

```bash
# Lint 검사
pnpm lint

# Type Check
pnpm type-check

# Build 검증
pnpm build

# 테스트 실행 (작업 유형에 따라 선택)
# - 컴포넌트 생성/수정 시: pnpm test:component
# - 페이지 생성/수정 시: pnpm test
pnpm test:component  # 컴포넌트 테스트
pnpm test            # 페이지 테스트
```

## 🔧 개발 워크플로우

### 1. 새 컴포넌트 추가

1. Figma에서 컴포넌트 디자인 확인
2. Cursor에서 `/figma-component` 커맨드 실행
3. 자동으로 컴포넌트 생성 및 Storybook 스토리 생성
4. Lint, Type-check, Build 검증
5. **컴포넌트 테스트 실행**: `pnpm test:component`

### 2. 새 페이지 추가

1. Figma에서 페이지 디자인 확인
2. Cursor에서 `/create-page` 커맨드 실행
3. 자동으로 페이지 생성
4. Lint, Type-check, Build 검증
5. **페이지 테스트 실행**: `pnpm test` (컴포넌트 테스트 제외)

### 3. 디자인 업데이트

1. Figma에서 디자인 수정
2. 기존 컴포넌트에 `/figma-component` 커맨드 재실행
3. 자동으로 디자인 변경사항 적용

## 📝 규칙 및 표준

프로젝트의 모든 규칙과 템플릿은 `.cursor/` 폴더에 정의되어 있습니다:

### Rules (`.cursor/rules/`)
- **code-standards.mdc**: 코드 표준 및 컴포넌트 구조 규칙
- **component-usage.mdc**: 컴포넌트 사용 규칙 및 디자인 토큰 가이드
- **figma-component-process.mdc**: Figma 컴포넌트 처리 프로세스
- **figma-page-process.mdc**: Figma 페이지 처리 프로세스
- **project-context.mdc**: 프로젝트 전역 설정 및 컨텍스트 관리

### Templates (`.cursor/templates/`)
- **component-template.mdc**: 컴포넌트 생성 표준 템플릿
- **page-template.mdc**: 페이지 생성 표준 템플릿

### Snippets (`.cursor/snippets/`)
- **common-patterns.mdc**: 자주 사용하는 코드 패턴 및 스니펫

### Context (`.cursor/context/`)
- **design-tokens-reference.mdc**: 디자인 토큰 참조 가이드

### 프로젝트 전역 설정 저장

프로젝트 전역적으로 적용되는 설정(아이콘 라이브러리, 디자인 토큰, 코드 스타일 등)은 자동으로 저장됩니다:

- **Cursor 메모리**: 프로젝트 전역 설정을 메모리에 저장
- **규칙 파일**: `.cursor/rules/project-context.mdc`에 저장
- **프로젝트 설정 파일**: `.cursor/project-setup.md` 또는 `.cursor/project-context.md`에 저장

저장된 설정은 향후 모든 작업에서 자동으로 참조되어 적용됩니다.

### Cursor 기능 활용

이 프로젝트는 Cursor의 다양한 기능을 활용합니다:

- **Commands**: `/setup-project`, `/figma-component`, `/create-page`
- **Rules**: 프로젝트 규칙 및 표준 정의
- **Templates**: 컴포넌트 및 페이지 생성 템플릿
- **Snippets**: 자주 사용하는 코드 패턴
- **Context Files**: 디자인 토큰 등 참조 정보
- **Codebase Indexing**: 자동 코드베이스 인덱싱
- **@-Symbols**: `@Files`, `@Code`, `@Folders` 컨텍스트 참조

## 🧪 테스트

프로젝트는 두 가지 테스트를 제공합니다:

### 컴포넌트 테스트
프로젝트 템플릿의 기본 컴포넌트가 잘 구현되었는지 확인하는 테스트입니다.
컴포넌트 생성/수정 시에만 실행합니다.

```bash
pnpm test:component
```

- `tests/visual/` 디렉토리의 테스트 실행
- Storybook을 기반으로 컴포넌트 시각적 검증
- 프로젝트 템플릿의 기본 컴포넌트 검증

### 페이지 테스트
페이지 개발 후 실행하는 일반 프로젝트 테스트입니다.
컴포넌트는 안정되어 있다고 가정하므로 컴포넌트 테스트는 제외됩니다.

```bash
pnpm test
```

- `tests/pages/` 디렉토리의 테스트 실행
- Vite dev server를 기반으로 페이지 테스트
- 페이지 개발 후 실행

**참고**: 두 테스트 모두 lint, type-check, build를 포함하여 실행됩니다.

## 📦 빌드

프로덕션 빌드:

```bash
pnpm build
```

빌드 결과는 `dist/` 폴더에 생성됩니다.

## 🤝 기여 가이드

1. Figma 디자인을 기반으로 컴포넌트 생성
2. Cursor 커맨드를 사용하여 자동 생성
3. 코드 표준 준수 (300줄 이내, 재사용 우선)
4. 작업 후 Lint 및 Build 검증
5. Storybook 스토리 추가

## 📄 라이선스

이 프로젝트는 보일러플레이트로 제공됩니다.

## 🔗 관련 링크

- [Cursor IDE](https://cursor.sh/)
- [Figma](https://www.figma.com/)
- [Storybook](https://storybook.js.org/)
- [Phosphor Icons](https://phosphoricons.com/)
