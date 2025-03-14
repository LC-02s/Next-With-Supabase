# 인프런 워밍업 클럽 3기 - 풀스택(Next.js + Supabase) 스터디

해당 레포지토리는 인프런에서 진행하는 [워밍업 클럽 3기 - 풀스택(Next.js + Supabase) 스터디](https://www.inflearn.com/course/offline/warmup-club-3-fs)에서 수행하는 미션 저장소입니다. 총 4주차(03.04 ~ 03.28)에 걸쳐 [Todo List](/apps/todo), [Dropbox 클론](/apps/dropbox), [Netflix 클론](/apps/netflix), [인스타그램 클론](/apps/instagram) 프로젝트로 구성될 예정입니다.

<br />

## 📚 공통 사용 기술

- 프레임워크: `Next.js v15`, `React v19`
- 데이터베이스: `Supabase`
- 서버 상태관리: `Tanstack Query v5`
- 클라이언트 상태관리: `Zustand v5`
- 스타일 프레임워크: `TailWindCSS v3`, `Mantine v7`, `Tabler Icons`
- 모노레포: `Turbo Repo`
- 패키지 매니저: `pnpm`

<br />

## 🗂️ 폴더 구조

```bash
├── apps/
│   ├── todo/        # [1주차] Todo List
│   ├── dropbox/     # [2주차] 드롭박스 클론
│   ├── netflix/     # [3주차] 넷플릭스 클론
│   └── instagram/   # [4주차] 인스타그램 클론
├── packages/
│   ├── eslint-config/
│   ├── tailwind-config/
│   └── typescript-config/
└── README.md
```

<br />

## 📋 실행 가이드

<br />

### 명령어 컨벤션

컨벤션:

- 서비스 이름: `todo`, `dropbox`, `netflix`, `instagram`
- 지원 명령어: `add`, `dev`, `build`, `lint`, `start`, `type`

```bash
pnpm 명령어:[서비스 이름] 옵션
```

사용 예시:

```bash
pnpm add:todo dayjs  # todo 프로젝트에 dayjs 설치
```

<br />

### 환경 변수

환경 변수는 각각의 프로젝트의 루트 경로에 `.env.local` 파일으로 생성해주세요.

```bash
SUPABASE_URL=           # supabse 서버의 Project URL을 입력해주세요.
SUPABASE_ANON_KEY=      # supabse 서버의 Anon Public API Key를 입력해주세요.
SUPABASE_SERVICE_ROLE=  # supabse 서버의 Secret Service Role을 입력해주세요.
SUPABASE_DB_PASSWORD=   # supabse 서버의 DB 패스워드를 입력해주세요.
```

<br />

### 개발 환경

요구 환경:

```text
- Node.js @^20
- pnpm @9.1.0
```

의존성 설치:

```bash
pnpm install
```

통합 실행:

```bash
pnpm dev
```

개별 실행:

```bash
pnpm dev:[서비스 이름]
```

<br />

### 빌드

통합 빌드:

```bash
pnpm build
```

개별 빌드:

```bash
pnpm build:[서비스 이름]
```

<br />

## 🗓️ 스터디 일정

### 1주차

| Day | Date | 내용 | 진도 | 비고 |
| :-- | :-- | :-- | :-- | :-: |
| Day 2 | 3.4(화) | 오리엔테이션 | 섹션 1 | 미션 O |
| Day 3 | 3.5(수) | Next.js 기본기 | 섹션 2 유닛 1\~2 |  |
| Day 4 | 3.6(목) | TailwindCSS & Recoil | 섹션 2 유닛 3\~4 |  |
| Day 5 | 3.7(금) | React Query & Supabase 소개 | 섹션 2 유닛 5, 섹션 3 유닛 1 |  |
| Day 6 | 3.8(토) | TODO List 클론 - 프로젝트 설정 & CRUD 구현 | 섹션 3 유닛 2\~6 |  |

### 2주차

| Day | Date | 내용 | 진도 | 비고 |
| :-- | :-- | :-- | :-- | :-: |
| Day 7 | 3.10(월) | Dropbox 클론 - 프로젝트 준비 | 섹션 4 유닛 1\~2 | 미션 O |
| Day 8 | 3.11(화) | Dropbox 클론 - UI 구축 | 섹션 4 유닛 3 |  |
| Day 9 | 3.12(수) | Dropbox 클론 - 파일 업로드 구현 | 섹션 4 유닛 4 |  |
| Day 10 | 3.13(목) | Dropbox 클론 - 파일 삭제 & 멀티 업로드 | 섹션 4 유닛 5 |  |
| Day 11 | 3.14(금) 20:00 | 중간점검 | 진행 상황 공유, 질의응답 | 온라인 라이브 |

### 3주차

| Day    | Date     | 내용                              | 진도                         |  비고  |
| :----- | :------- | :-------------------------------- | :--------------------------- | :----: |
| Day 12 | 3.17(월) | Netflix 클론 - 프로젝트 준비      | 섹션 5 유닛 1\~2             | 미션 O |
| Day 13 | 3.18(화) | Netflix 클론 - UI 구축            | 섹션 5 유닛 3                |        |
| Day 14 | 3.19(수) | Netflix 클론 - 검색 & 상세 페이지 | 섹션 5 유닛 4                |        |
| Day 15 | 3.20(목) | Netflix 클론 - 무한 스크롤 & SEO  | 섹션 5 유닛 5                |        |
| Day 16 | 3.21(금) | Netflix 클론 - 추가 기능 구현     | 사용자 즐겨찾기 기능 추가 등 |        |

### 4주차

| Day | Date | 내용 | 진도 | 비고 |
| :-- | :-- | :-- | :-- | :-: |
| Day 17 | 3.24(월) | 인스타그램 클론 - 프로젝트 준비 | 섹션 6 유닛 1\~2 | 미션 O |
| Day 18 | 3.25(화) | 인스타그램 클론 - 로그인 & 회원가입 구현 | 섹션 6 유닛 3\~5 |  |
| Day 19 | 3.26(수) | 인스타그램 클론 - 채팅 기능 구현 | 섹션 7 유닛 1\~4 |  |
| Day 20 | 3.27(목) | 인스타그램 클론 - RLS 적용 | 섹션 7 유닛 5\~6 |  |
| Day 21 | 3.28(금) | 웹사이트 배포하기 - Vercel 배포, AWS EC2 배포, 도메인 등록 | 섹션 8 |  |

<br />
