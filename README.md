> # 1. 설치 및 실행 방법
>
> ```bash
> # 1 .env.local 생성 및 환경 변수 설정
> echo -e "NEXT_PUBLIC_API_URL=http://localhost:3333\nNEXT_PUBLIC_ENABLE_MSW=true" > .env.local
>
> # 2 의존성 설치
> npm install
>
> # 3 개발 서버 실행 (포트 3333)
> npm run dev -- -p 3333
> ```

---

> # 2. 폴더 구조 설명
>
> ## 📝 주요 폴더/파일 설명
>
> - **`src/app/(private)`** : 로그인 후 접근 가능한 비공개 페이지 라우트
> - **`src/app/(public)`** : 로그인 없이 접근 가능한 공개 페이지 라우트
> - **`src/features/`** : 도메인별 기능 모듈 (auth, course, dashboard 등)
> - **`src/features/api`** : API를 호출하는 함수와 react-query 관련 훅
> - **`src/features/components`** : 해당 도메인의 화면을 구성하는 컴포넌트
> - **`src/features/hooks`** : 커스텀 훅
> - **`src/features/schemas`** : 폼에서 사용되는 스키마 정의
> - **`src/features/types`** : 해당 도메인의 엔티티 및 타입 정의
> - **`src/mocks/`** : MSW(Mock Service Worker) 관련 파일
> - **`src/mocks/data`** : MSW 관련 더미데이터
> - **`src/mocks/handlers`** : API 요청을 잡아서 처리
> - **`src/mocks/utils`** : MSW 관련 더미데이터 생성하는 함수
> - **`src/mocks/browser.ts`** : 브라우저에서 MSW가 네트워크 요청을 가로채도록 등록
> - **`src/shared/`** : 프로젝트 전역 공통 모듈
> - **`src/shared/api/queryClent.ts`** : React Query 데이터 요청용 클라이언트 설정
> - **`src/shared/components`** : 버튼, 입력 폼, 모달 등 공통 컴포넌트
> - **`src/shared/hooks`** : 공통으로 사용되는 커스텀 훅
> - **`src/shared/layouts`** : 페이지 레이아웃
> - **`src/shared/lib/apiClient.ts`** : API 요청 공통 함수
> - **`src/shared/lib/axios.ts`** : Axios 인스턴스 및 설정
> - **`src/shared/providers`** : 전역 상태, 테마, 인증 등 Context Provider
> - **`src/shared/type`** : 공통으로 사용되는 인터페이스, 타입
> - **`.env.local`** : 로컬 환경 변수 설정
> - **`package.json`** : 프로젝트 정보, 의존성, 스크립트 정의
> - **`tsconfig.json`** : TypeScript 프로젝트 설정
> - **`next.config.js`** : Next.js 커스텀 설정
> - **`public/`** : 정적 파일 저장 폴더 (이미지, favicon 등)
> - **`node_modules/`** : npm 설치 패키지 모듈
> - **`README.md`** : 프로젝트 안내 문서
>
> ```plaintext
> academy-app/
> ├─ .next/                              # Next.js 빌드 출력 디렉터리
> ├─ node_modules/                       # npm 설치 모듈
> ├─ public/                             # 정적 파일 (이미지, favicon, MSW 등)
> │   └─ mockServiceWorker.js            # MSW(Mock Service Worker) 스크립트
> ├─ src/
> │   ├─ app/                            # 페이지 라우트 관련
> │   │   ├─ (private)/                  # 로그인 후 접근 가능한 대시보드 페이지
> │   │   │   ├─ courses 페이지
> │   │   │   ├─ profile 페이지
> │   │   │   └─ dashboard 페이지
> │   │   ├─ (public)/                   # 로그인 없이 접근 가능한 공개 페이지
> │   │   │   ├─ contact 페이지
> │   │   │   ├─ courses 페이지
> │   │   │   ├─ courses/[id] 페이지
> │   │   │   ├─ instructors 페이지
> │   │   │   ├─ login 페이지
> │   │   │   └─ register 페이지
> │   │   ├─ globals.css                 # 전역 스타일
> │   │   ├─ layout.tsx                  # 전체 레이아웃 정의
> │   │   ├─ not-found.tsx               # 404 페이지 (메인페이지로 redirect)
> │   │   └─ page.tsx                    # 루트 페이지
> │   ├─ features/                       # 도메인별 기능 모듈
> │   │   ├─ auth/                       # 인증 관련 기능 (로그인, 회원가입)
> │   │   │   ├─ api/
> │   │   │   ├─ components/
> │   │   │   ├─ hooks/
> │   │   │   ├─ schemas/
> │   │   │   └─ types/
> │   │   ├─ course/                     # 강의 관련 기능 (api, components, hooks, types 구조 반복)
> │   │   ├─ dashboard/                  # 대시보드 관련 기능 (api, components, hooks, types 구조 반복)
> │   │   ├─ inquiry/                    # 문의 기능 (api, components, hooks, types 구조 반복)
> │   │   └─ instructor/                 # 강사 관련 기능 (api, components, hooks, types 구조 반복)
> │   ├─ mocks/                          # MSW 모킹 관련
> │   │   ├─ browser.ts
> │   │   ├─ data/                       # 샘플 데이터
> │   │   ├─ handlers/                   # 요청 핸들러
> │   │   └─ utils/
> │   └─ shared/                         # 프로젝트 전역에서 사용하는 공통 모듈
> │       ├─ api/queryClient.ts
> │       ├─ components/                 # 공통 컴포넌트 (Header, Notification 등)
> │       ├─ hooks/useAuthStore.ts
> │       ├─ layouts/                    # 레이아웃 컴포넌트
> │       ├─ lib/                        # API 클라이언트, axios 등
> │       ├─ providers/                  # React Query Provider 등
> │       └─ types/type.ts
> ├─ .env.local                          # 로컬 환경 변수
> ├─ .env.production                     # 배포 환경 변수
> ├─ .gitignore                          # Git 무시 파일
> ├─ .prettierignore                     # Prettier 무시 파일
> ├─ .prettierrc                         # Prettier 설정
> ├─ eslint.config.mjs                   # ESLint 설정
> ├─ LICENSE                             # 라이선스
> ├─ next-env.d.ts                       # Next.js 타입 정의
> ├─ next.config.ts                      # Next.js 설정
> ├─ package-lock.json                   # npm 잠금 파일
> ├─ package.json                        # 프로젝트 정보, 의존성, 스크립트
> ├─ postcss.config.mjs                  # PostCSS 설정
> ├─ README.md                           # 프로젝트 안내 문서
> ├─ tailwind.config.ts                  # Tailwind CSS 설정
> └─ tsconfig.json                       # TypeScript 설정
> ```

