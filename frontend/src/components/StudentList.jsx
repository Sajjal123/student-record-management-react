import StudentCard from './StudentCard'

export default function StudentList({ students, onEdit, onDeleteSuccess }) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">No students found. Add your first student!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Students ({students.length})</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDeleteSuccess={onDeleteSuccess}
          />
        ))}
      </div>
    </div>
  )
}
