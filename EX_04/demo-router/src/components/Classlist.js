import React, {
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { initialClasses } from "../data/data";

const STORAGE_KEY = "fer202-classes";
const THEME_KEY = "fer202-theme";

const SUBJECTS = [
  "Project Management",
  "Software Development Project",
  "Software Testing",
];

const EMPTY_FORM = {
  name: "",
  subject: "Software Development Project",
  lecturer: "",
  status: "OPEN",
};

// Chuẩn hóa chuỗi để tìm kiếm
function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// 1. Reducer: Quản lý trạng thái lớp học
function classReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "update":
      return state.map((cls) =>
        cls.id === action.payload.id
          ? { ...cls, ...action.payload }
          : cls,
      );

    case "remove":
      return state.filter(
        (cls) => cls.id !== action.payload,
      );

    case "toggleStatus":
      return state.map((cls) =>
        cls.id === action.payload
          ? {
              ...cls,
              status:
                cls.status === "OPEN"
                  ? "CLOSED"
                  : "OPEN",
            }
          : cls,
      );

    default:
      return state;
  }
}

// Đọc danh sách lớp từ localStorage
function loadClasses(defaultClasses) {
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

  return defaultClasses;
}

function Classlist() {
  // Danh sách lớp học
  const [classes, dispatch] = useReducer(
    classReducer,
    initialClasses,
    loadClasses,
  );

  // Theme: Dark mode, Light mode
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light",
  );

  // Dữ liệu trên form
  const [form, setForm] = useState({
    ...EMPTY_FORM,
  });

  // null: đang thêm mới
  // có ID: đang cập nhật
  const [editingId, setEditingId] = useState(null);

  // Các state tìm kiếm và lọc
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const isDark = theme === "dark";

  // Lưu danh sách lớp học vào localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(classes),
    );
  }, [classes]);

  // Lưu theme vào localStorage
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Tạo danh sách môn học cho select
  const subjectOptions = useMemo(() => {
    const subjectsFromClasses = classes.map(
      (cls) => cls.subject,
    );

    return [
      ...new Set([
        ...SUBJECTS,
        ...subjectsFromClasses,
      ]),
    ]
      .filter(Boolean)
      .sort();
  }, [classes]);

  // Lọc danh sách lớp học
  const filteredClasses = useMemo(() => {
    const keyword = normalizeText(search);

    return classes.filter((cls) => {
      const matchesSearch =
        !keyword ||
        normalizeText(cls.name).includes(keyword) ||
        normalizeText(cls.lecturer).includes(
          keyword,
        );

      const matchesSubject =
        !subjectFilter ||
        cls.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        cls.status === statusFilter;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesStatus
      );
    });
  }, [
    classes,
    search,
    subjectFilter,
    statusFilter,
  ]);

  // Thay đổi dữ liệu trên form
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  // Đưa form về trạng thái ban đầu
  function resetForm() {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
  }

  // Thêm mới hoặc cập nhật lớp học
  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const lecturer = form.lecturer.trim();

    if (!name) {
      window.alert("Vui lòng nhập tên lớp.");
      return;
    }

    if (!form.subject) {
      window.alert("Vui lòng chọn môn học.");
      return;
    }

    if (!lecturer) {
      window.alert("Vui lòng nhập tên giảng viên.");
      return;
    }

    // Kiểm tra tên lớp bị trùng
    const duplicateName = classes.some(
      (cls) =>
        normalizeText(cls.name) ===
          normalizeText(name) &&
        cls.id !== editingId,
    );

    if (duplicateName) {
      window.alert("Tên lớp đã tồn tại.");
      return;
    }

    const classData = {
      name,
      subject: form.subject,
      lecturer,
      status: form.status,
    };

    if (editingId !== null) {
      // Cập nhật
      dispatch({
        type: "update",
        payload: {
          id: editingId,
          ...classData,
        },
      });

      window.alert("Cập nhật lớp học thành công.");
    } else {
      // Tạo ID mới
      const newId =
        classes.length === 0
          ? 1
          : Math.max(
              ...classes.map(
                (cls) => Number(cls.id) || 0,
              ),
            ) + 1;

      // Thêm mới
      dispatch({
        type: "add",
        payload: {
          id: newId,
          ...classData,
          enrolled: 0,
          students: [],
        },
      });

      window.alert("Thêm lớp học thành công.");
    }

    resetForm();
  }

  // Đưa dữ liệu của lớp lên form
  function handleEdit(cls) {
    setEditingId(cls.id);

    setForm({
      name: cls.name,
      subject: cls.subject,
      lecturer: cls.lecturer,
      status: cls.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Xóa lớp học theo ID
  function handleDelete(id) {
    const selectedClass = classes.find(
      (cls) => cls.id === id,
    );

    const accepted = window.confirm(
      `Bạn có chắc muốn xóa lớp ${
        selectedClass?.name ?? ""
      }?`,
    );

    if (!accepted) return;

    dispatch({
      type: "remove",
      payload: id,
    });

    // Nếu đang sửa chính lớp vừa xóa
    if (editingId === id) {
      resetForm();
    }
  }

  // Thay đổi trạng thái OPEN/CLOSED
  function handleToggleStatus(id) {
    dispatch({
      type: "toggleStatus",
      payload: id,
    });
  }

  // Dark mode/Light mode
  function handleToggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light"
        ? "dark"
        : "light",
    );
  }

  const pageClass = isDark
    ? "min-vh-100 bg-dark text-light"
    : "min-vh-100 bg-light text-dark";

  const panelClass = isDark
    ? "card border-secondary bg-secondary text-light shadow-sm"
    : "card border-0 bg-white shadow-sm";

  return (
    <div className={pageClass}>
      <main className="container-fluid px-lg-5 py-4">
        {/* TIÊU ĐỀ VÀ NÚT DARK MODE */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="fw-bold mb-0">
            Quản lý Lớp học
          </h1>

          <button
            type="button"
            className={
              isDark
                ? "btn btn-outline-light fs-4 px-4 py-3"
                : "btn btn-outline-dark fs-4 px-4 py-3"
            }
            onClick={handleToggleTheme}
            title={
              isDark
                ? "Chuyển sang Light mode"
                : "Chuyển sang Dark mode"
            }
          >
            {isDark ? "☀" : "☾"}
          </button>
        </div>

        {/* FORM THÊM VÀ CẬP NHẬT */}
        <form
          className={`${panelClass} mb-4`}
          onSubmit={handleSubmit}
        >
          <div className="card-body p-4">
            <div className="row g-3">
              {/* Tên lớp */}
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="name"
                  placeholder="Tên lớp..."
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Môn học */}
              <div className="col-lg-4">
                <select
                  className="form-select form-select-lg"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                >
                  {subjectOptions.map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                    >
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Giảng viên */}
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="lecturer"
                  placeholder="Giảng viên..."
                  value={form.lecturer}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Chọn trạng thái */}
            <div className="d-flex flex-wrap gap-4 mt-3">
              <div className="form-check">
                <input
                  id="formOpen"
                  className="form-check-input"
                  type="radio"
                  name="status"
                  value="OPEN"
                  checked={form.status === "OPEN"}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label fs-5"
                  htmlFor="formOpen"
                >
                  OPEN
                </label>
              </div>

              <div className="form-check">
                <input
                  id="formClosed"
                  className="form-check-input"
                  type="radio"
                  name="status"
                  value="CLOSED"
                  checked={form.status === "CLOSED"}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label fs-5"
                  htmlFor="formClosed"
                >
                  CLOSED
                </label>
              </div>
            </div>

            {/* Các nút submit */}
            <div className="d-flex gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-warning fw-semibold"
              >
                {editingId === null
                  ? "Thêm lớp"
                  : "Cập nhật"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Hủy sửa
                </button>
              )}
            </div>
          </div>
        </form>

        {/* SEARCH VÀ FILTER */}
        <section className={`${panelClass} mb-4`}>
          <div className="card-body p-4">
            <div className="row g-3 align-items-center">
              {/* Search */}
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Tìm theo tên lớp hoặc giảng viên..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>

              {/* Lọc theo môn */}
              <div className="col-lg-3">
                <select
                  className="form-select form-select-lg"
                  value={subjectFilter}
                  onChange={(event) =>
                    setSubjectFilter(
                      event.target.value,
                    )
                  }
                >
                  <option value="">
                    All Subjects
                  </option>

                  {subjectOptions.map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                    >
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lọc theo trạng thái */}
              <div className="col-lg-4">
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <strong className="fs-5">
                    Status:
                  </strong>

                  {["ALL", "OPEN", "CLOSED"].map(
                    (status) => (
                      <div
                        className="form-check"
                        key={status}
                      >
                        <input
                          id={`filter-${status}`}
                          className="form-check-input"
                          type="radio"
                          name="statusFilter"
                          value={status}
                          checked={
                            statusFilter === status
                          }
                          onChange={(event) =>
                            setStatusFilter(
                              event.target.value,
                            )
                          }
                        />

                        <label
                          className="form-check-label"
                          htmlFor={`filter-${status}`}
                        >
                          {status === "ALL"
                            ? "All"
                            : status}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SỐ LƯỢNG KẾT QUẢ */}
        <div className="mb-2">
          Hiển thị{" "}
          <strong>{filteredClasses.length}</strong>/
          {classes.length} lớp học
        </div>

        {/* BẢNG DANH SÁCH LỚP */}
        <div className="table-responsive rounded shadow-sm">
          <table
            className={`table table-hover align-middle mb-0 ${
              isDark ? "table-dark" : ""
            }`}
          >
            <thead
              style={{
                "--bs-table-bg": "#87390c",
                "--bs-table-color": "#ffffff",
              }}
            >
              <tr>
                <th>NO</th>
                <th>NAME</th>
                <th>SUBJECT</th>
                <th>LECTURER</th>
                <th>ENROLL</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredClasses.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >
                    Không tìm thấy lớp học phù hợp.
                  </td>
                </tr>
              ) : (
                filteredClasses.map(
                  (cls, index) => (
                    <tr key={cls.id}>
                      <td>{index + 1}</td>

                      <td>{cls.name}</td>

                      <td>{cls.subject}</td>

                      <td>{cls.lecturer}</td>

                      <td className="fw-bold">
                        {cls.enrolled ?? 0}
                      </td>

                      <td>
                        <button
                          type="button"
                          className={`badge rounded-pill border-0 px-3 py-2 ${
                            cls.status === "OPEN"
                              ? "text-bg-success"
                              : "text-bg-danger"
                          }`}
                          onClick={() =>
                            handleToggleStatus(
                              cls.id,
                            )
                          }
                          title="Bấm để thay đổi trạng thái"
                        >
                          {cls.status}
                        </button>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <Link
                            className="btn btn-success btn-sm"
                            to={`/detail/${cls.id}`}
                          >
                            Detail
                          </Link>

                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              handleEdit(cls)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(cls.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Classlist;