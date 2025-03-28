export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : '유효하지 않은 이메일이에요'

const passwordRegex = {
  lowerCase: {
    type: false,
    regex: /[a-z]+/,
    message: '비밀번호는 최소 1글자 이상의 소문자를 포함해야해요',
  },
  number: {
    type: false,
    regex: /\d{2,}/,
    message: '비밀번호는 최소 2글자 이상의 연속된 숫자를 포함해야해요',
  },
  symbol: {
    type: false,
    regex: /[!@#$%^&*]+/,
    message: '비밀번호는 최소 1글자 이상의 특수문자를 포함해야해요',
  },
  space: { type: true, regex: /\s+/, message: '비밀번호는 공백문자를 포함할 수 없어요' },
}

export const isValidPassword = (value: string) => {
  for (const { regex, type, message } of Object.values(passwordRegex)) {
    if (regex.test(value) === type) return message || null
  }

  return null
}
