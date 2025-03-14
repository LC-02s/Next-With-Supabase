export const extractExtension = (name: string) => {
  const dividedName = name.split('.')
  const extension = dividedName[dividedName.length - 1]

  return extension
}
