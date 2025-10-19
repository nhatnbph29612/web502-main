import { Link, Outlet } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
function Layout() {
  const { user, logout } = useAuth(); // Bổ sung

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* ... (Phần Brand và Toggler giữ nguyên) ... */}
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
              {/* BỔ SUNG: Chỉ hiện link Admin nếu user là admin */}
              {user && user.role === 'admin' && ( 
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/list">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
            {/* Search Box - Giữ nguyên */}
            <form className="d-flex me-3">
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
            
            {/* BỔ SUNG: Login/Register/Logout */}
            <ul className="navbar-nav">
              {user ? (
                // Đã đăng nhập
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user-circle me-1"></i>
                      {user.email.split('@')[0]} {/* Hiển thị tên người dùng */}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                      <li><a className="dropdown-item" href="#">Thông tin cá nhân</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item" onClick={logout}>
                          <i className="fas fa-sign-out-alt me-1"></i>Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                // Chưa đăng nhập
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="fas fa-sign-in-alt me-1"></i>Đăng nhập
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="fas fa-user-plus me-1"></i>Đăng ký
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {/* Kết thúc Login/Register/Logout */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <Outlet />
      </div>
      
      {/* ... (Phần Footer giữ nguyên) ... */}
      <footer className="bg-dark text-light mt-5 py-4">
        <div className="container">
          <p className="text-center mb-0">Nguyễn Nhật - WEB502</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;