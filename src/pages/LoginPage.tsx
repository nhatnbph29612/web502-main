import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      await login(values);
      navigate('/'); // Chuyển hướng về trang chủ sau khi đăng nhập
    } catch (error) {
      // Lỗi đã được xử lý bằng toast trong AuthContext
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Đăng nhập</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              {...register('email')}
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input
              {...register('password')}
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>
        <div className="mt-3 text-center">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;