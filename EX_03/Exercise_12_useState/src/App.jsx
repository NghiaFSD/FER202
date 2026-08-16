import { useState } from "react";

const searchItems = [
  "React Fundamentals",
  "React Hooks",
  "JavaScript ES6",
  "HTML and CSS",
  "Bootstrap",
  "Node.js",
  "MongoDB",
];

const initialDragItems = [
  "Read the exercise requirements",
  "Create React components",
  "Add state and event handlers",
  "Test every feature",
  "Submit the source code",
];

function Section({ number, title, description, children, wide = false }) {
  return (
    <section className={wide ? "exercise-card wide" : "exercise-card"}>
      <div className="section-heading">
        <span className="section-number">{number}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="demo-area">{children}</div>
    </section>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="center-stack">
      <div className="counter-value" aria-live="polite">
        {count}
      </div>
      <button className="primary-button" onClick={() => setCount(count + 1)}>
        Increment +1
      </button>
    </div>
  );
}

function ControlledInput() {
  const [text, setText] = useState("");

  return (
    <div className="field-stack">
      <label htmlFor="live-text">Enter text</label>
      <input
        id="live-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type something..."
      />
      <div className="live-output">
        <span>Live result</span>
        <strong>{text || "Your text will appear here"}</strong>
      </div>
    </div>
  );
}

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="center-stack">
      <button
        className="secondary-button"
        onClick={() => setIsVisible((current) => !current)}
      >
        {isVisible ? "Hide text" : "Show text"}
      </button>
      {isVisible && (
        <p className="reveal-message">React makes UI state easy to manage.</p>
      )}
    </div>
  );
}

function TodoList() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn useState", completed: true },
    { id: 2, text: "Finish Exercise 12", completed: false },
  ]);
  const [error, setError] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    const value = todoText.trim();

    if (!value) {
      setError("Please enter a todo item.");
      return;
    }

    setTodos((current) => [
      ...current,
      { id: Date.now(), text: value, completed: false },
    ]);
    setTodoText("");
    setError("");
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <form className="inline-form" onSubmit={addTodo}>
        <input
          aria-label="New todo"
          value={todoText}
          onChange={(event) => {
            setTodoText(event.target.value);
            setError("");
          }}
          placeholder="Add a new task"
        />
        <button className="primary-button" type="submit">
          Add
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button
              className="danger-button"
              onClick={() => deleteTodo(todo.id)}
              aria-label={"Delete " + todo.text}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p className="empty-state">No todo items.</p>}
    </div>
  );
}

function ColorSwitcher() {
  const [color, setColor] = useState("#3b82f6");
  const colors = [
    { label: "Blue", value: "#3b82f6" },
    { label: "Red", value: "#ef4444" },
    { label: "Green", value: "#22c55e" },
    { label: "Yellow", value: "#eab308" },
    { label: "Purple", value: "#8b5cf6" },
  ];

  return (
    <div className="color-switcher">
      <label htmlFor="color-select">Choose a color</label>
      <select
        id="color-select"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      >
        {colors.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="color-preview" style={{ backgroundColor: color }}>
        <span>{color}</span>
      </div>
    </div>
  );
}

function SearchFilter() {
  const [query, setQuery] = useState("");
  const filteredItems = searchItems.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="search-app">
      <div className="search-field">
        <span aria-hidden="true">⌕</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search technologies..."
          aria-label="Search technologies"
        />
      </div>
      <p className="result-count">
        {filteredItems.length} of {searchItems.length} items
      </p>
      <ul className="filter-list">
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {filteredItems.length === 0 && (
        <p className="empty-state">No matching item found.</p>
      )}
    </div>
  );
}

function DragAndDropList() {
  const [items, setItems] = useState(initialDragItems);
  const [draggingItem, setDraggingItem] = useState(null);

  const moveItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= items.length) {
      return;
    }

    setItems((current) => {
      const reordered = [...current];
      const [movedItem] = reordered.splice(fromIndex, 1);
      reordered.splice(toIndex, 0, movedItem);
      return reordered;
    });
  };

  const handleDragStart = (event, index) => {
    setDraggingItem(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (event, targetIndex) => {
    event.preventDefault();
    if (draggingItem === null || draggingItem === targetIndex) return;
    moveItem(draggingItem, targetIndex);
    setDraggingItem(targetIndex);
  };

  const handleDragEnd = () => setDraggingItem(null);

  return (
    <div className="drag-list-wrapper">
      <p className="drag-instruction">Drag a row or use the arrow buttons.</p>
      <ol className="drag-list">
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDragEnd={handleDragEnd}
            className={draggingItem === index ? "dragging" : ""}
          >
            <span className="drag-handle" aria-hidden="true">⋮⋮</span>
            <span className="drag-text">{item}</span>
            <div className="order-buttons">
              <button
                onClick={() => moveItem(index, index - 1)}
                disabled={index === 0}
                aria-label={"Move " + item + " up"}
              >
                ↑
              </button>
              <button
                onClick={() => moveItem(index, index + 1)}
                disabled={index === items.length - 1}
                aria-label={"Move " + item + " down"}
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">FER202 · REACT HOOKS</p>
          <h1>Exercise 12: useState</h1>
          <p className="hero-copy">
            Seven interactive examples that manage component state and update
            the interface immediately.
          </p>
        </div>
        <div className="hook-badge">useState()</div>
      </header>

      <div className="exercise-grid">
        <Section
          number="01"
          title="Simple Counter"
          description="Increment the current number by one."
        >
          <Counter />
        </Section>
        <Section
          number="02"
          title="Controlled Input"
          description="Display input text in real-time."
        >
          <ControlledInput />
        </Section>
        <Section
          number="03"
          title="Toggle Visibility"
          description="Show or hide a piece of text."
        >
          <ToggleVisibility />
        </Section>
        <Section
          number="04"
          title="Color Switcher"
          description="Change the preview background from a dropdown."
        >
          <ColorSwitcher />
        </Section>
        <Section
          number="05"
          title="Todo List"
          description="Add, complete and delete todo items."
          wide
        >
          <TodoList />
        </Section>
        <Section
          number="06"
          title="Search Filter"
          description="Filter a list using a search query."
        >
          <SearchFilter />
        </Section>
        <Section
          number="07"
          title="Drag and Drop List"
          description="Reorder the list with drag events."
        >
          <DragAndDropList />
        </Section>
      </div>
    </main>
  );
}

