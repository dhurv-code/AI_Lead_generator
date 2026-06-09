import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 120000,
})

export const analyzeWebsite = async (url) => {
  return api.post('/analyze', { url })
}

export const fetchReports = async () => {
  return api.get('/reports')
}

export default api
