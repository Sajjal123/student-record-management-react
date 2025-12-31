import { useState } from 'react'
import { deleteStudent } from '../api'

export default function StudentTable({ students, onEdit, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(null)
  const [sortBy, setSortBy] = useState('name')

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        setIsDeleting(id)
        await deleteStudent(id)
        onDeleteSuccess()
      } catch (error) {
        alert('Failed to delete student')
        console.error(error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'email') return a.email.localeCompare(b.email)
    if (sortBy === 'grade') return parseInt(a.grade) - parseInt(b.grade)
    return 0
  })

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-500 text-lg font-medium">No students found</p>
        <p className="text-gray-400 text-sm mt-2">Click "Add New Student" to create your first record</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Table Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-heading">
            📋 Student Records
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Total Students: <span className="font-semibold text-primary-600">{students.length}</span>
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium text-sm">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="grade">Grade</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b-2 border-primary-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-primary-100 transition cursor-pointer">Student Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-primary-100 transition cursor-pointer">📧 Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-primary-100 transition cursor-pointer">📱 Phone</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-primary-100 transition cursor-pointer">🎓 Grade</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-primary-100 transition cursor-pointer">📅 DOB</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-primary-100 transition cursor-pointer">📍 Address</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 hover:bg-primary-100 transition cursor-pointer">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`border-b transition hover:bg-primary-100 transform hover:scale-y-105 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm hover:text-primary-700 transition">
                    <div className="font-semibold text-gray-900">{student.name}</div>
                    <div className="text-gray-500 text-xs">ID: {student.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 hover:text-primary-600 transition">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 hover:text-primary-600 transition">
                    <a href={`tel:${student.phone}`} className="hover:underline transition">
                      {student.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold transform hover:scale-110 transition-transform cursor-pointer">
                      Grade {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 hover:text-primary-600 transition">{student.dob}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 truncate hover:text-primary-600 transition" title={student.address}>
                    {student.address}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(student)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition transform hover:scale-125 active:scale-95"
                        title="Edit student"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(student.id, student.name)}
                        disabled={isDeleting === student.id}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition transform hover:scale-125 active:scale-95 disabled:opacity-50"
                        title="Delete student"
                      >
                        {isDeleting === student.id ? '⏳' : '🗑️'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{student.name}</h3>
                <p className="text-xs text-gray-500">ID: {student.id}</p>
              </div>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                Grade {student.grade}
              </span>
            </div>

            <div className="space-y-2 mb-4 text-sm border-t border-gray-100 pt-3">
              <p className="text-gray-700">
                <span className="font-semibold">📧 Email:</span> {student.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📱 Phone:</span>
                <a href={`tel:${student.phone}`} className="ml-1 hover:text-primary-600 transition">
                  {student.phone}
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📅 DOB:</span> {student.dob}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📍 Address:</span> {student.address}
              </p>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => onEdit(student)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(student.id, student.name)}
                disabled={isDeleting === student.id}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {isDeleting === student.id ? '⏳' : '🗑️ Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
