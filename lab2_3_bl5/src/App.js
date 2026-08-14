import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { initialAttendances } from "./data";
import "./App.css";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const STORAGE_KEY = "attendance-records";

function attendanceReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_STATUS":
      return state.map((record) => record.id === action.id
        ? { ...record, status: record.status === "PRESENT" ? "ABSENT" : "PRESENT" }
        : record);
    case "DELETE_RECORD":
      return state.filter((record) => record.id !== action.id);
    case "RESET":
      return initialAttendances;
    default:
      return state;
  }
}

function loadRecords() {
  try {
    const savedRecords = localStorage.getItem(STORAGE_KEY);
    return savedRecords ? JSON.parse(savedRecords) : initialAttendances;
  } catch {
    return initialAttendances;
  }
}

function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString("vi-VN");
}

function App() {
  const [records, dispatch] = useReducer(attendanceReducer, undefined, loadRecords);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    const focusSearch = (event) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const displayedRecords = useMemo(() => {
    const keyword = nameFilter.trim().toLocaleLowerCase("vi");
    return records.filter((record) =>
      record.name.toLocaleLowerCase("vi").includes(keyword) &&
      (statusFilter === "ALL" || record.status === statusFilter)
    );
  }, [records, nameFilter, statusFilter]);

  const statistics = useMemo(() => {
    const present = displayedRecords.filter((record) => record.status === "PRESENT").length;
    return { total: displayedRecords.length, present, rate: displayedRecords.length ? present / displayedRecords.length * 100 : 0 };
  }, [displayedRecords]);

  const handleDelete = (record) => {
    if (window.confirm(`Bạn có chắc muốn xóa điểm danh của ${record.name}?`)) {
      dispatch({ type: "DELETE_RECORD", id: record.id });
    }
  };

  return (
    <main className={`attendance-page ${isDarkMode ? "dark-mode" : ""}`}>
      <section className="attendance-card">
        <div className="heading-row">
          <div>
            <h2>HỆ THỐNG QUẢN LÝ ĐIỂM DANH LỚP HỌC</h2>
            <p className="subtitle">Theo dõi tình trạng có mặt của sinh viên</p>
          </div>
          <button
            className="btn theme-button"
            onClick={() => setIsDarkMode((currentMode) => !currentMode)}
            aria-label={isDarkMode ? "Chuyen sang che do sang" : "Chuyen sang che do toi"}
          >
            {isDarkMode ? <CiLight /> : <MdDarkMode />}
          </button>
        </div>

        <div className="toolbar">
          <input ref={searchInputRef} className="form-control" value={nameFilter}
            onChange={(event) => setNameFilter(event.target.value)} placeholder="Tìm kiếm theo tên sinh viên" />
          <div className="filter-actions">
          <select className="form-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PRESENT">Có mặt (PRESENT)</option>
            <option value="ABSENT">Vắng mặt (ABSENT)</option>
          </select>
          <button className="btn btn-outline-secondary reset-data-button bg-primary text-white" onClick={() => {
            setNameFilter("");
            setStatusFilter("ALL");
            searchInputRef.current?.focus();
          }}>Reset Bộ Lọc</button>
          </div>
        </div>

        <div className="statistics">
          <span>Tổng số bản ghi: <strong>{statistics.total}</strong></span>
          <span>Có mặt: <strong>{statistics.present}</strong></span>
          <span>Tỷ lệ có mặt: <strong>{statistics.rate.toFixed(1)}%</strong></span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead><tr><th>STT</th><th>Mã lớp</th><th>Tên sinh viên</th><th>Ngày</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {displayedRecords.length > 0 ? displayedRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td><td>{record.classId}</td><td className="student-name">{record.name}</td>
                  <td>{formatDate(record.date)}</td>
                  <td><button className={`status-badge ${record.status.toLowerCase()}`} onClick={() => dispatch({ type: "TOGGLE_STATUS", id: record.id })}>{record.status}</button></td>
                  <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(record)}>Xóa</button></td>
                </tr>
              )) : <tr><td colSpan="6" className="empty-state">Không tìm thấy bản ghi phù hợp.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;
