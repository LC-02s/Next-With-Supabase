# Next With Supabase: Dropbox

인프런에서 진행하는 [워밍업 클럽 3기 - 풀스택(Next.js + Supabase) 스터디](https://www.inflearn.com/course/offline/warmup-club-3-fs)의 2주차 미션, Next.js 와 Supabse의 Storage 기능을 기반으로 제작된 Dropbox 클론 프로젝트입니다. 작성한 발자국은 [여기](https://www.inflearn.com/blogs/9844)에서 보실 수 있습니다.

<br />

## 🖥️ 실행 화면

<table>
   <thead>
      <tr>
         <th>이미지 업로드</th>
         <th>이미지 검색</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <video src="https://github.com/user-attachments/assets/b4c7e565-49bd-4e2a-8f3b-66cb46d1c934" />
         </td>
         <td>
            <video src="https://github.com/user-attachments/assets/6a0e6b39-2bc0-4417-ace5-01e7cfe6938c" />
         </td>
      </tr>
   </tbody>
</table>

<br />

<table>
   <thead>
      <tr>
         <th>이미지 다운로드</th>
         <th>이미지 이름 변경</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <video src="https://github.com/user-attachments/assets/74d6d09f-66a7-4786-af8e-91d9739c8619" />
         </td>
         <td>
            <video src="https://github.com/user-attachments/assets/245e7f42-ed3e-4f6f-afd8-228e4d75ce46" />
         </td>
      </tr>
   </tbody>
</table>

<br />

<table>
   <thead>
      <tr>
         <th>이미지 삭제</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <video src="https://github.com/user-attachments/assets/09fb3840-5840-4353-9e59-3f71d4af245c" />
         </td>
      </tr>
   </tbody>
</table>

<br />

## 📋 기능 명세

해당 프로젝트는 아래의 기능 명세를 기반으로 제작되었습니다.

<br />

1. 이미지 파일 업로드 기능
   - 드래그 앤 드롭 기능
   - 다중 업로드 기능
2. 업로드한 이미지 파일 조회 기능
   - 키워드 검색 기능
   - 이미지 파일 다운로드 기능
3. 업로드한 이미지 파일 수정 기능
   - 이미지 파일명 변경 기능
4. 업로드한 이미지 파일 삭제 기능

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
CREATE TABLE minibox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

<br />

## 🚨 트러블 슈팅

<br />

### 파일명에 한글이 포함될 경우 Supabase Storage에 업로드하지 못하는 문제

이미지 파일 이름에 한글이 포함될 경우 업로드가 되지 않는 문제가 있었습니다. 이슈를 찾아보니 Supabase Storage의 정책적인 문제였고, AWS의 S3 서비스도 동일한 문제를 가지고 있었기에 아래 조치들을 취하였습니다.

<br />

**조치 1.**

처음 취했던 조치는 아래와 같이 `nanoid` 라이브러리를 활용하여 중복되지 않는 이름을 생성 후 기존의 파일 이름을 대체하는 방식을 사용했었습니다. 하지만 해당 방식을 사용하면 기존의 파일 이름이 사용자가 식별하지 못하는 값으로 대체되는 문제와, 중복되는 파일을 확인할 수 있는 방법이 없어지는 문제가 있어 최종적으로는 사용하지 않았습니다.

```ts
'use server'

import { nanoId } from 'nanoid'

export const uploadImages = async ({
  files,
}: UploadImagesParams): Promise<{ data: { id: string; path: string } | null }[]> => {
  const client = await createServerSupabaseClient()

  return await Promise.all(
    files.map((file) => {
      const extension = extractExtension(file.name)
      const path = `/${nanoId()}.${extension}`

      return client.storage
        .from(process.env.SUPABASE_BUCKET_NAME!)
        .upload(path, file, { upsert: true })
    }),
  )
}
```

<br />

**조치 2.**

두 번째로 취한 조치는 조금 번거롭긴 하지만 파일과 1 대 1 로 대응되는 데이터베이스 테이블을 만들어서 관리하는 방식을 사용하였습니다. Supabase에서 지원하는 `uuid`를 활용하여 테이블의 Primary Key를 설정해 주었고, 이미지 업로드 시 먼저 테이블에 기존 파일 이름을 기반한 데이터 insert 후 생성된 `uuid`를 사용하여 파일명을 재설정하는 방식으로 우회하였습니다. Supabase에서 지원하는 `uuid`를 사용했기에 `nanoid` 같은 별도의 식별자 생성 라이브러리를 관리하지 않을 수 있었습니다.

```ts
export const uploadImages = async ({
  files,
}: UploadImagesParams): Promise<{ data: { id: string; path: string } | null }[]> => {
  const client = await createServerSupabaseClient()

  const databaseQueries = files.flatMap((file) => {
    return client
      .from('minibox')
      .upsert({ name: file.name })
      .select()
      .then((result) => result.data?.[0] ?? null)
  })
  const targetFiles = await Promise.all(databaseQueries)

  const storageQueries = targetFiles.map((data) => {
    if (!data) {
      return { data: null }
    }

    const extension = extractExtension(data.name)
    const path = `/${data.id}.${extension}`
    const file = files.find((file) => file.name === data.name)!

    return client.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .upload(path, file, { upsert: false })
  })

  return await Promise.all(storageQueries)
}
```

<br />

### 업로드한 파일명이 한글일 경우 올바르게 검색 되지 않는 문제 (feat. MacOS)

MacOS 환경에서 업로드한 파일을 별도의 후처리 없이 그대로 데이터베이스에 업로드 했더니 한글이 포함된 파일명에 대해서 아래와 같이 문자열 포함 여부를 판단하는 `ilike` 쿼리가 제대로 동작하지 않는 문제가 있었습니다.

```ts
export const getImages = async ({ query = '' }: GetImagesParams): Promise<DroppedImageFile[]> => {
  const client = await createServerSupabaseClient()
  const imagesDataAll = await client.from('minibox').select('*').ilike('name', `%${query}}%`)
}
```

