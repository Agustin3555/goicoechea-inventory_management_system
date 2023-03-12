export const exclude = <T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> => {
  const clone = { ...object }

  for (const key of keys) delete clone[key]

  return clone
}