---

> # 3. 각 페이지 별 렌더링 전략
>
> 전략을 미리 고민하지 않고 익숙한 방식인 CSR 방식으로 개발을 시작했습닌다.
> 뒤늦게 각 화면에 더 적합한 방식으로 수정하려고 시도했지만, 생각만큼 수월하게 되지 않았습니다.
> 그래서 여기에는 다시 처음부터 시작한다면 어떻게 접근했을지 고민한 결과를 적었습니다.
>
> | 전략                                      | 설명                                                                                   | 사용 예시                |
> | ----------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------ |
> | **Static Generation (SSG)**               | 빌드 시점에 HTML을 미리 생성. 요청 시 서버에 부담 없음.                                | 블로그, 마케팅 페이지    |
> | **Server-Side Rendering (SSR)**           | 요청이 들어올 때마다 서버에서 HTML 생성. 실시간 데이터 반영 가능.                      | 대시보드, 개인화 페이지  |
> | **Client-Side Rendering (CSR)**           | 브라우저에서 JS가 실행되며 데이터를 불러와 렌더링. SEO 필요 없고 인터랙티브 UI에 적합. | SPA, 채팅 앱             |
> | **Incremental Static Regeneration (ISR)** | SSG와 비슷하지만, 일정 시간마다 페이지를 재생성 가능.                                  | 뉴스, 상품 리스트 페이지 |
>
> ---
>
> ---
>
> | URL                | 페이지 이름 | 렌더링 전략 | 선택 이유                                                                                                  |
> | ------------------ | ----------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
> | /                  | 홈          | SSG         | 화면 초기에 데이터가 하드코딩되어 자주 바뀌지 않음 → 빌드 시점에 미리 렌더링 → 빠른 초기 로딩              |
> | /login             | 로그인      | CSR         | 서버에 미리 가져올 데이터 없음                                                                             |
> | /register          | 회원가입    | CSR         | 서버에 미리 가져올 데이터 없음                                                                             |
> | /courses           | 강좌 목록   | SSR + CSR   | 서버에서 초기 목록 fetch → SEO, 빠른 초기 렌더링 / 클라이언트에서 필터, 페이지네이션, 인피니트 스크롤 처리 |
> | /courses/[:id]     | 강좌 상세   | SSR + CSR   | 서버에서 강좌/강사 정보 fetch → SEO / 후기 등 동적 데이터는 클라이언트에서 최신 상태 유지                  |
> | /instructors       | 강사 목록   | SSR + CSR   | 서버에서 초기 강사 목록 fetch → SEO / 클라이언트에서 검색/필터 기능 제공                                   |
> | /dashboard         | 대시보드    | SSR + CSR   | 서버에서 초기 학습 데이터 fetch → 빠른 렌더링 / 클라이언트에서 최신 진도 데이터 유지                       |
> | /dashboard/courses | 수강 관리   | SSR + CSR   | 서버에서 초기 수강 데이터 fetch → 빠른 렌더링 / 클라이언트에서 검색/필터 기능 제공                         |
> | /dashboard/profile | 마이페이지  | SSR + CSR   | 서버에서 초기 개인정보/이력 fetch → 빠른 렌더링 / 클라이언트에서 폼 제출 및 최신 데이터 유지               |
> | /contact           | 문의하기    | CSR         | 서버에 미리 가져올 데이터 없음                                                                             |
>
> 결론: 비슷한 화면이라고 해도 요구 사항에 따라 전략이 바뀌기도 하고, 다양한 전략을 섞어야 하기도 한다는 걸 알게 되었습니다.

