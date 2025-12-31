import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import AdminDashboard from '../components/admin/AdminDashboard'
import ManageStudents from '../components/admin/ManageStudents'
import ManageAlumni from '../components/admin/ManageAlumni'
import AdminReports from '../components/admin/AdminReports'

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({ students: 0, alumni: 0 })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [studentsRes, alumniRes] = await Promise.all([
        axios.get('http://localhost:5000/api/students'),
        axios.get('http://localhost:5000/api/alumni')
      ])
      setStats({
        students: studentsRes.data.length,
        alumni: alumniRes.data.length
      })
    } catch (error) {
      console.error('Failed to fetch stats', error)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard stats={stats} />
      case 'students':
        return <ManageStudents />
      case 'alumni':
        return <ManageAlumni />
      case 'reports':
        return <AdminReports stats={stats} />
      default:
        return <AdminDashboard stats={stats} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />

      <div className="flex flex-1">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

function AdminSidebar({ activeTab, onTabChange, isOpen, onClose }) {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Manage Students', icon: '👥' },
    { id: 'alumni', label: 'Alumni Records', icon: '🎓' },
    { id: 'reports', label: 'Reports & Analytics', icon: '📈' }
  ]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30" onClick={onClose} />
      )}

      <aside
        className={`fixed lg:static top-16 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 transform transition-transform duration-300 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-8 font-heading">⚙️ Admin Panel</h2>

          <nav className="space-y-2">
            {adminMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-12 pt-6 border-t border-gray-700">
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center hover:bg-opacity-70 transition">
              <p className="text-gray-400 text-xs mb-2">⚡ Admin Privileges</p>
              <p className="text-gray-500 text-xs">Full system access</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
