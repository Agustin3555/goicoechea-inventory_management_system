export namespace UserModels {
  export enum ROLE {
    admin = 'ADMIN',
    employee = 'EMPLOYEE',
  }

  export interface MinData {
    id: number
    name: string
  }

  export interface RemainingData {
    lastName: string | null
    email: string
    role: ROLE
    createdAt: string
    updatedAt: string | null
  }

  export interface FullData extends MinData, RemainingData {}

  export interface CreateData {
    name: string
    lastName?: string
    email: string
    role: ROLE
  }

  export interface CreateBody {
    name: string
    lastName?: string
    email: string
    role: ROLE
  }

  export interface UpdateData {
    name?: string
    lastName?: string
    email?: string
    role?: ROLE
  }

  export interface UpdateBody {
    name?: string
    lastName?: string
    email?: string
    role?: ROLE
  }

  export interface UpdateResponse {
    name?: string
    lastName?: string
    email?: string
    role?: ROLE
    updatedAt: string
  }
}
