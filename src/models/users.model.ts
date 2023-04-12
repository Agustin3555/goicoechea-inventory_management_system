export enum USER_ROLE {
  admin = 'ADMIN',
  employee = 'EMPLOYEE',
}

export interface User_MinData {
  id: number
  name: string
}

export interface User_RemainingData {
  lastName: string | null
  email: string
  role: USER_ROLE
  createdAt: string
  updatedAt: string | null
}

export interface User_FullData extends User_MinData, User_RemainingData {}

export interface User_NewData {
  name: string
  lastName?: string
  email: string
  role: USER_ROLE
}

export interface User_NewBody {
  name: string
  lastName?: string
  email: string
  role: USER_ROLE
}

export interface User_UpdateData {
  name?: string
  lastName?: string
  email?: string
  role?: USER_ROLE
}

export interface User_UpdateBody {
  name?: string
  lastName?: string
  email?: string
  role?: USER_ROLE
}

export interface User_UpdateResponse {
  name?: string
  lastName?: string
  email?: string
  role?: USER_ROLE
  updatedAt: string
}
