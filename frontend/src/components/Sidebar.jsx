import { useState } from 'react'

export default function Sidebar({ onMenuItemClick, isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState('dashboard')

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      subsections: []
    },
    {
      id: 'students',
      label: 'Students',
      icon: '👥',
      subsections: [
        { id: 'all-students', label: 'All Students' },
        { id: 'add-student', label: 'Add New' },
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📈',
      subsections: [
        { id: 'performance', label: 'Performance' },
        { id: 'attendance', label: 'Attendance' },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      subsections: [
        { id: 'general', label: 'General' },
        { id: 'users', label: 'Users' },
      ]
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-16 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 transform transition-transform duration-300 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Contact Info Card */}
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-4 mb-8">
            <h3 className="text-white font-bold text-sm mb-3">📞 Contact Admin</h3>
            <div className="space-y-2 text-xs text-primary-100">
              <p>📧 admin@studentshub.com</p>
              <p>📱 +1 (555) 123-4567</p>
              <p>🏢 School Office, Building A</p>
              <p className="mt-3 text-xs border-t border-primary-400 pt-2">
                Available: Mon-Fri 9AM-5PM
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => setExpandedSection(expandedSection === item.id ? null : item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    expandedSection === item.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.subsections.length > 0 && (
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedSection === item.id ? 'rotate-180' : ''
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  )}
                </button>

                {/* Submenu */}
                {expandedSection === item.id && item.subsections.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary-500 pl-4">
                    {item.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onMenuItemClick(sub.id)
                          onClose()
                        }}
                        className="block w-full text-left px-3 py-2 rounded text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-12 pt-6 border-t border-gray-700">
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-xs mb-2">Version 1.0</p>
              <p className="text-gray-500 text-xs">© 2025 StudentsHub</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
