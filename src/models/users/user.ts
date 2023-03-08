import { UserRole } from './userRole'

export interface User {
  id: number
  name: string
  lastName: string | null
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string | null
}
