import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getStudents = () => api.get('/students')
export const getStudentById = (id) => api.get(`/students/${id}`)
export const createStudent = (studentData) => api.post('/students', studentData)
export const updateStudent = (id, studentData) => api.put(`/students/${id}`, studentData)
export const deleteStudent = (id) => api.delete(`/students/${id}`)

export default api
