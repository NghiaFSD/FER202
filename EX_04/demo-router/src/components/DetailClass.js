import React from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { initialClasses } from "../data/data";

const STORAGE_KEY = "fer202-classes";

// Đọc danh sách lớp từ localStorage
function getClasses() {
  try {
    const savedClasses =
      localStorage.getItem(STORAGE_KEY);

    if (savedClasses) {
      const parsedClasses =
        JSON.parse(savedClasses);

      if (Array.isArray(parsedClasses)) {
        return parsedClasses;
      }
    }
  } catch (error) {
    console.error(
      "Không thể đọc danh sách lớp:",
      error,
    );
  }

  return initialClasses;
}

function DetailClass() {
  // Lấy id từ URL /detail/:id
  const { id } = useParams();

  const classes = getClasses();

  // Tìm lớp theo id
  const selectedClass = classes.find(
    (cls) => String(cls.id) === String(id),
  );

  if (!selectedClass) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          Không tìm thấy lớp học có ID: {id}
        </div>

        <Link
          className="btn btn-secondary"
          to="/classes"
        >
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  // Tránh lỗi nếu lớp không có students
  const students =
    selectedClass.students || [];

  return (
    <div className="container py-4">
      <Link
        className="btn btn-secondary mb-4"
        to="/classes"
      >
        ← Quay lại danh sách
      </Link>

      {/* Thông tin lớp học */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">
            Chi tiết lớp: {selectedClass.name}
          </h2>

          <p>
            <strong>Môn học (Subject):</strong>{" "}
            {selectedClass.subject}
          </p>

          <p>
            <strong>
              Giảng viên (Lecturer):
            </strong>{" "}
            {selectedClass.lecturer}
          </p>

          <p>
            <strong>
              Trạng thái (Status):
            </strong>{" "}
            <span
              className={`badge ${
                selectedClass.status === "OPEN"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {selectedClass.status}
            </span>
          </p>
        </div>
      </div>

      <h3 className="mb-3">
        Danh sách sinh viên đã Enroll (
        {students.length})
      </h3>

      {students.length === 0 ? (
        <div className="alert alert-info">
          Chưa có sinh viên nào đăng ký vào lớp
          học này.
        </div>
      ) : (
        // Bảng danh sách sinh viên
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>STT</th>
                <th>Mã sinh viên</th>
                <th>Tên sinh viên</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {students.map(
                (student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DetailClass;