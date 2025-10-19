// src/pages/Edit.tsx
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ProductForm, ProductFormData } from "../components/ProductForm";
import { useFetch } from "../hooks/useFetch";
import { IProduct } from "./type";
import request from "../api/request";

function Edit() {
  const { id } = useParams();

  // 1. Tải dữ liệu cũ bằng useFetch
  const { data: product, loading, error } = useFetch<IProduct>(id ? `/products/${id}` : ''); 

  const onSubmit = async (values: ProductFormData) => {
    if (!id) return;
    try {
      // Sử dụng request instance đã tối ưu
      await request.put("/products/" + id, values);
      toast.success("Cập nhật sản phẩm thành công!");
    } catch (error) {
      toast.error("Cập nhật sản phẩm thất bại.");
    }
  };

  if (!id) {
    return <div className="text-danger">ID sản phẩm không hợp lệ.</div>;
  }

  if (loading) {
    return <div>Đang tải dữ liệu sản phẩm cũ...</div>;
  }

  if (error || !product) {
    return <div className="text-danger">Lỗi tải dữ liệu hoặc không tìm thấy sản phẩm.</div>;
  }
  
  // Ánh xạ dữ liệu IProduct (có id, description) sang ProductFormData (chỉ chứa các trường form)
  const initialData: ProductFormData = {
      name: product.name,
      image: product.image,
      price: product.price,
      brand: product.brand,
      category: (product as any).category || 'Mobile', // Giả định category có thể bị thiếu trong db cũ
  };

  return (
    <div>
      <h1>Cập nhật sản phẩm: {product.name}</h1>
      <ProductForm 
        initialData={initialData} 
        onSubmit={onSubmit} 
        buttonLabel="Cập nhật" 
      />
    </div>
  );
}

export default Edit;