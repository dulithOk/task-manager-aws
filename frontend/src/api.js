import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

export const fetchTasks = async () => {
  const response = await api.get('/tasks/')
  return response.data
}

export const createTask = async (formData) => {
  const response = await api.post('/tasks/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const updateTask = async (id, formData) => {
  const response = await api.put(`/tasks/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}/`)
}
