import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function AdminGuard() {
  const { user, isLoading } = useAuth();

  // Đang tải, có thể hiện thị một spinner (hoặc null)
  if (isLoading) {
    return <div className="text-center my-5">Đang tải...</div>; 
  }

  // 1. Kiểm tra đăng nhập (Authentication)
  if (!user) {
    toast.error('Bạn cần đăng nhập để truy cập trang này.');
    return <Navigate to="/login" replace />;
  }

  // 2. Kiểm tra vai trò (Authorization)
  if (user.role !== 'admin') {
    toast.error('Bạn không có quyền truy cập khu vực Admin.');
    return <Navigate to="/" replace />; 
  }

  // Đã đăng nhập và là admin -> Cho phép vào
  return <Outlet />;
}

export default AdminGuard;