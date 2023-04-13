import axios, { CreateAxiosDefaults } from 'axios'

const propsInCommon: CreateAxiosDefaults = {
  baseURL: 'http://localhost:3000',
}

export const privateInstance = axios.create({
  ...propsInCommon,
})

export const publicInstance = axios.create({
  ...propsInCommon,
})
