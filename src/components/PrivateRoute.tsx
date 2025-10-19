// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// ************* LƯU Ý QUAN TRỌNG *************
// Hàm này là ví dụ mẫu. Bạn cần thay thế bằng custom hook/logic lấy user (bao gồm role) 
// trong hệ thống Authentication thực tế của bạn.
const useAuth = () => {
  // Lấy user object từ localStorage (nơi json-server-auth thường lưu)
  const loggedInUser = localStorage.getItem('user');

  if (loggedInUser) {
    try {
      const userData = JSON.parse(loggedInUser);
      return {
        isLoggedIn: true,
        // Giả sử role được lưu trong user object. Mặc định là 'user' nếu không có.
        role: userData.role || 'user', 
      };
    } catch (e) {
      console.error("Lỗi parse user data:", e);
      return { isLoggedIn: false, role: null };
    }
  }

  return { isLoggedIn: false, role: null };
};
// *******************************************

interface PrivateRouteProps {
  // component cần bảo vệ, ví dụ: <AdminLayout />
  element: React.ReactElement; 
  // danh sách role được phép truy cập
  allowedRoles: string[]; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    // 1. Chưa đăng nhập: Chuyển hướng về trang chủ
    toast.error("Vui lòng đăng nhập để truy cập trang này.");
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || '')) {
    // 2. Đã đăng nhập nhưng không có quyền: Báo lỗi và chuyển hướng về trang chủ
    toast.error("Bạn không có quyền truy cập khu vực Admin.");
    return <Navigate to="/" replace />;
  }

  // 3. Đã đăng nhập và có quyền: Render component
  return element;
};

export default PrivateRoute;