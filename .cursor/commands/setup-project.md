# Project Setup Guide Command

프로젝트 초기 설정을 위한 가이드 커맨드입니다. Figma 디자인 시스템을 기반으로 컴포넌트를 설정하고, 이후 페이지 생성을 준비합니다.

**참고**: 프로젝트 전역 설정은 `.cursor/rules/project-context.mdc`에 저장되며, 모든 작업에서 자동으로 참조됩니다.

## Usage

```
/setup-project
```

## Process

### Step 1: Check Existing Components

1. **기존 컴포넌트 확인**
   - `src/components/default/` 디렉토리 확인
   - 존재하는 컴포넌트 목록 읽기
   - `src/components/default/index.ts` 확인

2. **상태 판단**
   - 컴포넌트가 이미 존재하는 경우:
     - 현재 컴포넌트 목록 표시
     - 업데이트를 원하는지 확인
     - 업데이트를 원하면 Step 2로 진행
     - 업데이트를 원하지 않으면 현재 설정으로 진행
   - 컴포넌트가 없는 경우:
     - Step 2로 진행

### Step 2: Project Setup Checklist

체크리스트 파일 생성: `.cursor/project-setup.md`

각 질문에 대해 체크리스트 형태로 진행:

#### Checklist Item 1: 프로젝트 타입
- [ ] 프로젝트 타입 확인
  - 질문: "이 프로젝트는 웹 애플리케이션인가요, 모바일 앱인가요?"
  - 답변 저장: `projectType: "web" | "mobile" | "hybrid"`

#### Checklist Item 2: Figma 디자인 컴포넌트 페이지
- [ ] Figma 컴포넌트 페이지 존재 여부 확인
  - 질문: "Figma에 디자인 컴포넌트 페이지가 존재하나요?"
  - 답변: `hasFigmaComponents: true | false`
  - 존재하는 경우:
    - [ ] Figma 컴포넌트 페이지 링크 요청
    - 답변 저장: `figmaComponentsPageUrl: "https://..."`

#### Checklist Item 3: Figma 링크 유효성 검증
- [ ] Figma 링크 유효성 확인
  - 링크가 제공된 경우:
    - `mcp_Figma_get_metadata` 사용하여 링크 유효성 확인
    - 유효한 경우:
      - [ ] Figma에서 컴포넌트 목록 추출
      - 각 컴포넌트에 대한 링크 요청
      - 답변 저장: `figmaComponents: [{ name: string, url: string }]`
    - 유효하지 않은 경우:
      - 오류 메시지 표시
      - 링크 재요청

#### Checklist Item 4: 아이콘 라이브러리
- [ ] 아이콘 라이브러리 확인
  - 현재 프로젝트에서 사용 중인 아이콘 확인:
    - `src/components/default/Icon/` 확인
    - `package.json`에서 `phosphor-react` 또는 `@phosphor-icons/core` 확인
  - 질문: "디자인에서 사용하는 아이콘을 확인했습니다. 현재 프로젝트의 Phosphor Icons로 충분한가요, 아니면 추가 아이콘 라이브러리가 필요하나요?"
  - Figma 디자인에서 사용하는 아이콘 목록 추출 (가능한 경우)
  - 답변 저장:
    - `iconLibrary: "phosphor" | "custom" | "multiple"`
    - `additionalIcons: string[]` (필요한 경우)

#### Checklist Item 5: 앱 로고
- [ ] 앱 로고 확인
  - 질문: "앱 로고가 있나요? (Figma 링크 또는 이미지 파일 경로)"
  - `src/components/default/Logo/` 확인
  - `src/assets/logo.svg` 또는 다른 로고 파일 확인
  - 답변 저장:
    - `hasLogo: true | false`
    - `logoSource: "figma" | "file" | "none"`
    - `logoUrl: string | null` (Figma 링크 또는 파일 경로)

