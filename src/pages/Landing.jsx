export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-700">🌍 EcoEdu</h1>
      <p className="mt-2 text-lg text-gray-700">Gamified Environmental Learning</p>
      <a
        href="/dashboard"
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Enter Dashboard
      </a>
    </div>
  );
}
