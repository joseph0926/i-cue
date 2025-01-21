# Icue (아이큐)

> **프로젝트명**: **Icue (아이큐)**
>
> 시청자(혹은 기획자)가 스트리머에게 방송 컨셉과 프로젝트 아이디어를 제안하고, 스트리머는 이를 채택하여 **새로운 방송 콘텐츠**를 제작할 수 있도록 돕는 “**방송 아이디어 매칭 플랫폼**”입니다.  
> 본 저장소는 **Next.js**, **Prisma**, **shadcn/ui** 등을 활용한 **모노레포** 구조로 되어 있으며,  
> 프로젝트 관리 및 협업을 위해 **Turbo Repo**와 **pnpm**을 사용합니다.

<br />

---

## 목차

1. [프로젝트 정보](#프로젝트-정보)
2. [프로젝트 개요](#프로젝트-개요)
3. [핵심 기능](#핵심-기능)
4. [폴더 구조](#폴더-구조)
5. [사용 기술](#사용-기술)
6. [설치 및 실행](#설치-및-실행)
7. [환경 변수](#환경-변수)
8. [주요 스크립트](#주요-스크립트)
9. [기여 방법](#기여-방법)
10. [문의](#문의)

<br />

---

## 프로젝트 정보

- **프로젝트명**: Icue (아이큐)
- **프로젝트 깃허브**: [https://github.com/joseph0926/i-cue](https://github.com/joseph0926/i-cue)
- **프로젝트 개발자**: 김영훈
  - 깃허브: [https://github.com/joseph0926](https://github.com/joseph0926)
  - 이메일: [rkekqmf0926@gmail.com](mailto:rkekqmf0926@gmail.com)

<br />

---

## 프로젝트 개요

### 배경

- **스트리머의 고민 해소**  
  매일 새롭고 재미있는 방송 주제를 고민하는 시간을 줄여줍니다.

- **시청자(기획자)의 참여 욕구 충족**  
  단순 시청에서 벗어나 **방송 기획에 직접 참여**하고, 채택 시 보상과 명예를 얻을 수 있습니다.

- **방송 아이디어 생태계 조성**  
  스트리머와 시청자를 연결해 아이디어를 크라우드소싱하고, 이를 통해 **새롭고 차별화된 방송 콘텐츠**가 만들어지도록 합니다.

### 주요 목표

- **양질의 방송 아이디어**를 쉽게 수급하고, 스트리머와 시청자 모두에게 **Win-Win** 효과를 제공
- **채택된 제안자**에게는 포인트, 현금, 굿즈, 방송 출연, VIP 혜택 등 **다양한 보상**을 지급
- **공모·채택·협업** 과정을 플랫폼에서 체계적으로 운영하여, **유료 공모 / 수수료 / 브랜드 협업** 등 **안정적 수익 모델** 마련

<br />

---

## 핵심 기능

1. **아이디어 제안 시스템**

   - 방송 컨셉, 진행 방식, 소요 자원 등을 작성해 **구체적인 아이디어**를 제출
   - 게임, 토크, 챌린지, 이벤트, 협찬 등 **카테고리**별로 분류

2. **필터링 및 투표·평가**

   - 키워드 필터링(AI)으로 **부적절 제안** 자동 블라인드
   - 커뮤니티 투표·좋아요·댓글을 통해 **우수 아이디어**를 선별

3. **채택 및 보상**

   - 스트리머가 채택한 아이디어는 **포인트/현금/굿즈/VIP 혜택** 등을 통해 보상
   - 채택 이력에 따른 **레벨·뱃지** 부여로 명예를 강화

4. **브랜드·광고주 협업**
   - 광고주가 특정 주제를 공모하고, **스트리머 & 시청자**가 매칭되어 진행
   - 채택 후 실행 시, **중개 수수료**로 플랫폼 수익화

<br />

---

## 폴더 구조

본 저장소는 **Turbo 레포(모노레포)** 형태로 구성되어 있습니다.

```bash
.
├── .env.development
├── .gitignore
├── .nvmrc
├── README.md
├── apps
│   ├── admin          # Admin용 앱 (추후 확장 가능)
│   ├── web            # 주요 웹 프론트엔드 (Next.js)
│   │   ├── src
│   │   │   ├── actions
│   │   │   ├── app
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── lib
│   │   │   └── providers
│   │   ├── public
│   │   ├── ...
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── webview        # 웹뷰 프로젝트 (추후 모바일앱/웹뷰로 확장 가능)
├── packages
│   ├── config         # ESLint, Tailwind 등 공통 설정
│   ├── db             # Prisma DB 스키마, 마이그레이션, DB 유틸
│   ├── shared         # 전역에서 활용하는 공통 타입/유틸
│   └── ui             # shadcn/ui 기반 공통 UI 컴포넌트
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prettier.config.js
└── turbo.json
```

> **참고**
>
> - `apps/web`: Next.js 기반 메인 웹 앱
> - `packages/db`: **Prisma** 설정 및 마이그레이션 관리
> - `packages/ui`: **shadcn/ui** 기반 공통 UI 컴포넌트 모음
> - `packages/shared`: 공통 타입/유틸
> - `packages/config`: ESLint, Tailwind 등 프로젝트 공통 설정

<br />

---

## 사용 기술

### 메인 프레임워크 & 라이브러리

- **Next.js (v15.1.4)**: React 기반 SSR 및 라우팅
- **React (v19)**: UI 렌더링
- **Tailwind CSS**: 유틸리티-first 스타일링
- **shadcn-ui**: 버튼, 폼 등 **공통 UI 컴포넌트** 라이브러리

### 인증 & 데이터베이스

- **NextAuth (v5.0.0-beta.25)**: OAuth, Email, Credentials 등 인증 전략 지원
- **Prisma (v6.2.1)**: 타입 안전한 DB ORM (DB 스키마, 마이그레이션)

### 기타 라이브러리

- **React Hook Form (v7.54.2)**: 폼 상태/검증
- **Zod (v3.24.1)**: 스키마 및 타입 안전성 보장
- **bcryptjs**: 비밀번호 해싱
- **resend**: 이메일 전송(가입 인증, 알림 등)
- **lucide-react**: 아이콘 패키지
- **motion**: 애니메이션 효과

### 개발 환경 & 도구

- **pnpm**: 패키지 의존성 관리
- **Turbo Repo**: 모노레포 관리 툴
- **ESLint, Prettier**: 코드 품질 및 포맷팅
- **.env**: 환경 변수 설정

<br />

---

## 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/joseph0926/i-cue.git
```

### 2. 패키지 설치

```bash
pnpm install
```

> `pnpm`이 설치되어 있지 않다면, [공식 문서](https://pnpm.io/installation)를 참고해주세요.

### 3. 개발 서버 실행

```bash
pnpm run dev
```

- 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 실행 화면을 확인할 수 있습니다.

### 4. Prisma 마이그레이션 (DB 사용 시)

```bash
pnpm prisma migrate dev
```

- `.env.development` 파일에서 **DATABASE_URL** 등을 확인 후 DB 연결 정보를 설정하세요.

<br />

---

## 환경 변수

다음은 **`.env.development`** 파일에 들어갈 예시입니다. 실제 사용 시 적절한 값으로 교체하세요.

```bash
DATABASE_URL=""
AUTH_SECRET=""

AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_NAVER_ID=""
AUTH_NAVER_SECRET=""
AUTH_KAKAO_ID=""
AUTH_KAKAO_SECRET=""

AUTH_RESEND_KEY=""
```

> 필요 시, **프로덕션 환경**을 위한 `.env.production` 파일을 별도로 구성하시기 바랍니다.

<br />

---

## 주요 스크립트

다음은 루트 `package.json`(또는 `apps/web/package.json`) 기준 스크립트 예시입니다.

- **`pnpm run dev`**  
  로컬 개발 서버 실행 (Next.js)

- **`pnpm run build`**  
  프로덕션 빌드 (Next.js, Prisma 등)

- **`pnpm run start`**  
  빌드된 프로덕션 앱 실행

- **`pnpm lint`**  
  ESLint 검사 및 코드 스타일 점검

- **`pnpm format`**  
  Prettier 포맷팅 적용

- **`pnpm prisma migrate dev`**  
  DB 마이그레이션(개발 환경용).  
  프로덕션에서는 `pnpm prisma migrate deploy` 추천

<br />

---

## 기여 방법

1. 이슈(버그·개선·기능 요청 등)를 [Issue Tracker](https://github.com/joseph0926/i-cue/issues)에 등록해주세요.
2. 신규 기능 개발 시, **Fork** 후 **`feature/브랜치명`**을 생성해 작업해주세요.
3. 작업이 끝나면 **Pull Request(PR)**를 열고, 리뷰 및 승인을 받습니다.
4. 코드 리뷰가 완료되면 main/master 브랜치에 머지됩니다.

> **Note**: 추후 “기여 가이드(Contribution Guide)” 문서를 별도로 제공할 예정입니다.

<br />

---

## 문의

- **프로젝트 관련 문의**: [rkekqmf0926@gmail.com](mailto:icue.streaming@gmail.com)
- **버그 제보 및 개선 제안**: [이슈 등록](https://github.com/joseph0926/i-cue/issues)

<br />

> **참고**
>
> - 상기 내용 및 구조는 **초기 설계안**으로, 추후 릴리스 과정에서 일부가 변경될 수 있습니다.