---

> # 4. 고민했던 점
>
> ## 1. 데이터
>
> - 엔티티 & 데이터 모델링: 어떤 구조로 데이터를 정의할지, 관계를 어떻게 맺을지 고민
> - 데이터 운반: zustand, provider 등 상태 관리 방법 선택
> - API 캐시: react-query를 이용한 효율적인 데이터 요청 및 재사용 전략
>
> ## 2. 화면 & UI
>
> - 화면 구성: UI 레이아웃과 페이지 구조
> - 폴더 구조: 기능, 역할별 분리
> - 컴포넌트: 컴포넌트의 분리 및 공통 컴포넌트 화용
>
> ## 3. 인증 & 보안
>
> - 인증 처리: access-token, refresh-token 관리 등 보안 및 세션 관리 방법
>
> ## 4. 기타
>
> - AI 관련 기능을 어디까지, 어떻게 적용할지 고민
> - 문서화 필요성: 향후 유지보수 및 협업을 위한 문서 작성

---

> # 5. 자가 평가
>
> - 처음 접하는 라이브러리를 이해하는 데 시간이 많이 걸림. 문서와 AI 참고했지만, 실제 프로젝트 적용 과정에서 예상치 못한 시행착오 경험
> - 초기 설계 단계에서 다크 모드나 페이지별 렌더링 전략을 충분히 고려하지 못함
> - 화면에 맞는 데이터를 가져와 화면에 녹이기 위해 엔티티와 모델링을 고민. 확장 가능성을 염두에 두었으나 기획 단계에서 충분치 않아 중간 수정 필요
> - 더미 데이터를 이용한 테스트 환경과 실제 데이터 흐름의 차이에서 제한 경험
> - 일정 관리가 아직 쉽지 않음
>
> > - 구현하지 못한 기능
> >
> > 1.  refreshToken
> > 2.  ApiResponse 통일
> > 3.  테스트 코드 (E2E 테스트)
> > 4.  다크모드
> > 5.  렌더링 전략 (SSG / SSR / ISR / CSR)
> > 6.  SEO
> > 7.  엔티티 확장
