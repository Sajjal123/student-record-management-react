import express from 'express'
import cors from 'cors'
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllAlumni,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni,
  authenticateUser
} from './db.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes

// Get all students
app.get('/api/students', (req, res) => {
  try {
    const students = getAllStudents()
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' })
  }
})

// Get single student
app.get('/api/students/:id', (req, res) => {
  try {
    const student = getStudentById(req.params.id)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' })
  }
})

// Create student
app.post('/api/students', (req, res) => {
  try {
    const { name, email, phone, grade, dob, address } = req.body

    // Validation
    if (!name || !email || !phone || !dob) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const newStudent = createStudent({
      name,
      email,
      phone,
      grade: grade || '10',
      dob,
      address: address || ''
    })

    res.status(201).json(newStudent)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' })
  }
})

// Update student
app.put('/api/students/:id', (req, res) => {
  try {
    const { name, email, phone, grade, dob, address } = req.body

    // Validation
    if (!name || !email || !phone || !dob) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const updatedStudent = updateStudent(req.params.id, {
      name,
      email,
      phone,
      grade: grade || '10',
      dob,
      address: address || ''
    })

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }

    res.json(updatedStudent)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' })
  }
})

// Delete student
app.delete('/api/students/:id', (req, res) => {
  try {
    const success = deleteStudent(req.params.id)

    if (!success) {
      return res.status(404).json({ error: 'Student not found' })
    }

    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' })
  }
})

// ============ ALUMNI ROUTES ============

// Get all alumni
app.get('/api/alumni', (req, res) => {
  try {
    const alumni = getAllAlumni()
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni' })
  }
})

// Get single alumni
app.get('/api/alumni/:id', (req, res) => {
  try {
    const alumni = getAlumniById(req.params.id)
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni not found' })
    }
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni' })
  }
})

// Create alumni
app.post('/api/alumni', (req, res) => {
  try {
    const { name, email, phone, graduationYear, graduationGrade, currentCompany, designation, address } = req.body

    if (!name || !email || !phone || !graduationYear) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const newAlumni = createAlumni({
      name,
      email,
      phone,
      graduationYear,
      graduationGrade: graduationGrade || '12',
      currentCompany: currentCompany || '',
      designation: designation || '',
      address: address || '',
      registrationDate: new Date().toISOString().split('T')[0]
    })

    res.status(201).json(newAlumni)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create alumni' })
  }
})

// Update alumni
app.put('/api/alumni/:id', (req, res) => {
  try {
    const { name, email, phone, graduationYear, graduationGrade, currentCompany, designation, address } = req.body

    if (!name || !email || !phone || !graduationYear) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const updatedAlumni = updateAlumni(req.params.id, {
      name,
      email,
      phone,
      graduationYear,
      graduationGrade: graduationGrade || '12',
      currentCompany: currentCompany || '',
      designation: designation || '',
      address: address || ''
    })

    if (!updatedAlumni) {
      return res.status(404).json({ error: 'Alumni not found' })
    }

    res.json(updatedAlumni)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update alumni' })
  }
})

// Delete alumni
app.delete('/api/alumni/:id', (req, res) => {
  try {
    const success = deleteAlumni(req.params.id)

    if (!success) {
      return res.status(404).json({ error: 'Alumni not found' })
    }

    res.json({ message: 'Alumni deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete alumni' })
  }
})

// ============ AUTH ROUTES ============

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' })
    }

    const user = authenticateUser(username, password)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    res.json({ 
      success: true,
      user: user
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
