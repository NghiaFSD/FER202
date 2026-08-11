import { useState } from "react";
import StudentCard from "./StudentCard";

const students = [
  { id: "DE160182", name: "Nguyen Huu Quoc Khanh", city: "Da Nang", avatar: "👨‍🎓" },
  { id: "DE160377", name: "Chovy Vinh Thien", city: "Quang Nam", avatar: "🧑‍💻" },
  { id: "DE160547", name: "Do Nguyen Phuc", city: "Quang Nam", avatar: "👩‍🎓" },
  { id: "DE170049", name: "Le Hoang Minh", city: "Da Nang", avatar: "🧑‍🎓" }
];

function ExerciseStudents() {
  const [keyword, setKeyword] = useState("");
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.id}`.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="border rounded overflow-hidden">
      <nav className="navbar bg-warning">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">FPT University</span>
          <input
            className="form-control search-box"
            type="search"
            placeholder="Search student"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </nav>

      <header className="p-4">
        <div className="p-5 bg-warning-subtle text-center rounded">
          <h1>Welcome to FPT University</h1>
          <p className="mb-0">Student community and learning environment</p>
        </div>
      </header>

      <main className="px-4 pb-5">
        <h2 className="text-center mb-4">Students Detail</h2>
        <div className="row g-4">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <p className="alert alert-warning mt-3">No student found.</p>
        )}
      </main>

      <footer className="bg-warning py-3 text-center">© 2026 FPT University</footer>
    </div>
  );
}

export default ExerciseStudents;
