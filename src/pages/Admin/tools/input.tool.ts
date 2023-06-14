export interface Validation {
  validation: (value: undefined | number | string) => boolean
  errorMsg: string
  break?: boolean
}
