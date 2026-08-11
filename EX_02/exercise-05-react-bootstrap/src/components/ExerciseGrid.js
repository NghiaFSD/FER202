import DemoGrid from "./DemoGrid";

function ExerciseGrid() {
  return (
    <main>
      <div className="p-5 mb-4 bg-body-secondary rounded">
        <h1>Let's test the grid!</h1>
      </div>

      <DemoGrid />
      <footer className="text-center fs-3 bg-secondary-subtle mt-4">
        Created by ABC!
      </footer>
    </main>
  );
}

export default ExerciseGrid;
