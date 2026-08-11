import CarCard from "./components/CarCard";
import { cars } from "./data";

function App() {
  return (
    <main className="container-fluid py-3">
      <h1 className="mb-4">Cards Columns</h1>
      <div className="row g-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </main>
  );
}

export default App;
