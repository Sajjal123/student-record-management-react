import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, 'data')
const studentsFile = path.join(dataDir, 'students.json')
const alumniFile = path.join(dataDir, 'alumni.json')
const usersFile = path.join(dataDir, 'users.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize students.json if it doesn't exist
if (!fs.existsSync(studentsFile)) {
  const initialData = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0101',
      grade: '10',
      dob: '2008-05-15',
      address: '123 Main St, City'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-0102',
      grade: '11',
      dob: '2007-03-22',
      address: '456 Oak Ave, Town'
    }
  ]
  fs.writeFileSync(studentsFile, JSON.stringify(initialData, null, 2))
}

// ============ UTILITY FUNCTIONS ============
const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return []
  }
}

const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    return false
  }
}

// ============ STUDENT FUNCTIONS ============
export const readStudents = () => readFile(studentsFile)
export const writeStudents = (students) => writeFile(studentsFile, students)

// Get all students
export const getAllStudents = () => {
  return readStudents()
}

// Get student by ID
export const getStudentById = (id) => {
  const students = readStudents()
  return students.find(s => s.id === id)
}

// Create student
export const createStudent = (studentData) => {
  const students = readStudents()
  const newStudent = {
    id: Date.now().toString(),
    ...studentData
  }
  students.push(newStudent)
  writeStudents(students)
  return newStudent
}

// Update student
export const updateStudent = (id, studentData) => {
  const students = readStudents()
  const index = students.findIndex(s => s.id === id)
  if (index === -1) return null
  
  students[index] = { id, ...studentData }
  writeStudents(students)
  return students[index]
}

// Delete student
export const deleteStudent = (id) => {
  const students = readStudents()
  const filtered = students.filter(s => s.id !== id)
  if (filtered.length === students.length) return false
  
  writeStudents(filtered)
  return true
}

// ============ ALUMNI FUNCTIONS ============
export const getAllAlumni = () => readFile(alumniFile)

export const getAlumniById = (id) => {
  const alumni = getAllAlumni()
  return alumni.find(a => a.id === id)
}

export const createAlumni = (alumniData) => {
  const alumni = getAllAlumni()
  const newAlumni = {
    id: `alumni-${Date.now()}`,
    ...alumniData
  }
  alumni.push(newAlumni)
  writeFile(alumniFile, alumni)
  return newAlumni
}

export const updateAlumni = (id, alumniData) => {
  const alumni = getAllAlumni()
  const index = alumni.findIndex(a => a.id === id)
  if (index === -1) return null
  
  alumni[index] = { id, ...alumniData }
  writeFile(alumniFile, alumni)
  return alumni[index]
}

export const deleteAlumni = (id) => {
  const alumni = getAllAlumni()
  const filtered = alumni.filter(a => a.id !== id)
  if (filtered.length === alumni.length) return false
  
  writeFile(alumniFile, filtered)
  return true
}

// ============ USER/AUTH FUNCTIONS ============
export const getAllUsers = () => readFile(usersFile)

export const getUserByUsername = (username) => {
  const users = getAllUsers()
  return users.find(u => u.username === username)
}

export const authenticateUser = (username, password) => {
  const user = getUserByUsername(username)
  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export const createUser = (userData) => {
  const users = getAllUsers()
  const newUser = {
    id: `user-${Date.now()}`,
    ...userData
  }
  users.push(newUser)
  writeFile(usersFile, users)
  return newUser
}

export const updateUser = (id, userData) => {
  const users = getAllUsers()
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return null
  
  users[index] = { ...users[index], ...userData }
  writeFile(usersFile, users)
  return users[index]
}
