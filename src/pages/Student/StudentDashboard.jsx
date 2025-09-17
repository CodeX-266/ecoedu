function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="mb-4">
        Welcome, Student! Here you can view quizzes, track your progress, and see your scores.
      </p>

      {/* Example sections */}
      <div className="space-y-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Start a Quiz
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          View Progress
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
