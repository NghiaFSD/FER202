function SimpleWebsite() {
  return (
    <div className="border">
      <header className="website-header">
        <div className="website-logo">FPT EDUCATION<br />FPT UNIVERSITY</div>
        <nav className="mt-3">Home &nbsp; About &nbsp; Contact</nav>
      </header>

      <div className="website-content">
        <h3>About</h3>
        <p>This is the about section of the website.</p>
        <h3>Contact</h3>
        <p>For any inquiries, please contact us at example@example.com.</p>
      </div>

      <footer className="website-footer">&copy; 2023 Website. All rights reserved.</footer>
    </div>
  );
}

export default SimpleWebsite;
