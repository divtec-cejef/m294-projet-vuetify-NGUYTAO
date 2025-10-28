import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL,
  timeout: 10_000,
})

export default api
