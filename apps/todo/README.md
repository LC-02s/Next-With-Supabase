# Next With Supabase: Todo List

인프런에서 진행하는 [워밍업 클럽 3기 - 풀스택(Next.js + Supabase) 스터디](https://www.inflearn.com/course/offline/warmup-club-3-fs)의 1주차 미션, Next.js 와 Supabse의 Database 기능을 기반으로 제작된 Todo List 앱입니다. 작성한 발자국은 [여기](https://www.inflearn.com/blogs/9576)에서 보실 수 있습니다.

<br />

## 🖥️ 실행 화면

<table>
   <thead>
      <tr>
         <th>할 일 생성</th>
         <th>할 일 수정</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <video src="https://github.com/user-attachments/assets/2cd483e5-a52a-4214-9078-d17b588aa8c6" />
         </td>
         <td>
            <video src="https://github.com/user-attachments/assets/859ebf5a-1248-4598-9451-ac793248e555" />
         </td>
      </tr>
   </tbody>
</table>

<br />

<table>
   <thead>
      <tr>
         <th>할 일 검색</th>
         <th>할 일 삭제</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <video src="https://github.com/user-attachments/assets/608ff435-c8e8-4a95-8dde-aea4801dd826" />
         </td>
         <td>
            <video src="https://github.com/user-attachments/assets/4291bd68-a1c0-4275-887e-c52844b06dd7" />
         </td>
      </tr>
   </tbody>
</table>

<br />

## 📋 기능 명세

해당 프로젝트는 아래의 기능 명세를 기반으로 제작되었습니다.

<br />

1. 할 일 목록 조회 기능
   - 키워드 검색 기능
2. 할 일 생성 기능
3. 할 일 수정 기능
   - 내용 변경 기능
   - 완료 여부 변경 기능
4. 할 일 삭제 기능

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

`Server Actions` 특성상 Next.js에서 확장하여 제공하는 `fetch` 의 `revalidate` 관련 기능을 사용하지 못하기 때문에, 조회 로직에서는 `Tanstack Query` 의 `prefetchQuery` 와 `HydrationBoundary` 를 활용하여 `SSR` 및 `Server Component` 환경을 통합하였습니다. 또한 데이터 수정 및 삭제 로직에는 UX를 고려하여 낙관적 업데이트를 구현 후 적용하였으며, `Tanstack Query` 가 사용된 모든 로직에는 Query Key Factor 방식을 사용하여 효율적으로 관리할 수 있었습니다.

<br />

### Table Schema

```sql
CREATE TABLE todo (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ
);
```

<br />

## ✨ 컨벤션 가이드

<br />

### Query Key Factor

`Tanstack Query` 관련 로직은 `Query Key Factor` 방식을 사용하여 작성하였습니다. [(참조)](/apps/todo/src/entities/api/query-keys.ts)

<br />

### FSD 아키텍처

해당 프로젝트는 FSD 아키텍처를 기반으로 설계되었지만, 사용되는 도메인이 하나뿐인 해당 프로젝트의 특성을 고려하여 `slice` 레이어는 사용하지 않고 `segment` 로만 구성하였습니다.

<br />

### 예외 처리

모든 예외 처리 로직은 [공용 예외 처리 클래스](/apps/todo/src/shared/api/exception.ts)를 기반하여 작성되었습니다. 해당 클래스를 통하여 예외를 판단합니다.

<br />

## 💼 실행 가이드

<br />

### 요구 환경

- Node.js @^20
- pnpm @9.1.0

<br />

### 환경 변수

- `SUPABASE_URL`: supabse 서버의 Project URL을 입력해주세요.
- `SUPABASE_ANON_KEY`: supabse 서버의 Anon Public API Key를 입력해주세요.
- `SUPABASE_SERVICE_ROLE`: supabse 서버의 Secret Service Role을 입력해주세요.
- `NEXT_PUBLIC_DOMAIN_ADDRESS_PREFIX`: 추가 시 배포 환경에서 필요한 prefix를 지정할 수 있어요. (필수 X)

<br />

### 의존성 설치

```base
pnpm install
```

<br />

### Supabase Table Schema 인터페이스 생성

```bash
pnpm gen-type:todo [projectId] # supabase 프로젝트 아이디를 함께 입력해주세요
```

<br />

### 개발 환경

```base
pnpm dev:todo
```

<br />

### 빌드

```base
pnpm build:todo
```

<br />
