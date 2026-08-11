import Counter from "./components/Counter";
import HelloWorld from "./components/HelloWorld";
import Introduction from "./components/Introduction";
import SimpleCard from "./components/SimpleCard";
import SimpleWebsite from "./components/SimpleWebsite";

const cardItem = {
  title: "A Title",
  description: "The description goes here.",
  imageUrl: "IMG"
};

function App() {
  return (
    <main className="container py-4">
      <h1 className="text-center mb-4">Exercise 9: React Components</h1>

      <section className="exercise-section">
        <h2>1. Introduction Component</h2>
        <Introduction name="Le Trong Nghia" studentId="HE190817" />
      </section>

      <section className="exercise-section">
        <h2>2. Hello World Component</h2>
        <HelloWorld />
      </section>

      <section className="exercise-section">
        <h2>3. Counter Application</h2>
        <Counter />
      </section>

      <section className="exercise-section">
        <h2>4. Simple Card</h2>
        <SimpleCard item={cardItem} />
      </section>

      <section className="exercise-section">
        <h2>5. Simple Website</h2>
        <SimpleWebsite />
      </section>
    </main>
  );
}

export default App;
