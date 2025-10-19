import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { IUser } from '../pages/type';
import axios from 'axios';
import toast from 'react-hot-toast';

// Giả định API_URL là nơi json-server-auth đang chạy
const API_URL = 'http://localhost:3000'; 

interface IAuthContext {
  user: IUser | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Khôi phục trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        // Thiết lập token cho axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;
      } catch (e) {
        console.error("Lỗi parse user từ localStorage:", e);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      
      // json-server-auth trả về { accessToken, user: { id, email, role } }
      const { accessToken, user: userDataFromApi } = response.data;
      
      const userFullData = { 
        // Đảm bảo sao chép tất cả thuộc tính, đặc biệt là 'role'
        ...userDataFromApi, // <-- ĐÂY LÀ ĐIỂM CHỦ CHỐT (chứa id, email, role)
        accessToken: accessToken, 
      };
      
      // SỬA LỖI: Kiểm tra lại việc lưu trữ
      console.log('User logged in with role:', userDataFromApi.role); 

      localStorage.setItem('user', JSON.stringify(userFullData));
      setUser(userFullData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      toast.error('Đăng nhập thất bại. Kiểm tra email và mật khẩu.');
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      // Gán vai trò mặc định là 'member' khi đăng ký
      const response = await axios.post(`${API_URL}/register`, {
        ...data,
        role: 'member', 
      });
      
      const { accessToken, user: userDataFromApi } = response.data;
      const userFullData = { 
        ...userDataFromApi, 
        accessToken: accessToken,
      };

      localStorage.setItem('user', JSON.stringify(userFullData));
      setUser(userFullData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      toast.success('Đăng ký thành công!');
    } catch (error) {
      toast.error('Đăng ký thất bại. Email có thể đã tồn tại.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Đã đăng xuất!');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};