import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import Layout from './Layout' 
import AdminLayout from './layouts/AdminLayout'
import List from './pages/List'
import Add from './pages/Add'
import Edit from './pages/Edit'
import { AuthProvider } from './context/AuthContext' // Bổ sung
import LoginPage from './pages/LoginPage' // Bổ sung
import RegisterPage from './pages/RegisterPage' // Bổ sung
import AdminGuard from './components/AdminGuard' // Bổ sung
import Users from './components/User'

function App() {
  return (
    <AuthProvider> {/* Bọc toàn bộ ứng dụng bằng AuthProvider */}
      <Routes>
        {/* Client Layout - Dành cho các trang công khai */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="login" element={<LoginPage />} /> 
          <Route path="register" element={<RegisterPage />} /> 
        </Route>

        {/* Admin Routes - Được bảo vệ */}
        {/* AdminGuard sẽ thực hiện kiểm tra quyền trước khi vào */}
        <Route path="/admin" element={<AdminGuard />}>
    {/* AdminLayout sẽ là component chính chứa Sidebar và Outlet */}
    <Route element={<AdminLayout />}> 
        <Route index element={<List />} /> {/* Thêm index nếu muốn /admin hiển thị List */}
        <Route path="list" element={<List />} />
        <Route path="add" element={<Add />} />
        <Route path="edit/:id" element={<Edit />} />
    </Route>
</Route>
      </Routes>
      <Toaster/>
    </AuthProvider>
  )
}

export default App