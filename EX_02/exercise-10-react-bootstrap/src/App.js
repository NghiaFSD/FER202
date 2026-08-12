import { useState } from "react";
import CarouselComponent from "./components/CarouselComponent";
import MenuSection from "./components/MenuSection";
import NavbarComponent from "./components/NavbarComponent";
import ReservationForm from "./components/ReservationForm";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="pizza-page">
      <NavbarComponent
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <CarouselComponent />
      <MenuSection searchTerm={searchTerm} />
      <ReservationForm />
    </main>
  );
}

export default App;
