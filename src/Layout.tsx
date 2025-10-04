import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-mobile-alt me-2"></i>PhoneStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home me-1"></i>Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  <i className="fas fa-newspaper me-1"></i>Tin tức
                </Link>
              </li>
            </ul>
            {/* Search Box */}
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                style={{ width: '300px' }}
              />
              <button className="btn btn-outline-light" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-dark text-light mt-5 py-4">
        <div className="container">
          <p className="text-center mb-0">Nguyễn Nhật - WEB502</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
