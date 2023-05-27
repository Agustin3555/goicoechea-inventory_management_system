export interface Validation {
  validation: (value: number | string) => boolean
  errorMsg: string
  break?: boolean
}
