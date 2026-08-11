import { useState } from "react";

function StudentCard({ student }) {
  const [attendance, setAttendance] = useState("Absent");

  return (
    <div className="col-sm-6 col-lg-3">
      <div className="card h-100">
        <div className="avatar-box" aria-label="Student avatar">
          {student.avatar}
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{student.name}</h5>
          <p className="card-text mb-1">{student.id}</p>
          <p className="text-muted">{student.city}</p>

          <select
            className="form-select mb-3"
            value={attendance}
            onChange={(event) => setAttendance(event.target.value)}
          >
            <option>Absent</option>
            <option>Present</option>
          </select>

          <button type="button" className="btn btn-warning">
            Submit: {attendance}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
