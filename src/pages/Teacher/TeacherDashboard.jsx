import React, { useState } from "react";

function TeacherDashboard() {
  const teacherData = {
    name: "Dr. Meera Sharma",
    employeeId: "EMP4567",
    department: "Computer Science",
    designation: "Assistant Professor",
  };

  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Data Structures Quiz", date: "2025-09-10" },
    { id: 2, title: "Operating Systems Quiz", date: "2025-09-12" },
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState("");

  const reports = [
    { id: 1, student: "Amit Verma", quiz: "Data Structures Quiz", score: 85 },
    { id: 2, student: "Riya Kapoor", quiz: "Operating Systems Quiz", score: 92 },
    { id: 3, student: "Karan Singh", quiz: "Data Structures Quiz", score: 74 },
    { id: 4, student: "Neha Sharma", quiz: "Operating Systems Quiz", score: 88 },
    { id: 5, student: "Sahil Mehta", quiz: "Data Structures Quiz", score: 67 },
    { id: 6, student: "Ananya Jain", quiz: "Operating Systems Quiz", score: 79 },
    { id: 7, student: "Vikram Roy", quiz: "Data Structures Quiz", score: 91 },
    { id: 8, student: "Tanya Singh", quiz: "Operating Systems Quiz", score: 82 },
    { id: 9, student: "Karan Sharma", quiz: "Data Structures Quiz", score: 79 },
    { id: 10, student: "Varun Singh", quiz: "Operating Systems Quiz", score: 76 },
    { id: 11, student: "rishi Singh", quiz: "Data Structures Quiz", score: 84 },
    { id: 12, student: "Karan Singla", quiz: "Operating Systems Quiz", score: 86 },
    { id: 13, student: "Tanya singh", quiz: "Data Structures Quiz", score: 94 },
    { id: 14, student: "madhav verma", quiz: "Operating Systems Quiz", score: 96 },
    { id: 15, student: "mehtaab", quiz: "Data Structures Quiz", score: 64 },
  ];

  const addQuiz = () => {
    const newQuiz = {
      id: quizzes.length + 1,
      title: `New Quiz ${quizzes.length + 1}`,
      date: new Date().toISOString().split("T")[0],
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const [profileVisible, setProfileVisible] = useState(false);

  const filteredReports = selectedQuiz
    ? reports.filter((r) => r.quiz === selectedQuiz)
    : reports;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-cyan-900 to-black text-white h-screen overflow-y-auto p-6 pb-20">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-cyan-900/90 backdrop-blur-sm p-4 flex justify-between items-center z-50 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide text-white animate-gradient">
          InTutor
        </h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            Dashboard
          </button>
          <button
          onClick={() => setProfileVisible((prev) => !prev)}
          className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-md shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative">
          Profile
          {/* Dropdown Profile Panel */}
          {profileVisible && (
            <div className="absolute right-0 mt-2 w-64 bg-purple-900 rounded-lg shadow-lg p-4 z-50 text-white">
              <h4 className="font-semibold text-lg mb-2">Teacher Profile</h4>
              <p><strong>Name:</strong> {teacherData.name}</p>
              <p><strong>Employee ID:</strong> {teacherData.employeeId}</p>
              <p><strong>Department:</strong> {teacherData.department}</p>
              <p><strong>Designation:</strong> {teacherData.designation}</p>
            </div>
          )}
        </button>

        </div>
      </nav>

      {/* Page Body */}
      <div className="p-6 pt-18 max-w-5xl mx-auto">
        {/* Animated Header */}
        <header className="mb-8 text-center">
          <h2 className="text-5xl font-extrabold mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-400 animate-nameFade scale-100">
            Teacher Dashboard
          </h2>
          <p className="text-purple-200 tracking-wide text-lg animate-nameFade delay-200">
            Welcome, {teacherData.name}!
          </p>
        </header>

        {/* Quiz Management */}
        <section className="mb-8 p-4 bg-gradient-to-r from-cyan-700 to-blue-800 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-semibold mb-4">Quizzes</h3>
          <button
            onClick={addQuiz}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            + Upload New Quiz
          </button>
          <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {quizzes.map((quiz) => (
              <li
                key={quiz.id}
                className="p-2 bg-gray-800/80 rounded-lg flex justify-between text-lg shadow hover:bg-gray-700 transition duration-300"
              >
                <span>{quiz.title}</span>
                <span className="text-sm text-gray-400">{quiz.date}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Student Reports */}
        <section className="p-4 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-semibold mb-4">Student Reports</h3>

          {/* Dropdown to select quiz */}
          <select
            className="mb-4 p-2 text-lg rounded-lg text-black shadow"
            value={selectedQuiz}
            onChange={(e) => setSelectedQuiz(e.target.value)}
          >
            <option value="">-- Select Quiz --</option>
            {quizzes.map((q) => (
              <option key={q.id} value={q.title}>
                {q.title}
              </option>
            ))}
          </select>

          {/* Reports Table */}
          <div className="border border-gray-700 rounded-lg h-auto mt-2">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="p-2 text-lg font-medium">Student</th>
                  <th className="p-2 text-lg font-medium">Quiz</th>
                  <th className="p-2 text-lg font-medium">Score</th>
                </tr>
              </thead>
            </table>
            {/* Scrollable table body */}
            <div className="max-h-80 overflow-y-auto pb-4">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((r) => (
                      <tr key={r.id} className="border-t border-gray-700 hover:bg-gray-900 transition">
                        <td className="p-2">{r.student}</td>
                        <td className="p-2">{r.quiz}</td>
                        <td className="p-2">{r.score}%</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-2" colSpan={3}>
                        No reports found for this quiz.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Tailwind Animations for gradient text and fade-in */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');
          h2 {
            font-family: 'Cinzel Decorative', serif;
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background: linear-gradient(90deg,#8A2BE2,#00FFFF,#8A2BE2);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 5s ease infinite;
          }
          @keyframes nameFade {
            0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-nameFade {
            animation: nameFade 1s ease forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
}

export default TeacherDashboard;
