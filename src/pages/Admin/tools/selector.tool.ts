import { Validation } from './input.tool'

export interface Option {
  id: string
  title: string
}

export enum STATUS {
  loading,
  error,
  ready,
}

export const BLANK_SELECTION = {
  id: 'blank',
  title: '~',
}

export const requiredValidation: Validation = {
  validation: (value: string) => value === '',
  errorMsg: 'Campo obligatorio',
  break: true,
}
