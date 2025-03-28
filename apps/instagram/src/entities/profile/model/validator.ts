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
