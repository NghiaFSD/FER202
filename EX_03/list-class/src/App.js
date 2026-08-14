import logo from "./logo.svg";
import "./App.css";
import {
  useEffect,
  useState,
  useRef,
  createContext,
  useMemo,
  useReducer,
  use,
} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialClasses } from "./data/data";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

function classReducer(state, action) {
  switch (action.type) {
    case "add":
      //them moi vao trong list
      return [...state, action.payload];
    case "remove":
      //xoa: loc cac phan tu co id trung voi id can xoa
      return state.filter((cls) => cls.id !== action.payload);
    case "update":
      //cap nhat neu khop ID thi thay the bang du lieu moi, nguoc lai thi giu nguyen
      return state.map((cls) =>
        cls.id === action.payload.id ? { ...cls, ...action.payload } : cls,
      );
    default:
      return state;
  }
}

function App() {
  //quan ly trang thai giao dien sang/toi
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);
  //khoi tao custom hook
  const [savedClasses, setSavedClasses] = useLocalStorage(
    "classes",
    initialClasses,
  );
  //su dung useReducer de quan ly cac hanh dong them, xoa, cap nhat lop hoc thong qua dispatch
  const [classes, dispatch] = useReducer(classReducer, savedClasses);
  //tu dong luu lai vao localStorage khi co thay doi
  useEffect(() => {
    setSavedClasses(classes);
  }, [classes, setSavedClasses]);
  //tu dong cap nhat lai tieu de cua trang web thay doi theo so thu tu
  useEffect(() => {
    document.title = `Quản lý lớp học (${classes.length})`;
  }, [classes.length]);
  //su dung useref de tham chieu truc tiep den cac phan tu trong DOM, o day la form va cac input
  const inputRefs = useRef(null);
  const selectRefs = useRef(null);
  const inputLecturerRefs = useRef(null);
  //ref cho form de co the reset
  const formRef = useRef(null);

  //su dung useMemo: trich xuat danh sach mon hoc duy nhat (the select)
  const uniqueSubjects = useMemo(() => {
    const allClasses = [...initialClasses, ...classes];

    const subjects = allClasses.map((cls) => cls.subject);

    return [...new Set(subjects)];
  }, [classes]);
  //trang thai luu id cua lop hoc dang duoc chon de sua hoac xoa
  const [editingID, setEditingID] = useState(null);
  //handleEdit: su dung useCallback
  if (editingID !== null) {
    //truong hop no dang o che do cap nhat
    const updateClass = {
      id: editingID,
    };
    dispatch({ type: "update", payload: { id: editingID, ...updateClass } });
    setEditingID(null);
  } else {
    const subject = selectRefs.current?.value || "";
    const lecturer = inputLecturerRefs.current?.value || "";

    const newClass = {
      id: classes.length + 1,
      name,
      subject,
      lecturer,
      enrolled: 2,
      status: "Open",
    };
    dispatch({ type: "add", payload: newClass });
  }
  //handleEdit: su dung useCallback
  const handleEdit = useCallback((cls) => {
    setEditingID(cls.id);

    inputRefs.current.value = cls.name;
    selectRefs.current.value = cls.subject;
    inputLecturerRefs.current.value = cls.lecturer;

    inputRefs.current.focus();
  }, []);

  //ham xu ly them, xoa, cap nhat lop hoc
  const addClass = (newClass) => {
    dispatch({ type: "add", payload: newClass });
  };

  const removeClass = (classId) => {
    dispatch({ type: "remove", payload: classId });
  };

  const updateClass = (updatedClass) => {
    dispatch({ type: "update", payload: updatedClass });
  };
  function resetForm() {
    formRef.current?.reset();
    setEditingID(null);
    inputRefs.current?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = inputRefs.current.value.trim();
    const subject = selectRefs.current.value;
    const lecturer = inputLecturerRefs.current.value.trim();

    if (!name || !subject || !lecturer) {
      window.alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (editingID !== null) {
      // Cập nhật lớp
      updateClass({
        id: editingID,
        name,
        subject,
        lecturer,
      });
    } else {
      // Tạo ID mới, tránh trùng ID sau khi xóa lớp
      const newId =
        classes.length > 0
          ? Math.max(...classes.map((cls) => Number(cls.id))) + 1
          : 1;

      // Thêm lớp mới
      addClass({
        id: newId,
        name,
        subject,
        lecturer,
        enrolled: 0,
        status: "OPEN",
      });
    }

    resetForm();
  }

  function resetForm() {
    formRef.current?.reset();
    setEditingID(null);
    inputRefs.current?.focus();
  }

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="page-header">
        <h2>Quản lý lớp học</h2>
        <button
          onClick={toggleTheme}
          style={{ padding: "10px", margin: "10px", fontSize: "20px" }}
        >
          {darkMode ? <CiLight /> : <MdDarkMode />}
        </button>
      </header>

      <div className="table-container">
        <table
          className="class-table"
          border="1"
          cellPadding="10"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Lecturer</th>
              <th>Enrolled</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td>{cls.id}</td>
                <td>{cls.name}</td>
                <td>{cls.subject}</td>
                <td>{cls.lecturer}</td>
                <td>{cls.enrolled}</td>
                <td>
                  <span className={`status-badge ${cls.status.toLowerCase()}`}>
                    {cls.status}
                  </span>
                </td>
                <td className="action-cell">
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeClass(cls.id)}
                  >
                    Remove
                  </button>

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => updateClass(cls)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
