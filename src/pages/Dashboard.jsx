export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700">Welcome to EcoEdu Dashboard</h2>
      <div className="mt-4 flex gap-4">
        <a href="/quiz" className="px-4 py-2 bg-green-500 text-white rounded-lg shadow">
          Take Quiz
        </a>
        <a href="/leaderboard" className="px-4 py-2 bg-green-500 text-white rounded-lg shadow">
          View Leaderboard
        </a>
      </div>
    </div>
  );
}
