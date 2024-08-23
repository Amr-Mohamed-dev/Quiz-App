import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";

function App() {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [students, setStudents] = useState([]);
  const [sortKey, setSortKey] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const handleTestCompleted = (finalResult) => {
    const updatedStudents = [...students, finalResult];
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setIsQuizStarted(false);
    setStudentInfo({ name: "", age: "", gender: "" });
  };

  const handleSort = (key) => {
    setSortKey(key);
    const sortedStudents = [...students].sort((a, b) => {
      if (key === "score") {
        return b.score - a.score;
      } else if (key === "age") {
        return a.age - b.age;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    setStudents(sortedStudents);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="App bg-gray-900 text-white min-h-screen p-8">
      {isQuizStarted ? (
        <Quiz studentInfo={studentInfo} onTestCompleted={handleTestCompleted} />
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Enter Student Information
          </h2>
          <form className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={studentInfo.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={studentInfo.age}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="gender"
              value={studentInfo.gender}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button
              type="button"
              onClick={handleStartQuiz}
              className="w-full bg-blue-600 p-3 rounded-md text-white font-semibold hover:bg-blue-700 transition"
            >
              Start Quiz
            </button>
          </form>

          {students.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">
                Students Who Completed the Test
              </h2>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="sortSelect" className="text-lg font-semibold">
                    Sort By:
                  </label>
                  <select
                    id="sortSelect"
                    value={sortKey}
                    onChange={(e) => handleSort(e.target.value)}
                    className="p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="score">Score</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="searchInput"
                    className="text-lg font-semibold"
                  >
                    Search:
                  </label>
                  <input
                    type="text"
                    id="searchInput"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <table className="w-full table-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Age</th>
                    <th className="p-4 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4">{student.name}</td>
                      <td className="p-4">{student.age}</td>
                      <td className="p-4">{student.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
