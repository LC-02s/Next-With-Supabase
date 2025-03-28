export const isValidDisplayId = (value: string) => {
  if (value.length > 20) {
    return '아이디는 20글자 이하로 입력해주세요'
  }

  if (/[^\w\\-]/.test(value)) {
    return '사용할 수 없는 문자가 포함되어있어요'
  }

  return null
}

export const isValidName = (value: string) => {
  if (value.length < 2) {
    return '이름은 2글자 이상이어야 해요'
  }

  if (value.length > 20) {
    return '이름은 20글자 이하로 입력해주세요'
  }

  if (!/^[a-zA-Z가-힣\s]+$/.test(value)) {
    return '사용할 수 없는 문자가 포함되어있어요'
  }

  return null
}

export const isValidProfileImage = (value: File | null | undefined) => {
  if (!value) {
    return '파일을 읽어올 수 없어요'
  }

  if (!value.type.startsWith('image/')) {
    return '이미지 파일만 업로드 가능해요'
  }

  if (value.size > 1024 * 1024 * 3) {
    return '파일 크기는 3MB 이하로 설정해주세요'
  }

  return value
}
