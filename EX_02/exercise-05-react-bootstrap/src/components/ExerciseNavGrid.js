import { useState } from "react";
import DemoGrid from "./DemoGrid";

function ExerciseNavGrid() {
  const [activeLink, setActiveLink] = useState("Active");
  const links = ["Active", "Link 1", "Link 2"];

  return (
    <main>
      <div className="p-5 mb-3 bg-body-secondary rounded">
        <h1>Let's test the grid!</h1>
      </div>

      <ul className="nav nav-pills mb-4">
        {links.map((link) => (
          <li className="nav-item" key={link}>
            <button
              type="button"
              className={`nav-link ${activeLink === link ? "active" : ""}`}
              onClick={() => setActiveLink(link)}
            >
              {link}
            </button>
          </li>
        ))}
        <li className="nav-item">
          <span className="nav-link disabled">Disabled</span>
        </li>
      </ul>

      <DemoGrid />
      <footer className="text-center fs-3 bg-secondary-subtle mt-4">
        Created by ABC!
      </footer>
    </main>
  );
}

export default ExerciseNavGrid;
