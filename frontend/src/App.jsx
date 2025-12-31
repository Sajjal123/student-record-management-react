import { useContext, useEffect } from 'react'
import { AuthContext, AuthProvider } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import AdminPortal from './pages/AdminPortal'
import StudentPortal from './pages/StudentPortal'

function AppContent() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-700 to-secondary-700">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-primary-300 mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading StudentsHub...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  if (user.role === 'admin') {
    return <AdminPortal />
  }

  if (user.role === 'student') {
    return <StudentPortal />
  }

  return <LoginPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
