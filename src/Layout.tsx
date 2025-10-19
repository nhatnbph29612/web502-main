// src/Layout.tsx
import { Link, Outlet } from "react-router-dom";
import { useAuth } from './context/AuthContext'; // Bổ sung

function Layout() {
  const { user, logout } = useAuth(); // Gọi hook

  // Hàm xử lý đăng xuất an toàn (nếu cần điều hướng rõ ràng, nhưng AuthContext đã xử lý)
  const handleLogout = (e: React.MouseEvent) => {
      e.preventDefault();
      logout(); // Hàm logout trong Context đã được thiết lập để điều hướng
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-mobile-alt me-2"></i>PhoneStore
          </Link>
          {/* ... (Phần Toggler giữ nguyên) ... */}
          
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* ... (Các liên kết chính: Trang chủ, Admin) ... */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home me-1"></i>Trang chủ
                </Link>
              </li>
              {user && user.role === 'admin' && ( // Chỉ hiện link Admin nếu user là admin
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

            {/* BỔ SUNG: Login/Register/Logout trên Navbar */}
            <ul className="navbar-nav">
              {user ? (
                // Đã đăng nhập: Hiện nút Đăng xuất
                <li className="nav-item">
                  <span className="nav-link text-warning me-2">
                    {user.email.split('@')[0]}
                  </span>
                  <button 
                    className="btn btn-outline-light" 
                    onClick={handleLogout} // <-- Gắn hàm đăng xuất
                  >
                    <i className="fas fa-sign-out-alt me-1"></i>Đăng xuất
                  </button>
                </li>
              ) : (
                // Chưa đăng nhập: Hiện nút Đăng nhập
                <li className="nav-item">
                  <Link className="btn btn-outline-light me-2" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>Đăng nhập
                  </Link>
                  <Link className="btn btn-warning" to="/register">
                    <i className="fas fa-user-plus me-1"></i>Đăng ký
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content và Footer (Giữ nguyên) */}
      <Outlet />
      <footer className="bg-dark text-light mt-5 py-4">
        <div className="container">
          <p className="text-center mb-0">Nguyễn Nhật - WEB502</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;