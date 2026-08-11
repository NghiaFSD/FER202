function ExerciseSimpleSite() {
  return (
    <div className="simple-site border rounded overflow-hidden">
      <header className="bg-warning py-4 text-center">
        <div className="fpt-logo">
          FPT EDUCATION
          <br />
          FPT UNIVERSITY
        </div>
        <nav className="mt-3">
          <a className="text-white text-decoration-none mx-2" href="#home">
            Home
          </a>
          <a className="text-white text-decoration-none mx-2" href="#about">
            About
          </a>
          <a className="text-white text-decoration-none mx-2" href="#contact">
            Contact
          </a>
        </nav>
      </header>

      <main id="home" className="text-center py-5">
        <section id="about" className="mb-5">
          <h2>About</h2>
          <p>This is the about section of the website.</p>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <p>For any inquiries, please contact us at example@example.com.</p>
        </section>
      </main>

      <footer className="bg-warning-subtle text-center py-4">
        © 2026 Website. All rights reserved.
      </footer>
    </div>
  );
}

export default ExerciseSimpleSite;
