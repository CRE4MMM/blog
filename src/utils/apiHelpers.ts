import axios from 'axios'

export const BASE_URL_API = 'https://happysweater-us.backendless.app/api/data'

export const apiCall = axios.create({
  baseURL: BASE_URL_API,
})
