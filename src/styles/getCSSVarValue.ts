export const getCSSVarValue = (varName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName)
