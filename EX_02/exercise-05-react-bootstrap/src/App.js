import { useState } from "react";
import ExerciseGrid from "./components/ExerciseGrid";
import ExerciseLogos from "./components/ExerciseLogos";
import ExerciseNavGrid from "./components/ExerciseNavGrid";
import ExerciseSimpleSite from "./components/ExerciseSimpleSite";
import ExerciseStudents from "./components/ExerciseStudents";

const exercises = [
  { id: 1, title: "Grid", component: ExerciseGrid },
  { id: 2, title: "Logos", component: ExerciseLogos },
  { id: 3, title: "Nav and Grid", component: ExerciseNavGrid },
  { id: 4, title: "Simple Site", component: ExerciseSimpleSite },
  { id: 5, title: "Students", component: ExerciseStudents }
];

function App() {
  const [activeExercise, setActiveExercise] = useState(1);
  const CurrentExercise = exercises.find(
    (exercise) => exercise.id === activeExercise
  ).component;

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Exercise 5 - React + Bootstrap</span>
        </div>
      </nav>

      <div className="container py-4">
        <div className="d-flex flex-wrap gap-2 mb-4">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              type="button"
              className={`btn ${
                activeExercise === exercise.id
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setActiveExercise(exercise.id)}
            >
              {exercise.id}. {exercise.title}
            </button>
          ))}
        </div>

        <CurrentExercise />
      </div>
    </>
  );
}

export default App;
