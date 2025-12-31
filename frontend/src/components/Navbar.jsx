import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const { user, logout } = useContext(AuthContext) || {}
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-primary-700 to-primary-900 shadow-lg sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-primary-600 rounded-lg transition transform hover:scale-110"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform">
              <div className="bg-white text-primary-700 p-2 rounded-lg font-bold text-xl">
                📚
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold font-heading">StudentsHub</h1>
                <p className="text-primary-100 text-xs">{user?.role === 'admin' ? '⚙️ Admin' : '👤 Student'}</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-primary-100 text-sm bg-primary-600 bg-opacity-50 px-4 py-2 rounded-lg hover:bg-opacity-75 transition transform hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span>{user?.name || 'User'}</span>
            </div>

            {/* User Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 bg-white text-primary-700 rounded-full font-bold hover:shadow-lg transition transform hover:scale-110 flex items-center justify-center"
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-100 transition-all animate-slide-in-down">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <p className="text-gray-800 font-semibold text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setShowDropdown(false)
                      }}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition font-medium text-sm flex items-center gap-2 transform hover:scale-105"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
