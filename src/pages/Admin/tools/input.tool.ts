export interface Validation {
  validation: (value: any) => boolean
  errorMsg: string
  break?: boolean
}
