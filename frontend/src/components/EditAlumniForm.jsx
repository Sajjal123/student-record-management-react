import { useState } from 'react'
import axios from 'axios'

export default function EditAlumniForm({ alumni, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: alumni.name,
    email: alumni.email,
    phone: alumni.phone,
    graduationYear: alumni.graduationYear,
    graduationGrade: alumni.graduationGrade,
    currentCompany: alumni.currentCompany,
    designation: alumni.designation,
    address: alumni.address
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await axios.put(`http://localhost:5000/api/alumni/${alumni.id}`, formData)
      onSuccess()
    } catch (err) {
      setError('Failed to update alumni')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">👤 Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition" required />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">📧 Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition" required />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">📱 Phone *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition" required />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">📅 Graduation Year *</label>
          <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition" required />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">🎓 Graduation Grade</label>
          <select name="graduationGrade" value={formData.graduationGrade} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition">
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">🏢 Current Company</label>
          <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition" />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">💼 Designation</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">📍 Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-gray-400 transition resize-none" />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 disabled:opacity-50">
          {isSubmitting ? '⏳ Updating...' : '✅ Update Alumni'}
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105">
          ❌ Cancel
        </button>
      </div>
    </form>
  )
}
