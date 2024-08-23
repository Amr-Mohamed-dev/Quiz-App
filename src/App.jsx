import { useState } from "react";
import Quiz from "./components/Quiz";

function App() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleStartQuiz = (info) => {
    setStudentInfo(info);
    setShowQuiz(true);
    setShowForm(false);
  };

  const handleStartNewTest = () => {
    // Clear local storage
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("finalResult");

    // Reset state to show the form
    setStudentInfo(null);
    setShowQuiz(false);
    setShowForm(true);
  };

  return (
    <div>
      {showForm && !showQuiz ? (
        <StudentForm onStartQuiz={handleStartQuiz} />
      ) : showQuiz ? (
        <Quiz studentInfo={studentInfo} onTestCompleted={handleStartNewTest} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const StudentForm = ({ onStartQuiz }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const info = { name, age, gender };
    localStorage.setItem("studentInfo", JSON.stringify(info));
    onStartQuiz(info);
  };

  return (
    <div className="flex items-center bg-[#021526] justify-center flex-col w-full h-[100vh]">
      <h1 className="mb-4  font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent text-6xl  bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Hello Kid
        </span>{" "}
        <span className="text-3xl block">Enter your data.</span>
      </h1>
      <form className="max-w-full text-center mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="username"
          className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            type="text"
            id="username"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <label
          htmlFor="age"
          className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Age
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            type="number"
            id="age"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <br />
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Gender
        </label>
        <select
          id="countries"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <br />
        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Start Quiz
          </span>
        </button>
      </form>
    </div>
  );
};

export default App;
