function Header({ keyword, onKeywordChange }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <span className="navbar-brand">Navbar</span>
          <div className="navbar-nav me-auto flex-row gap-3">
            <a className="nav-link active" href="#home">
              Home
            </a>
            <a className="nav-link" href="#products">
              Products
            </a>
          </div>
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
          />
        </div>
      </nav>

      <section
        id="home"
        className="hero-placeholder d-flex align-items-center justify-content-center text-secondary"
      >
        <h1 className="display-1">1920 x 530</h1>
      </section>
    </>
  );
}

export default Header;
