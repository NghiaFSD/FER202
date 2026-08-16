import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialClasses, defaultSubjects } from "./data/data";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

// Reducer quản lý state của danh sách lớp học
function classReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((cls) => cls.id !== action.payload);
    case "update":
      return state.map((cls) =>
        cls.id === action.payload.id ? { ...cls, ...action.payload } : cls
      );
    case "reset":
      return action.payload || initialClasses;
    default:
      return state;
  }
}

function App() {
  // 1. Quản lý trạng thái giao diện Sáng / Tối với custom hook useLocalStorage
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  // 2. Quản lý dữ liệu danh sách lớp học lưu trong LocalStorage
  const [savedClasses, setSavedClasses] = useLocalStorage(
    "classes",
    initialClasses
  );

  // 3. Sử dụng useReducer để quản lý các hành động thêm, xóa, sửa lớp học
  const [classes, dispatch] = useReducer(classReducer, savedClasses);

  // 4. useEffect đồng bộ danh sách classes vào LocalStorage khi state thay đổi
  useEffect(() => {
    setSavedClasses(classes);
  }, [classes, setSavedClasses]);

  // 5. useEffect tự động cập nhật tiêu đề trang web theo số lượng lớp học
  useEffect(() => {
    document.title = `Quản lý lớp học (${classes.length})`;
  }, [classes.length]);

  // 6. useRef tham chiếu đến các phần tử trong DOM (form và các ô input)
  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  const subjectSelectRef = useRef(null);
  const lecturerInputRef = useRef(null);
  const enrolledInputRef = useRef(null);
  const statusSelectRef = useRef(null);

  // Focus vào ô nhập tên lớp khi load trang lần đầu
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Trạng thái lưu ID của lớp đang được chọn để chỉnh sửa (null nếu đang thêm mới)
  const [editingID, setEditingID] = useState(null);

  // Bộ lọc và tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // 7. useMemo trích xuất danh sách môn học duy nhất (cho dropdown chọn môn học)
  const uniqueSubjects = useMemo(() => {
    const fromClasses = classes.map((cls) => cls.subject);
    const combined = [...(defaultSubjects || []), ...fromClasses];
    return [...new Set(combined)].filter(Boolean);
  }, [classes]);

  // useMemo tính toán thống kê
  const stats = useMemo(() => {
    const total = classes.length;
    const openCount = classes.filter(
      (cls) => cls.status?.toLowerCase() === "open"
    ).length;
    const closedCount = total - openCount;
    const totalEnrolled = classes.reduce(
      (sum, cls) => sum + (Number(cls.enrolled) || 0),
      0
    );
    return { total, openCount, closedCount, totalEnrolled };
  }, [classes]);

  // useMemo lọc danh sách lớp theo từ khóa, môn học và trạng thái
  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      const matchSearch =
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.lecturer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSubject =
        filterSubject === "all" || cls.subject === filterSubject;

      const matchStatus =
        filterStatus === "all" ||
        cls.status?.toLowerCase() === filterStatus.toLowerCase();

      return matchSearch && matchSubject && matchStatus;
    });
  }, [classes, searchTerm, filterSubject, filterStatus]);

  // 8. useCallback: Hàm xử lý chuyển form sang chế độ chỉnh sửa (Edit)
  const handleEdit = useCallback((cls) => {
    setEditingID(cls.id);

    if (nameInputRef.current) nameInputRef.current.value = cls.name;
    if (subjectSelectRef.current) subjectSelectRef.current.value = cls.subject;
    if (lecturerInputRef.current) lecturerInputRef.current.value = cls.lecturer;
    if (enrolledInputRef.current)
      enrolledInputRef.current.value = cls.enrolled ?? 0;
    if (statusSelectRef.current)
      statusSelectRef.current.value = cls.status || "Open";

    nameInputRef.current?.focus();
  }, []);

  // Hàm đặt lại form
  const resetForm = useCallback(() => {
    formRef.current?.reset();
    setEditingID(null);
    if (enrolledInputRef.current) enrolledInputRef.current.value = "0";
    if (statusSelectRef.current) statusSelectRef.current.value = "Open";
    nameInputRef.current?.focus();
  }, []);

  // Xử lý Xóa lớp học
  const removeClass = useCallback(
    (classId) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa lớp học này không?")) {
        dispatch({ type: "remove", payload: classId });
        if (editingID === classId) {
          resetForm();
        }
      }
    },
    [editingID, resetForm]
  );

  // Khôi phục dữ liệu ban đầu
  const handleResetDefaultData = useCallback(() => {
    if (window.confirm("Bạn có muốn đặt lại danh sách lớp học về mặc định?")) {
      dispatch({ type: "reset", payload: initialClasses });
      resetForm();
    }
  }, [resetForm]);

  // Xử lý Submit Form (Thêm mới hoặc Cập nhật)
  function handleSubmit(event) {
    event.preventDefault();

    const name = nameInputRef.current?.value.trim();
    const subject = subjectSelectRef.current?.value;
    const lecturer = lecturerInputRef.current?.value.trim();
    const enrolled = parseInt(enrolledInputRef.current?.value, 10) || 0;
    const status = statusSelectRef.current?.value || "Open";

    if (!name || !subject || !lecturer) {
      window.alert("Vui lòng nhập đầy đủ Tên lớp, Môn học và Giảng viên.");
      return;
    }

    if (editingID !== null) {
      // Cập nhật lớp học
      dispatch({
        type: "update",
        payload: {
          id: editingID,
          name,
          subject,
          lecturer,
          enrolled,
          status,
        },
      });
    } else {
      // Thêm mới lớp học - tạo ID lớn nhất + 1 để tránh trùng
      const newId =
        classes.length > 0
          ? Math.max(...classes.map((cls) => Number(cls.id) || 0)) + 1
          : 1;

      dispatch({
        type: "add",
        payload: {
          id: newId,
          name,
          subject,
          lecturer,
          enrolled,
          status,
        },
      });
    }

    resetForm();
  }

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Header */}
      <header className="page-header">
        <div className="header-title">
          <h2>🏫 Quản lý lớp học</h2>
          <p className="subtitle">
            Hệ thống quản lý thông tin lớp học, môn học và giảng viên
          </p>
        </div>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={darkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
        >
          {darkMode ? <CiLight size={24} /> : <MdDarkMode size={24} />}
          <span>{darkMode ? "Chế độ Sáng" : "Chế độ Tối"}</span>
        </button>
      </header>

      <div className="main-content">
        {/* Thống kê nhanh */}
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-label">Tổng số lớp</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-card stat-open">
            <span className="stat-label">Đang mở (Open)</span>
            <span className="stat-value">{stats.openCount}</span>
          </div>
          <div className="stat-card stat-closed">
            <span className="stat-label">Đã đóng (Closed)</span>
            <span className="stat-value">{stats.closedCount}</span>
          </div>
          <div className="stat-card stat-enrolled">
            <span className="stat-label">Tổng SV đã đăng ký</span>
            <span className="stat-value">{stats.totalEnrolled}</span>
          </div>
        </div>

        {/* Form thêm mới / Cập nhật lớp học */}
        <section className="form-card">
          <div className="form-card-header">
            <h3>
              {editingID !== null
                ? `✏️ Cập nhật lớp học (ID: ${editingID})`
                : "➕ Thêm lớp học mới"}
            </h3>
            {editingID !== null && (
              <span className="editing-tag">Đang chỉnh sửa ID #{editingID}</span>
            )}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="class-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="className">
                  Tên lớp học <span className="required">*</span>
                </label>
                <input
                  id="className"
                  ref={nameInputRef}
                  type="text"
                  placeholder="VD: SE1701"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="classSubject">
                  Môn học <span className="required">*</span>
                </label>
                <select id="classSubject" ref={subjectSelectRef} required>
                  <option value="">-- Chọn môn học --</option>
                  {uniqueSubjects.map((subject, idx) => (
                    <option key={idx} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="classLecturer">
                  Giảng viên <span className="required">*</span>
                </label>
                <input
                  id="classLecturer"
                  ref={lecturerInputRef}
                  type="text"
                  placeholder="VD: Nguyen Van A"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="classEnrolled">Số SV đăng ký</label>
                <input
                  id="classEnrolled"
                  ref={enrolledInputRef}
                  type="number"
                  min="0"
                  defaultValue="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="classStatus">Trạng thái</label>
                <select
                  id="classStatus"
                  ref={statusSelectRef}
                  defaultValue="Open"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className={`btn ${editingID !== null ? "btn-warning" : "btn-primary"}`}
              >
                {editingID !== null ? "💾 Lưu cập nhật" : "➕ Thêm lớp"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                {editingID !== null ? "❌ Hủy chỉnh sửa" : "🔄 Làm mới form"}
              </button>
            </div>
          </form>
        </section>

        {/* Bảng danh sách & Bộ lọc */}
        <section className="table-card">
          <div className="table-card-header">
            <h3>📋 Danh sách lớp học ({filteredClasses.length})</h3>
            <button
              type="button"
              className="btn-reset-data"
              onClick={handleResetDefaultData}
              title="Khôi phục lại dữ liệu mẫu ban đầu"
            >
              🔄 Đặt lại dữ liệu ban đầu
            </button>
          </div>

          {/* Công cụ tìm kiếm và lọc */}
          <div className="filter-bar">
            <div className="filter-group search-box">
              <label htmlFor="search">🔍 Tìm kiếm:</label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên lớp, môn học, giảng viên..."
              />
            </div>

            <div className="filter-group">
              <label htmlFor="filterSubject">Môn học:</label>
              <select
                id="filterSubject"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="all">Tất cả môn học</option>
                {uniqueSubjects.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filterStatus">Trạng thái:</label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="class-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên lớp</th>
                  <th>Môn học</th>
                  <th>Giảng viên</th>
                  <th>Số SV</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "center" }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <tr
                      key={cls.id}
                      className={editingID === cls.id ? "row-editing" : ""}
                    >
                      <td className="id-cell">#{cls.id}</td>
                      <td className="name-cell">
                        <strong>{cls.name}</strong>
                      </td>
                      <td>{cls.subject}</td>
                      <td>{cls.lecturer}</td>
                      <td>{cls.enrolled}</td>
                      <td>
                        <span
                          className={`status-badge ${(cls.status || "").toLowerCase()}`}
                        >
                          {cls.status || "Open"}
                        </span>
                      </td>
                      <td className="action-cell">
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() => handleEdit(cls)}
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => removeClass(cls.id)}
                        >
                          🗑️ Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-message">
                      Không tìm thấy lớp học nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
