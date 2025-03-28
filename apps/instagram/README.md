# Next With Supabase: Instagram Clone

인프런에서 진행하는 [워밍업 클럽 3기 - 풀스택(Next.js + Supabase) 스터디](https://www.inflearn.com/course/offline/warmup-club-3-fs)의 4주차 미션, Next.js 와 Supabse의 Auth 및 Realtime Database 기능을 기반으로 제작된 Instagram Clone 앱입니다. 작성한 발자국은 [여기](https://www.inflearn.com/blogs/)에서 보실 수 있습니다.

<br />

## 🖥️ 실행 화면

<br />
<br />

## 📋 기능 명세

해당 프로젝트는 아래의 기능 명세를 기반으로 제작되었습니다.

<br />

1. 로그인 기능
   - 이메일 기반 로그인
     - Confirmation URL 방식
   - 카카오 간편 로그인
   - 프로필 설정
     - 아이디 설정 기능
     - 이름 설정 기능
     - 프로필 이미지 설정 기능
2. 팔로잉 기능
   - 유저 탐색 기능
   - 유저 차단 기능
3. 채팅 기능
   - 메시지 삭제 기능
   - 메시지 읽음 상태 확인 기능
   - 메시지 신고 기능

<br />

## 📚 사용 기술

- 프레임워크: `Next.js v15`, `React v19`
- 데이터베이스: `Supabase`
- 서버 상태관리: `Tanstack Query v5`
- 클라이언트 상태관리: `Zustand v5`
- 스타일 프레임워크: `TailWindCSS v3`, `Mantine v7`, `Tabler Icons`
- 모노레포: `Turbo Repo`
- 패키지 매니저: `pnpm`

<br />

## 🎨 구현 상세

<br />

### Next.js + Supabase

Next.js의 `Server Actions` 와 Supabase의 `createServerClient` 를 통합한 환경에서 모든 API 로직을 작성하였습니다. 작성된 모든 API는 별도의 `Route Handler` 를 거치지 않아 특정한 엔드포인트를 관리하지 않으며, 추가적인 Validation 과정 없이 TypeScript 기반의 인터페이스를 사용할 수 있습니다.

<br />

### Next.js + Tanstack Query

Next.js의 `Server Actions`과 함께 대상 데이터 수정 및 삭제 로직에는 UX를 고려하여 낙관적 업데이트를 구현 후 적용하였으며, `Tanstack Query` 가 사용된 모든 로직에는 Query Key Factor 방식을 사용하여 효율적으로 관리할 수 있었습니다.

<br />

### Cursor Based Pagination

커서 기반 페이지네이션은 옵셋 기반 페이지네이션에서 발생할 수 있는 데이터 추가 또는 삭제 시 페이지 별 인덱스가 꼬여 다른 페이지에 같은 데이터가 존재하거나 특정 데이터를 건너뛰는 문제가 없기에 무한스크롤 기능에 조금 더 적합하다고 판단하여 커서 기반 페이지네이션을 적용하였습니다.

<br />

### Table Schema

```sql

```

<br />

## ✨ 컨벤션 가이드

<br />

### Query Key Factor

`Tanstack Query` 관련 로직은 `Query Key Factor` 방식을 사용하여 작성하였습니다.

<br />

### FSD 아키텍처

해당 프로젝트는 FSD 아키텍처를 기반으로 설계되었습니다.

(폴더 구조 및 도메인 적어놓기)

<br />

### 예외 처리

모든 예외 처리 로직은 [공용 예외 처리 클래스](/apps/netflix/src/shared/api/exception.ts)를 기반하여 작성되었습니다. 해당 클래스를 통하여 예외를 판단합니다.

<br />

## 💼 실행 가이드

<br />

### 요구 환경

- Node.js @^20
- pnpm @9.1.0

<br />

### 환경 변수

- `NEXT_PUBLIC_SUPABASE_URL`: supabse 서버의 Project URL을 입력해주세요.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: supabse 서버의 Anon Public API Key를 입력해주세요.
- `SUPABASE_SERVICE_ROLE`: supabse 서버의 Secret Service Role을 입력해주세요.
- `SUPABASE_BUCKET_NAME`: supabse 서버의 Bucket 이름을 입력해주세요.
- `NEXT_PUBLIC_DOMAIN_ADDRESS_PREFIX`: 추가 시 배포 환경에서 필요한 prefix를 지정할 수 있어요. (필수 X)

<br />

### 의존성 설치

```base
pnpm install
```

<br />

### Supabase Table Schema 인터페이스 생성

```bash
pnpm gen-type:instagram [projectId] # supabase 프로젝트 아이디를 함께 입력해주세요
```

<br />

### 개발 환경

```base
pnpm dev:instagram
```

<br />

### 빌드

```base
pnpm build:instagram
```

<br />