#### Checklist Item 6: 디자인 토큰
- [ ] 디자인 토큰 확인
  - `src/tokens/` 디렉토리 확인
  - `sementic token.json`, `primitive token.json` 등 확인
  - 질문: "디자인 토큰 파일이 이미 존재합니다. 추가로 필요한 토큰이 있나요?"
  - 답변 저장: `designTokensStatus: "complete" | "needs-update"`

#### Checklist Item 7: 반응형 디자인
- [ ] 반응형 디자인 설정 확인
  - 질문: "기본 디자인 크기는 무엇인가요? (예: 360px x 732px)"
  - 답변 저장:
    - `designWidth: number` (예: 360)
    - `designHeight: number` (예: 732)
    - `responsiveMode: "mobile-first" | "desktop-first"`

### Step 3: Save Setup Information

체크리스트 완료 후 `.cursor/project-setup.md` 파일에 저장:

```markdown
# Project Setup Information

## 프로젝트 타입
- [x] 프로젝트 타입: {projectType}

## Figma 디자인 컴포넌트
- [x] Figma 컴포넌트 페이지 존재: {hasFigmaComponents}
- [x] Figma 컴포넌트 페이지 링크: {figmaComponentsPageUrl}
- [x] 컴포넌트 목록:
  {각 컴포넌트에 대한 링크 리스트}

## 아이콘
- [x] 아이콘 라이브러리: {iconLibrary}
- [x] 추가 아이콘: {additionalIcons}

## 로고
- [x] 로고 존재: {hasLogo}
- [x] 로고 소스: {logoSource}
- [x] 로고 링크/경로: {logoUrl}

## 디자인 토큰
- [x] 디자인 토큰 상태: {designTokensStatus}

## 반응형 디자인
- [x] 디자인 너비: {designWidth}px
- [x] 디자인 높이: {designHeight}px
- [x] 반응형 모드: {responsiveMode}
```

### Step 4: Update Rules Based on Setup

설정 정보를 기반으로 규칙 파일 업데이트:

1. **`.cursor/rules/figma-component-process.mdc`** 업데이트
   - Figma 컴포넌트 페이지 링크 추가
   - 컴포넌트 매핑 정보 추가

2. **`.cursor/rules/component-usage.mdc`** 업데이트
   - 아이콘 라이브러리 정보 반영
   - 프로젝트 타입에 따른 규칙 추가

3. **`.cursor/rules/code-standards.mdc`** 업데이트
   - 반응형 디자인 크기 정보 반영
   - 프로젝트별 설정 추가

### Step 5: Component Setup (if needed)

Figma 컴포넌트 링크가 제공된 경우:

1. 각 컴포넌트에 대해 `/figma-component` 커맨드 실행
2. 컴포넌트 생성/업데이트
3. Storybook 스토리 생성

### Step 6: Verification

1. **Lint 실행**: `pnpm lint`
2. **Build 실행**: `pnpm build`
3. **Storybook 확인**: `pnpm storybook` (선택)

### Step 7: Ready for Page Creation

설정 완료 후 사용자에게 알림:
- "프로젝트 설정이 완료되었습니다. 이제 `/create-page` 커맨드를 사용하여 페이지를 생성할 수 있습니다."

## Execution Flow

### Case 1: 기존 컴포넌트 존재
```
1. `src/components/default/` 디렉토리 확인
2. `src/components/default/index.ts` 읽어서 컴포넌트 목록 추출
3. 사용자에게 현재 상태 알림:
   "현재 {N}개의 컴포넌트가 설정되어 있습니다:"
   - [ComponentName1]
   - [ComponentName2]
   - ...
4. "이 설정을 업데이트하시겠습니까? (y/n)"
   - y: Step 2로 진행 (체크리스트 시작)
   - n: "현재 설정을 유지합니다. `/create-page` 커맨드를 사용하여 페이지를 생성할 수 있습니다."
```

### Case 2: 새 프로젝트 설정
```
1. Step 2: 체크리스트 진행
2. 각 질문에 대해 사용자 입력 받기
3. 체크리스트 업데이트: - [ ] → - [x]
4. Step 3: 정보 저장
5. Step 4: 규칙 업데이트
6. Step 5: 컴포넌트 설정 (필요시)
7. Step 6: 검증
8. Step 7: 완료 알림
```

