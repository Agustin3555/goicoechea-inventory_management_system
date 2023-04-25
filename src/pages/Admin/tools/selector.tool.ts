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
