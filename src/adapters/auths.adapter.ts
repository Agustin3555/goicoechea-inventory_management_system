import { Auth_LoginBody, Auth_LoginData, Auth_LoginResponse } from '@/models'
import { InputAdapter, OutputAdapter } from '@/tools'

export const loginAdapter: {
  input: InputAdapter<Auth_LoginData, Auth_LoginBody>
  output: OutputAdapter<any, Auth_LoginResponse>
} = {
  input: data => {
    const convertedResource: Auth_LoginBody = {
      email: data.email,
      password: data.password,
    }

    return convertedResource
  },
  output: response => {
    const convertedResource: Auth_LoginResponse = {
      token: response.access_token,
    }

    return convertedResource
  },
}
