import axios from 'axios'

const baseURL = 'http://localhost:3000'

export const publicInstance = axios.create({
  baseURL,
})

export const privateInstance = axios.create({
  baseURL: `${baseURL}/private`,
})
