export const getDeepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T
