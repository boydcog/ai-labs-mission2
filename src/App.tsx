/**
 * 프로젝트 가이드 페이지
 * Cursor를 사용한 Figma MCP 기반 프로젝트 설정 및 사용 방법을 안내합니다.
 */

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full py-8 sm:py-12 lg:py-16 space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Header */}
          <header className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e242f]">
              Figma MCP 기반 React 프로젝트
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#323d4e]">
              Cursor IDE와 Figma MCP를 활용하여 디자인을 자동으로 코드로 변환하는 보일러플레이트입니다.
            </p>
          </header>

          {/* Section 1: 프로젝트 설정 */}
          <section className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e242f]">
              1. 프로젝트 설정
            </h2>
            <div className="bg-[#f8f9fc] rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-[#323d4e]">
                Cursor IDE에서 다음 커맨드를 실행하여 프로젝트를 초기 설정하세요:
              </p>
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                  /setup-project
                </code>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-[#323d4e]">
                <p className="font-medium">이 커맨드는 다음을 수행합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>기존 컴포넌트 확인 및 목록 표시</li>
                  <li>프로젝트 타입 설정 (웹/모바일/하이브리드)</li>
                  <li>Figma 디자인 컴포넌트 페이지 링크 설정</li>
                  <li>아이콘 라이브러리 설정</li>
                  <li>앱 로고 설정</li>
                  <li>디자인 토큰 확인</li>
                  <li>반응형 디자인 설정</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Storybook 확인 */}
          <section className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e242f]">
              2. Storybook에서 컴포넌트 확인
            </h2>
            <div className="bg-[#f8f9fc] rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-[#323d4e]">
                Storybook을 실행하여 모든 컴포넌트와 디자인 토큰을 확인하세요:
              </p>
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                  pnpm storybook
                </code>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-[#323d4e]">
                <p className="font-medium">Storybook에서 확인할 수 있는 내용:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>컴포넌트</strong>: 모든 기본 컴포넌트의 variant 및 상태
                  </li>
                  <li>
                    <strong>Base/Colors</strong>: 색상 토큰 시각화
                  </li>
                  <li>
                    <strong>Base/Typography</strong>: 타이포그래피 토큰
                  </li>
                  <li>
                    <strong>Base/Spacing</strong>: 간격 토큰
                  </li>
                  <li>
                    <strong>Base/BorderWidth</strong>: 테두리 두께
                  </li>
                  <li>
                    <strong>Base/Radius</strong>: 모서리 반경
                  </li>
                  <li>
                    <strong>Base/Opacity</strong>: 투명도 값
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-[#323d4e] mt-2">
                  브라우저에서 <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9]">http://localhost:6006</code>로 접속하세요.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: 컴포넌트 생성 */}
          <section className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e242f]">
              3. Figma 컴포넌트 생성
            </h2>
            <div className="bg-[#f8f9fc] rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-[#323d4e]">
                Figma 디자인 컴포넌트를 React 컴포넌트로 변환:
              </p>
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                  /create-component @src/components/default/ComponentName/ : https://www.figma.com/design/...?node-id=123-456
                </code>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-[#323d4e]">
                <p className="font-medium">자동으로 수행되는 작업:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Figma 디자인 컨텍스트 추출</li>
                  <li>디자인 토큰 적용</li>
                  <li>컴포넌트 생성/업데이트</li>
                  <li>Storybook 스토리 생성</li>
                  <li>Lint 및 Build 검증</li>
                  <li>컴포넌트 테스트 실행 (pnpm test:component)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: 페이지 생성 */}
          <section className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e242f]">
              4. 페이지 생성
            </h2>
            <div className="bg-[#f8f9fc] rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-[#323d4e]">
                Figma 페이지 디자인을 React 페이지로 변환:
              </p>
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                  /create-page PageName : https://www.figma.com/design/...?node-id=123-456
                </code>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-[#323d4e]">
                <p className="font-medium">자동으로 수행되는 작업:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>페이지 구조 분석</li>
                  <li>기존 컴포넌트 매핑</li>
                  <li>레이아웃 생성</li>
                  <li>상태 관리 추가</li>
                  <li>반응형 디자인 적용</li>
                  <li>Lint 및 Build 검증</li>
                  <li>페이지 테스트 실행 (pnpm test)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: 최종 결과 확인 */}
          <section className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e242f]">
              5. 최종 결과 확인
            </h2>
            <div className="bg-[#f8f9fc] rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-[#1e242f] mb-2">
                    개발 서버 실행
                  </p>
                  <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                    pnpm dev
                  </code>
                  <p className="text-xs sm:text-sm text-[#323d4e] mt-2">
                    <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9]">http://localhost:5173</code>에서 확인
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-[#1e242f] mb-2">
                    Storybook 실행
                  </p>
                  <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                    pnpm storybook
                  </code>
                  <p className="text-xs sm:text-sm text-[#323d4e] mt-2">
                    <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9]">http://localhost:6006</code>에서 확인
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-[#1e242f] mb-2">
                    컴포넌트 테스트
                  </p>
                  <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                    pnpm test:component
                  </code>
                  <p className="text-xs sm:text-sm text-[#323d4e] mt-2">
                    컴포넌트 생성/수정 시 실행
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-[#1e242f] mb-2">
                    프로덕션 빌드
                  </p>
                  <code className="text-sm sm:text-base lg:text-lg text-[#2a69e9] font-mono block break-all">
                    pnpm build
                  </code>
                  <p className="text-xs sm:text-sm text-[#323d4e] mt-2">
                    빌드 결과는 <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9]">dist/</code> 폴더에 생성됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Cursor 기능 활용 */}
          <section className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e242f]">
              6. Cursor 기능 활용
            </h2>
            <div className="bg-[#f8f9fc] rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-[#1e242f] mb-2">
                    Templates (템플릿)
                  </p>
                  <p className="text-xs sm:text-sm text-[#323d4e] mb-2">
                    컴포넌트 및 페이지 생성 표준 템플릿
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#323d4e] ml-2">
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/templates/component-template.mdc</code></li>
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/templates/page-template.mdc</code></li>
                  </ul>
                  <p className="text-xs text-[#323d4e] mt-2">
                    사용: <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">@.cursor/templates/component-template.mdc</code>
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-[#1e242f] mb-2">
                    Snippets (스니펫)
                  </p>
                  <p className="text-xs sm:text-sm text-[#323d4e] mb-2">
                    자주 사용하는 코드 패턴 및 스니펫
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#323d4e] ml-2">
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/snippets/common-patterns.mdc</code></li>
                  </ul>
                  <p className="text-xs text-[#323d4e] mt-2">
                    사용: <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">@.cursor/snippets/common-patterns.mdc</code>
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-[#1e242f] mb-2">
                    Context Files (컨텍스트 파일)
                  </p>
                  <p className="text-xs sm:text-sm text-[#323d4e] mb-2">
                    디자인 토큰 등 참조 정보
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#323d4e] ml-2">
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/context/design-tokens-reference.mdc</code></li>
                  </ul>
                  <p className="text-xs text-[#323d4e] mt-2">
                    사용: <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">@.cursor/context/design-tokens-reference.mdc</code>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: 추가 정보 */}
          <section className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e242f]">
              7. 추가 정보
            </h2>
            <div className="bg-[#f8f9fc] rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base font-medium text-[#1e242f] mb-2">
                    프로젝트 구조
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#323d4e] ml-2">
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">src/components/default/</code></li>
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">src/tokens/</code></li>
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/rules/</code></li>
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/commands/</code></li>
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/templates/</code></li>
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/snippets/</code></li>
                    <li><code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9] break-all">.cursor/context/</code></li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base font-medium text-[#1e242f] mb-2">
                    코드 품질
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#323d4e] ml-2">
                    <li>파일 크기: 300줄 이내</li>
                    <li>코드 재사용 우선</li>
                    <li>작업 후 Lint 및 Build 검증 필수</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 border border-[#dbe1eb]">
                  <p className="text-sm sm:text-base font-medium text-[#1e242f] mb-2">
                    반응형 디자인
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#323d4e] ml-2">
                    <li>기본 디자인 크기: 360px x 732px</li>
                    <li>모바일 범위: 320px ~ 480px</li>
                    <li>데스크탑/태블릿: 모바일 UI 유지</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-4 border-t border-[#dbe1eb]">
            <p className="text-xs sm:text-sm text-[#323d4e] text-center">
              자세한 내용은 <code className="bg-[#edf1f8] px-1 py-0.5 rounded text-[#2a69e9]">README.md</code>를 참고하세요.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