## Detailed Execution Steps

### Step 1: Check Existing Components

```typescript
// Pseudo-code
1. Read `src/components/default/index.ts`
2. Extract exported components
3. List directory contents of `src/components/default/`
4. If components exist:
   - Display list to user
   - Ask: "이 설정을 업데이트하시겠습니까?"
   - If no: Exit with message
   - If yes: Continue to Step 2
5. If no components: Continue to Step 2
```

### Step 2: Interactive Checklist

각 질문을 순차적으로 진행하고, 답변을 받을 때마다 체크리스트 업데이트:

**질문 1: 프로젝트 타입**
```
질문: "이 프로젝트는 웹 애플리케이션인가요, 모바일 앱인가요?"
옵션: 
  - 웹 애플리케이션
  - 모바일 앱
  - 하이브리드 (웹 + 모바일)
답변 저장 후 체크리스트 업데이트:
- [x] 프로젝트 타입: {answer}
```

**질문 2: Figma 컴포넌트 페이지**
```
질문: "Figma에 디자인 컴포넌트 페이지가 존재하나요?"
답변: 예 / 아니오
- 예인 경우: "Figma 컴포넌트 페이지 링크를 제공해주세요:"
- 아니오인 경우: 다음 질문으로
체크리스트 업데이트:
- [x] Figma 컴포넌트 페이지 존재: {answer}
- [x] Figma 컴포넌트 페이지 링크: {url or "없음"}
```

**질문 3: Figma 링크 유효성 및 컴포넌트 목록**
```
링크가 제공된 경우:
1. `mcp_Figma_get_metadata`로 링크 유효성 확인
2. 유효한 경우:
   - Figma에서 컴포넌트 목록 추출 시도
   - 각 컴포넌트에 대한 링크 요청:
     "다음 컴포넌트들에 대한 Figma 링크를 제공해주세요:"
     - {ComponentName1}: {URL}
     - {ComponentName2}: {URL}
     ...
3. 유효하지 않은 경우:
   - 오류 메시지 표시
   - 링크 재요청 또는 건너뛰기
체크리스트 업데이트:
- [x] 링크 유효성 확인: {status}
- [x] 컴포넌트 목록:
  - [x] {ComponentName1}: {URL}
  - [x] {ComponentName2}: {URL}
```

**질문 4: 아이콘 라이브러리**
```
1. 현재 프로젝트 확인:
   - `package.json`에서 `phosphor-react` 확인
   - `src/components/default/Icon/` 확인
2. Figma 디자인에서 아이콘 추출 시도 (가능한 경우)
3. 질문: 
   "현재 프로젝트는 Phosphor Icons를 사용하고 있습니다.
   디자인에서 사용하는 아이콘을 확인했습니다: [목록]
   추가 아이콘 라이브러리가 필요하나요?"
답변: 예 / 아니오
- 예인 경우: "어떤 아이콘 라이브러리를 추가하시겠습니까?"
체크리스트 업데이트:
- [x] 아이콘 라이브러리: {answer}
- [x] 추가 아이콘 필요: {answer}
```

**질문 5: 앱 로고**
```
1. `src/components/default/Logo/` 확인
2. `src/assets/logo.svg` 또는 다른 로고 파일 확인
3. 질문: 
   "앱 로고가 있나요? (현재 {Logo.tsx} 컴포넌트가 존재합니다)"
   - Figma 링크 제공
   - 파일 경로 제공
   - 없음
체크리스트 업데이트:
- [x] 로고 존재: {answer}
- [x] 로고 소스: {answer}
- [x] 로고 링크/경로: {answer}
```

**질문 6: 디자인 토큰**
```
1. `src/tokens/` 디렉토리 확인
2. `sementic token.json`, `primitive token.json` 등 확인
3. 질문:
   "디자인 토큰 파일이 이미 존재합니다. 추가로 필요한 토큰이 있나요?"
체크리스트 업데이트:
- [x] 디자인 토큰 상태: {answer}
```

