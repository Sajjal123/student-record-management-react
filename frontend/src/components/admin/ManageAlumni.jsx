import { useState, useEffect } from 'react'
import axios from 'axios'
import AlumniTable from '../AlumniTable'
import AddAlumniForm from '../AddAlumniForm'
import EditAlumniForm from '../EditAlumniForm'

export default function ManageAlumni() {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAlumni, setEditingAlumni] = useState(null)

  useEffect(() => {
    loadAlumni()
  }, [])

  const loadAlumni = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/alumni')
      setAlumni(response.data)
    } catch (error) {
      console.error('Failed to load alumni', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSuccess = () => {
    loadAlumni()
    setShowAddForm(false)
  }

  const handleEditSuccess = () => {
    loadAlumni()
    setEditingAlumni(null)
  }

  const handleDeleteSuccess = () => {
    loadAlumni()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 font-heading">🎓 Alumni Records</h1>
        {!showAddForm && !editingAlumni && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            ➕ Add Alumni
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">Add Alumni Record</h2>
          <AddAlumniForm onSuccess={handleAddSuccess} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingAlumni && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">Edit Alumni Record</h2>
          <EditAlumniForm
            alumni={editingAlumni}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditingAlumni(null)}
          />
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-secondary-200 border-t-secondary-600"></div>
          <p className="mt-4 text-gray-600">Loading alumni records...</p>
        </div>
      ) : (
        <AlumniTable
          alumni={alumni}
          onEdit={(alumni) => {
            setEditingAlumni(alumni)
            setShowAddForm(false)
          }}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}
