export default function AdminDashboard({ stats }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-200">
        <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">📊 Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to StudentsHub Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="👥"
          title="Total Students"
          value={stats.students}
          color="from-blue-400 to-blue-600"
        />
        <StatCard
          icon="🎓"
          title="Total Alumni"
          value={stats.alumni}
          color="from-purple-400 to-purple-600"
        />
        <StatCard
          icon="📈"
          title="Enrollment Rate"
          value="95%"
          color="from-green-400 to-green-600"
        />
        <StatCard
          icon="⭐"
          title="Success Rate"
          value="92%"
          color="from-orange-400 to-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">🚀 Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton icon="➕" text="Add Student" color="from-blue-500 to-blue-600" />
          <ActionButton icon="➕" text="Add Alumni" color="from-purple-500 to-purple-600" />
          <ActionButton icon="📄" text="Generate Report" color="from-green-500 to-green-600" />
          <ActionButton icon="⚙️" text="Settings" color="from-orange-500 to-orange-600" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">📝 Recent Activity</h2>
        <div className="space-y-4">
          <ActivityLog icon="✅" text="New student registered: John Doe" time="2 hours ago" />
          <ActivityLog icon="✏️" text="Student profile updated: Jane Smith" time="4 hours ago" />
          <ActivityLog icon="🎓" text="Alumni record created: Ahmed Hassan" time="1 day ago" />
          <ActivityLog icon="📊" text="Report generated: Monthly Statistics" time="2 days ago" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all hover:shadow-xl cursor-pointer`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold opacity-90">{title}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  )
}

function ActionButton({ icon, text, color }) {
  return (
    <button className={`bg-gradient-to-r ${color} text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg active:scale-95`}>
      <span className="text-2xl block mb-1">{icon}</span>
      <span className="text-sm">{text}</span>
    </button>
  )
}

function ActivityLog({ icon, text, time }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-gray-800 font-medium">{text}</p>
        <p className="text-gray-500 text-sm">{time}</p>
      </div>
      <span className="text-gray-400">→</span>
    </div>
  )
}