**질문 7: 반응형 디자인**
```
질문: "기본 디자인 크기는 무엇인가요?"
예시: "360px x 732px"
답변 저장:
- 디자인 너비: {number}px
- 디자인 높이: {number}px
- 반응형 모드: 모바일 우선 / 데스크탑 우선
체크리스트 업데이트:
- [x] 디자인 너비: {answer}px
- [x] 디자인 높이: {answer}px
- [x] 반응형 모드: {answer}
```

## Checklist Template

```markdown
# Project Setup Checklist

## 1. 프로젝트 타입
- [ ] 프로젝트 타입: {answer}

## 2. Figma 디자인 컴포넌트 페이지
- [ ] Figma 컴포넌트 페이지 존재: {answer}
- [ ] Figma 컴포넌트 페이지 링크: {answer}

## 3. Figma 컴포넌트 링크
- [ ] 링크 유효성 확인: {status}
- [ ] 컴포넌트 목록:
  - [ ] {ComponentName1}: {Figma URL}
  - [ ] {ComponentName2}: {Figma URL}
  ...

## 4. 아이콘 라이브러리
- [ ] 아이콘 라이브러리: {answer}
- [ ] 추가 아이콘 필요: {answer}

## 5. 앱 로고
- [ ] 로고 존재: {answer}
- [ ] 로고 소스: {answer}
- [ ] 로고 링크/경로: {answer}

## 6. 디자인 토큰
- [ ] 디자인 토큰 상태: {answer}

## 7. 반응형 디자인
- [ ] 디자인 너비: {answer}px
- [ ] 디자인 높이: {answer}px
- [ ] 반응형 모드: {answer}
```

## Implementation Details

### Checklist File Format

`.cursor/project-setup.md` 파일 형식:

```markdown
# Project Setup Checklist

생성일: {date}
업데이트일: {date}

## 1. 프로젝트 타입
- [x] 프로젝트 타입: {web|mobile|hybrid}
  - 답변: {user answer}

## 2. Figma 디자인 컴포넌트 페이지
- [x] Figma 컴포넌트 페이지 존재: {true|false}
  - 답변: {user answer}
- [x] Figma 컴포넌트 페이지 링크: {url or "없음"}
  - 답변: {user answer}

## 3. Figma 컴포넌트 링크
- [x] 링크 유효성 확인: {valid|invalid|not-provided}
  - 상태: {status}
- [x] 컴포넌트 목록:
  - [x] {ComponentName1}: {Figma URL}
  - [x] {ComponentName2}: {Figma URL}
  ...

## 4. 아이콘 라이브러리
- [x] 아이콘 라이브러리: {phosphor|custom|multiple}
  - 답변: {user answer}
- [x] 추가 아이콘 필요: {true|false}
  - 답변: {user answer}
- [x] 추가 아이콘 라이브러리: {library name or "없음"}

## 5. 앱 로고
- [x] 로고 존재: {true|false}
  - 답변: {user answer}
- [x] 로고 소스: {figma|file|none}
  - 답변: {user answer}
- [x] 로고 링크/경로: {url or path or "없음"}
  - 답변: {user answer}

## 6. 디자인 토큰
- [x] 디자인 토큰 상태: {complete|needs-update|missing}
  - 답변: {user answer}

## 7. 반응형 디자인
- [x] 디자인 너비: {number}px
  - 답변: {user answer}
- [x] 디자인 높이: {number}px
  - 답변: {user answer}
- [x] 반응형 모드: {mobile-first|desktop-first}
  - 답변: {user answer}
```

### Rules Update Logic

설정 정보를 기반으로 규칙 파일 업데이트:

1. **`.cursor/rules/figma-component-process.mdc`**
   - Figma 컴포넌트 페이지 URL이 있으면 추가
   - 컴포넌트 매핑 정보 추가

2. **`.cursor/rules/component-usage.mdc`**
   - 아이콘 라이브러리 정보 반영
   - 프로젝트 타입별 규칙 추가

