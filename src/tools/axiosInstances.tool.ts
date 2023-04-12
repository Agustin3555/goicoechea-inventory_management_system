import axios from 'axios'

const baseURL = 'http://localhost:3000'

export const privateInstance = axios.create({ baseURL })
export const publicInstance = axios.create({ baseURL })
