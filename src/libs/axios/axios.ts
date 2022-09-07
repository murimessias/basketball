import axios from 'axios'
import { BASE_URL } from 'constants/urls'

const getAPIClient = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  )

  return instance
}

export { getAPIClient }
