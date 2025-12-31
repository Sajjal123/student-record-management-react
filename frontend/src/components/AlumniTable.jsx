import { useState } from 'react'
import axios from 'axios'

export default function AlumniTable({ alumni, onEdit, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(null)
  const [sortBy, setSortBy] = useState('name')

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete alumni record: ${name}?`)) {
      try {
        setIsDeleting(id)
        await axios.delete(`http://localhost:5000/api/alumni/${id}`)
        onDeleteSuccess()
      } catch (error) {
        alert('Failed to delete alumni')
      } finally {
        setIsDeleting(null)
      }
    }
  }

  if (alumni.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <p className="text-gray-500 text-lg">No alumni records found</p>
      </div>
    )
  }

  const sortedAlumni = [...alumni].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'year') return b.graduationYear - a.graduationYear
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Total Alumni: <span className="font-bold text-secondary-600">{alumni.length}</span></p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
        >
          <option value="name">Sort by Name</option>
          <option value="year">Sort by Graduation Year</option>
        </select>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-secondary-50 to-purple-50 border-b-2 border-secondary-200">
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-secondary-100 transition">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-secondary-100 transition">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-secondary-100 transition">Graduation Year</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-secondary-100 transition">Current Company</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 hover:bg-secondary-100 transition">Designation</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 hover:bg-secondary-100 transition">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAlumni.map((record, idx) => (
              <tr key={record.id} className={`border-b transition hover:bg-secondary-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-6 py-4 font-semibold text-gray-900">{record.name}</td>
                <td className="px-6 py-4 text-gray-700">{record.email}</td>
                <td className="px-6 py-4 text-gray-700">
                  <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {record.graduationYear}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{record.currentCompany}</td>
                <td className="px-6 py-4 text-gray-700">{record.designation}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onEdit(record)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition transform hover:scale-110"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(record.id, record.name)}
                    disabled={isDeleting === record.id}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition transform hover:scale-110 disabled:opacity-50"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedAlumni.map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-lg p-4 border border-secondary-200 hover:shadow-xl transition">
            <h3 className="font-bold text-lg text-gray-900">{record.name}</h3>
            <p className="text-xs text-gray-500 mb-3">Graduated: {record.graduationYear}</p>
            <div className="space-y-2 mb-4 text-sm border-t border-gray-100 pt-3">
              <p><span className="font-semibold">📧</span> {record.email}</p>
              <p><span className="font-semibold">🏢</span> {record.currentCompany}</p>
              <p><span className="font-semibold">💼</span> {record.designation}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(record)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">✏️ Edit</button>
              <button onClick={() => handleDelete(record.id, record.name)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition">🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
