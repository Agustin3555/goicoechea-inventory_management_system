export const asAppDate = (value: string | null) => {
  if (!value) return null

  const date = new Date(value)

  return `${date.toLocaleDateString()} • ${date.toLocaleTimeString()}`
}
