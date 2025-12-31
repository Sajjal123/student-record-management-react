import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.username || !formData.password) {
      setError('Please enter username and password')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: formData.username,
        password: formData.password
      })

      if (response.data.success) {
        login(response.data.user)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 to-secondary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-bold text-white font-heading">StudentsHub</h1>
            <p className="text-primary-100 mt-2">Management System</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg transform hover:scale-105 transition-transform">
                <p className="text-red-700 font-medium">⚠️ {error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">👤 Username</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition hover:border-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">🔐 Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition hover:border-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600 hover:text-primary-600 transition"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Logging in...' : '✅ Login'}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 text-sm font-medium mb-4">📝 Demo Credentials</p>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                  <p className="text-xs font-semibold text-blue-900">Admin</p>
                  <p className="text-xs text-blue-700">Username: <span className="font-mono">admin</span></p>
                  <p className="text-xs text-blue-700">Password: <span className="font-mono">admin@123</span></p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition cursor-pointer">
                  <p className="text-xs font-semibold text-purple-900">Student</p>
                  <p className="text-xs text-purple-700">Username: <span className="font-mono">john.doe</span></p>
                  <p className="text-xs text-purple-700">Password: <span className="font-mono">student@123</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-600 border-t border-gray-200">
            <p>🔒 Secure Login • All data encrypted</p>
          </div>
        </div>
      </div>
    </div>
  )
}
