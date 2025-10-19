// src/pages/Add.tsx

import toast from "react-hot-toast";
import { ProductForm, ProductFormData } from "../components/ProductForm";
import request from "../api/request";

function Add() {
  const onSubmit = async (values: ProductFormData) => {
    try {
      // Sử dụng request instance đã tối ưu
      await request.post("/products", values);
      toast.success("Thêm sản phẩm thành công!");
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại.");
    }
  };

  return (
    <div>
      <h1>Thêm mới sản phẩm</h1>
      <ProductForm onSubmit={onSubmit} buttonLabel="Thêm mới" />
    </div>
  );
}

export default Add;