export default function AdminReports({ stats }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">📈 Reports & Analytics</h1>
        <p className="text-gray-600">System statistics and insights</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportCard icon="👥" title="Total Records" value={stats.students + stats.alumni} color="from-blue-400 to-blue-600" />
        <ReportCard icon="📊" title="Growth Rate" value="12.5%" color="from-green-400 to-green-600" />
        <ReportCard icon="✅" title="Completion" value="98%" color="from-purple-400 to-purple-600" />
      </div>

      {/* Charts */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">📉 Student Distribution</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform">
          <p className="text-gray-500">Chart visualization (Integration ready)</p>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl shadow-lg p-8 overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">📋 Summary Report</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 transition">Metric</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 transition">Current</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 transition">Previous</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 transition">Change</th>
            </tr>
          </thead>
          <tbody>
            <ReportRow metric="Active Students" current={stats.students} previous="85" change="+12%" color="text-green-600" />
            <ReportRow metric="Alumni Count" current={stats.alumni} previous="45" change="+18%" color="text-green-600" />
            <ReportRow metric="Avg Performance" current="92%" previous="90%" change="+2%" color="text-green-600" />
            <ReportRow metric="Attendance Rate" current="96%" previous="94%" change="+2%" color="text-green-600" />
          </tbody>
        </table>
      </div>

      {/* Export Options */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">📥 Export Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ExportButton icon="📄" format="PDF" />
          <ExportButton icon="📊" format="Excel" />
          <ExportButton icon="📑" format="CSV" />
        </div>
      </div>
    </div>
  )
}

function ReportCard({ icon, title, value, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all`}>
      <p className="opacity-90 text-sm font-semibold">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-lg mt-2">{icon}</p>
    </div>
  )
}

function ReportRow({ metric, current, previous, change, color }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-medium text-gray-800">{metric}</td>
      <td className="px-6 py-4 text-gray-700">{current}</td>
      <td className="px-6 py-4 text-gray-600">{previous}</td>
      <td className={`px-6 py-4 font-semibold ${color}`}>{change}</td>
    </tr>
  )
}

function ExportButton({ icon, format }) {
  return (
    <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg border-2 border-primary-300 transition transform hover:scale-105 hover:shadow-lg">
      <span className="text-2xl block mb-2">{icon}</span>
      <span>Export {format}</span>
    </button>
  )
}
