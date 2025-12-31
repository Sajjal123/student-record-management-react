import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function StudentPortal() {
  const { user, logout } = useContext(AuthContext)
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (user && user.studentId) {
      fetchStudentData()
    }
  }, [user])

  const fetchStudentData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/students/${user.studentId}`)
      setStudentData(response.data)
    } catch (error) {
      console.error('Failed to fetch student data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />

      <div className="flex flex-1">
        <StudentSidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
                <p className="mt-4 text-gray-600">Loading your profile...</p>
              </div>
            ) : (
              <>
                {activeTab === 'profile' && <StudentProfile student={studentData || user} />}
                {activeTab === 'announcements' && <StudentAnnouncements />}
                {activeTab === 'grades' && <StudentGrades student={studentData} />}
                {activeTab === 'documents' && <StudentDocuments />}
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

function StudentSidebar({ activeTab, onTabChange, isOpen, onClose, onLogout }) {
  const studentMenuItems = [
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'grades', label: 'My Grades', icon: '📊' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'documents', label: 'Download Records', icon: '📄' }
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
          <h2 className="text-xl font-bold text-white mb-8 font-heading">📚 Student Portal</h2>

          <nav className="space-y-2 mb-12">
            {studentMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => {
              onLogout()
              onClose()
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all transform hover:scale-105 mt-auto"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

function StudentProfile({ student }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-200">
        <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">👤 My Profile</h1>
        <p className="text-gray-600">Your personal information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard icon="👤" label="Full Name" value={student.name} />
        <InfoCard icon="📧" label="Email" value={student.email} />
        <InfoCard icon="📱" label="Phone" value={student.phone} />
        <InfoCard icon="🎓" label="Grade" value={`Grade ${student.grade}`} />
        <InfoCard icon="📅" label="Date of Birth" value={student.dob} />
        <InfoCard icon="📍" label="Address" value={student.address} />
      </div>
    </div>
  )
}

function StudentAnnouncements() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">📢 Announcements</h1>
      </div>

      <div className="space-y-4">
        <AnnouncementCard
          title="Mid-Term Examinations Scheduled"
          date="January 15, 2025"
          content="Mid-term examinations will begin on January 20th. Please prepare accordingly."
          priority="high"
        />
        <AnnouncementCard
          title="Sports Day Event"
          date="January 10, 2025"
          content="Our annual sports day will be held on January 25th. Participation is encouraged."
          priority="normal"
        />
        <AnnouncementCard
          title="Library Extended Hours"
          date="January 5, 2025"
          content="The library will remain open until 6 PM on weekdays."
          priority="normal"
        />
      </div>
    </div>
  )
}

function StudentGrades({ student }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">📊 My Grades</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b-2 border-primary-200">
              <th className="px-6 py-4 text-left font-bold text-gray-800 hover:bg-primary-100 transition">Subject</th>
              <th className="px-6 py-4 text-left font-bold text-gray-800 hover:bg-primary-100 transition">Grade</th>
              <th className="px-6 py-4 text-left font-bold text-gray-800 hover:bg-primary-100 transition">Percentage</th>
              <th className="px-6 py-4 text-left font-bold text-gray-800 hover:bg-primary-100 transition">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { subject: 'Mathematics', grade: 'A', percentage: '92%', status: 'Excellent' },
              { subject: 'English', grade: 'A-', percentage: '88%', status: 'Good' },
              { subject: 'Science', grade: 'A', percentage: '95%', status: 'Excellent' },
              { subject: 'History', grade: 'B+', percentage: '85%', status: 'Good' }
            ].map((record, idx) => (
              <tr key={idx} className={`border-b transition hover:bg-primary-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-6 py-4 font-semibold text-gray-900">{record.subject}</td>
                <td className="px-6 py-4 text-gray-700">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-bold">{record.grade}</span>
                </td>
                <td className="px-6 py-4 text-gray-700">{record.percentage}</td>
                <td className="px-6 py-4 text-green-600 font-semibold">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StudentDocuments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">📄 Download Records</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentCard title="Academic Transcript" icon="📜" />
        <DocumentCard title="Conduct Certificate" icon="🏆" />
        <DocumentCard title="Transfer Certificate" icon="✅" />
        <DocumentCard title="Grade Report" icon="📊" />
      </div>
    </div>
  )
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-600 transform hover:scale-105 transition-all hover:shadow-xl">
      <p className="text-gray-600 text-sm font-medium mb-2">{icon} {label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function AnnouncementCard({ title, date, content, priority }) {
  const colors = priority === 'high' ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'
  return (
    <div className={`border-l-4 ${colors} rounded-xl p-6 hover:shadow-lg transition-all transform hover:scale-105`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {priority === 'high' && <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">⚠️ Important</span>}
      </div>
      <p className="text-gray-500 text-sm mb-3">📅 {date}</p>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}

function DocumentCard({ title, icon }) {
  return (
    <button className="bg-white rounded-xl shadow-lg p-8 border-2 border-primary-300 hover:border-primary-600 hover:shadow-xl transition-all transform hover:scale-105 text-center">
      <span className="text-5xl block mb-4">{icon}</span>
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <span className="text-primary-600 font-semibold">📥 Download</span>
    </button>
  )
}
