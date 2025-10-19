export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  brand: string;
}

// BỔ SUNG: Interface cho người dùng
export interface IUser {
  id: number;
  email: string;
  // Giả định có trường 'role' để phân biệt admin.
  role?: 'admin' | 'member'; 
  accessToken: string;
}