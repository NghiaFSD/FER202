const logos = [
  { name: "HTML", text: "5", className: "html-logo" },
  { name: "CSS", text: "3", className: "css-logo" },
  { name: "Bootstrap", text: "B", className: "bootstrap-logo" }
];

function ExerciseLogos() {
  return (
    <main className="text-center">
      <div className="p-5 mb-4 bg-body-secondary rounded">
        <h1>My First Bootstrap Page</h1>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className={`simple-logo ${logo.className}`}
            title={logo.name}
          >
            {logo.text}
          </div>
        ))}
      </div>
    </main>
  );
}

export default ExerciseLogos;