3. **`.cursor/rules/code-standards.mdc`**
   - 반응형 디자인 크기 정보 반영
   - 프로젝트별 설정 추가

### Component Setup Process

Figma 컴포넌트 링크가 제공된 경우:

1. 각 컴포넌트에 대해:
   - `/figma-component` 커맨드 실행
   - 또는 `@src/components/default/{ComponentName}/ : {Figma URL}` 형식 사용
2. 컴포넌트 생성/업데이트
3. Storybook 스토리 생성
4. `src/components/default/index.ts` 업데이트

## Execution

### Automatic Execution

사용자가 `/setup-project` 커맨드를 실행하면:

1. **Step 1 자동 실행**: 기존 컴포넌트 확인
   - `src/components/default/` 디렉토리 읽기
   - `src/components/default/index.ts` 읽기
   - 컴포넌트 목록 추출

2. **기존 컴포넌트가 있는 경우**:
   ```
   현재 {N}개의 컴포넌트가 설정되어 있습니다:
   - {ComponentName1}
   - {ComponentName2}
   - ...
   
   이 설정을 업데이트하시겠습니까? (y/n)
   ```
   - y: Step 2로 진행
   - n: "현재 설정을 유지합니다. `/create-page` 커맨드를 사용하여 페이지를 생성할 수 있습니다."

3. **기존 컴포넌트가 없는 경우 또는 업데이트 선택한 경우**:
   - Step 2: 체크리스트 진행
   - 각 질문에 대해 사용자 입력 대기
   - 답변 받을 때마다 체크리스트 업데이트
   - 모든 질문 완료 후 Step 3-7 자동 실행

### Interactive Questions

각 질문은 순차적으로 진행되며, 사용자의 답변을 기다립니다:

1. 프로젝트 타입 질문 → 답변 대기 → 체크리스트 업데이트
2. Figma 컴포넌트 페이지 질문 → 답변 대기 → 체크리스트 업데이트
3. (링크가 있으면) 링크 유효성 확인 → 컴포넌트 목록 추출 → 각 컴포넌트 링크 요청
4. 아이콘 라이브러리 질문 → 답변 대기 → 체크리스트 업데이트
5. 앱 로고 질문 → 답변 대기 → 체크리스트 업데이트
6. 디자인 토큰 질문 → 답변 대기 → 체크리스트 업데이트
7. 반응형 디자인 질문 → 답변 대기 → 체크리스트 업데이트

### After Checklist Completion

모든 체크리스트가 완료되면:

1. `.cursor/project-setup.md` 파일 생성/업데이트
2. 규칙 파일 업데이트:
   - `.cursor/rules/figma-component-process.mdc`
   - `.cursor/rules/component-usage.mdc`
   - `.cursor/rules/code-standards.mdc`
3. Figma 컴포넌트 링크가 있으면 각 컴포넌트 설정:
   - `/figma-component` 커맨드 자동 실행
4. 검증:
   - `pnpm lint` 실행
   - `pnpm build` 실행
5. 완료 메시지:
   ```
   프로젝트 설정이 완료되었습니다!
   
   다음 단계:
   - `/create-page` 커맨드를 사용하여 페이지를 생성할 수 있습니다.
   - 설정 정보는 `.cursor/project-setup.md`에 저장되었습니다.
   ```

## Usage Example

```
/setup-project
```

실행 시:
1. 기존 컴포넌트 확인
2. 체크리스트 진행 (필요시)
3. 설정 정보 저장
4. 규칙 업데이트
5. 컴포넌트 설정 (필요시)
6. 검증
7. 완료 알림

## Notes

- 모든 질문은 한국어로 진행
- 각 답변은 체크리스트에 `- [x]` 형태로 저장
- Figma 링크는 자동으로 유효성 검증 (`mcp_Figma_get_metadata` 사용)
- 설정 완료 후 바로 `/create-page` 사용 가능
- 설정 정보는 `.cursor/project-setup.md`에 저장되어 재사용 가능
- 기존 컴포넌트가 있으면 현재 상태를 먼저 알려주고 업데이트 여부 확인
