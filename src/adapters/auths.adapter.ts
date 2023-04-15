import { AuthModels } from '@/models'
import { InputAdapter, OutputAdapter } from '@/tools'

export namespace AuthAdapters {
  export const login: {
    input: InputAdapter<AuthModels.LoginData, AuthModels.LoginBody>
    output: OutputAdapter<any, AuthModels.LoginResponse>
  } = {
    input: data => {
      const convertedResource: AuthModels.LoginBody = {
        email: data.email,
        password: data.password,
      }

      return convertedResource
    },
    output: response => {
      const convertedResource: AuthModels.LoginResponse = {
        token: response.access_token,
      }

      return convertedResource
    },
  }
}
