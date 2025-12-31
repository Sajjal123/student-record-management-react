import { useState } from 'react'
import { deleteStudent } from '../api'

export default function StudentCard({ student, onEdit, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        setIsDeleting(true)
        await deleteStudent(student.id)
        onDeleteSuccess()
      } catch (error) {
        alert('Failed to delete student')
        console.error(error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
          <p className="text-sm text-gray-500">ID: {student.id}</p>
        </div>
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          Grade {student.grade}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-gray-700">
        <p><span className="font-semibold">Email:</span> {student.email}</p>
        <p><span className="font-semibold">Phone:</span> {student.phone}</p>
        <p><span className="font-semibold">DOB:</span> {student.dob}</p>
        <p><span className="font-semibold">Address:</span> {student.address}</p>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(student)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  )
}
