function TeacherDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      <p className="mb-4">
        Welcome, Teacher! Here you can create quizzes, view student performance, and manage classes.
      </p>

      {/* Example sections */}
      <div className="space-y-4">
        <button className="px-4 py-2 bg-purple-600 text-white rounded">
          Create a Quiz
        </button>
        <button className="px-4 py-2 bg-orange-600 text-white rounded">
          View Student Reports
        </button>
      </div>
    </div>
  );
}

export default TeacherDashboard;