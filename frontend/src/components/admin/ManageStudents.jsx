import { useState, useEffect } from 'react'
import axios from 'axios'
import StudentTable from '../StudentTable'
import AddStudentForm from '../AddStudentForm'
import EditStudentForm from '../EditStudentForm'

export default function ManageStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/students')
      setStudents(response.data)
    } catch (error) {
      console.error('Failed to load students', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSuccess = () => {
    loadStudents()
    setShowAddForm(false)
  }

  const handleEditSuccess = () => {
    loadStudents()
    setEditingStudent(null)
  }

  const handleDeleteSuccess = () => {
    loadStudents()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 font-heading">👥 Manage Students</h1>
        {!showAddForm && !editingStudent && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            ➕ Add New Student
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">Add New Student</h2>
          <AddStudentForm onSuccess={handleAddSuccess} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingStudent && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">Edit Student</h2>
          <EditStudentForm
            student={editingStudent}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditingStudent(null)}
          />
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      ) : (
        <StudentTable
          students={students}
          onEdit={(student) => {
            setEditingStudent(student)
            setShowAddForm(false)
          }}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}
