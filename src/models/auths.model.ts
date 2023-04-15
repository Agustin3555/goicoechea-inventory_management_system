export namespace AuthModels {
  export interface LoginResponse {
    token: string
  }

  export interface LoginData {
    email: string
    password: string
  }

  export interface LoginBody {
    email: string
    password: string
  }
}