<br />

원인을 분석해보니 아래와 같이 파일 이름에 한글이 포함되어 있을 시 자음과 모음이 모두 분리된 상태로 저장되어 있어 특정 키워드 포함 여부를 올바르게 판단하지 못해 발생한 문제였습니다.

```ts
// input
'temp-훈이머리귤.jpeg'.split('')
```

<table>
   <thead>
      <tr>
         <th>정상적인 경우</th>
         <th>문제 상황</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <img width="270" alt="output - 정상적인 경우" src="https://github.com/user-attachments/assets/ff2df81b-8d7b-4348-805d-de53ef128d83" />
         </td>
         <td>
            <img width="330" alt="output - 문제 상황" src="https://github.com/user-attachments/assets/5d5623a5-9e52-4fe9-8422-21b37c09793d" />
         </td>
      </tr>
   </tbody>
</table>

<br />

**조치**

기존에 사용하던 `ilike` 쿼리를 제거하고, 자바스크립트에서 지원하는 `String.prototype.normalize` 메서드를 사용하여 기존 데이터에 대한 정규형 정준 결합(Normalization Form Canonical Composition) 절차를 거친 후 필터링을 거치는 방법으로 해결하였습니다.

```ts
export const getImages = async ({ query = '' }: GetImagesParams): Promise<DroppedImageFile[]> => {
  const client = await createServerSupabaseClient()
  const imagesDataAll = await client.from('minibox').select('*')
  const targetData = imagesDataAll.data
    .filter(({ name }) => name.normalize('NFC').includes(query))
    .map(({ id, name }) => `${id}.${extractExtension(name)}`)
}
```

<br />

## ✨ 컨벤션 가이드

<br />

### Query Key Factor

`Tanstack Query` 관련 로직은 `Query Key Factor` 방식을 사용하여 작성하였습니다. [(참조)](/apps/dropbox/src/entities/api/query-keys.ts)

<br />

### FSD 아키텍처

해당 프로젝트는 FSD 아키텍처를 기반으로 설계되었지만, 사용되는 도메인이 하나뿐인 해당 프로젝트의 특성을 고려하여 `slice` 레이어는 사용하지 않고 `segment` 로만 구성하였습니다.

<br />

### 예외 처리

모든 예외 처리 로직은 [공용 예외 처리 클래스](/apps/dropbox/src/shared/api/exception.ts)를 기반하여 작성되었습니다. 해당 클래스를 통하여 예외를 판단합니다.

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
pnpm gen-type:dropbox [projectId] # supabase 프로젝트 아이디를 함께 입력해주세요
```

<br />

### 개발 환경

```base
pnpm dev:dropbox
```

<br />

### 빌드

```base
pnpm build:dropbox
```

<br />
