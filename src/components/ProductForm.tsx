// src/components/ProductForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react';

// Tạo schema validation chung
export const productSchema = z.object({
  name: z.string().min(10, "Tên sản phẩm phải có tối thiểu 10 ký tự."),
  image: z.string().url("Hình ảnh phải là một URL hợp lệ.").min(1, "URL hình ảnh không được để trống."),
  price: z.number().min(1, "Giá phải là một số lớn hơn 0."),
  brand: z.string().min(1, "Thương hiệu không được để trống."), // Bổ sung Brand
  category: z.string().min(1, "Danh mục không được để trống."),
});

// Loại bỏ 'id' nếu form này dùng cho Add/Edit. ID sẽ được thêm bởi server hoặc từ URL.
export type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: ProductFormData; // Dữ liệu cũ cho chế độ Edit
  onSubmit: SubmitHandler<ProductFormData>;
  buttonLabel: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, buttonLabel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    // Thiết lập giá trị mặc định cho cả Add và Edit
    defaultValues: initialData || {
      name: "",
      image: "",
      price: 100,
      brand: "Apple",
      category: "Mobile",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input {...register("name")} type="text" className="form-control" id="name" />
        {errors.name && <span className="text-danger">{errors.name.message}</span>}
      </div>

      {/* Image URL */}
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image URL</label>
        <input {...register("image")} type="text" className="form-control" id="image" />
        {errors.image && <span className="text-danger">{errors.image.message}</span>}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
          {...register("price", { valueAsNumber: true })}
          type="number"
          className="form-control"
          id="price"
        />
        {errors.price && <span className="text-danger">{errors.price.message}</span>}
      </div>
      
      {/* Brand (Mới) */}
      <div className="mb-3">
        <label htmlFor="brand" className="form-label">Brand</label>
        <input {...register("brand")} type="text" className="form-control" id="brand" />
        {errors.brand && <span className="text-danger">{errors.brand.message}</span>}
      </div>


      {/* Category */}
      <div className="mb-3">
        <label htmlFor="selectOption" className="form-label">Category</label>
        <select className="form-select" {...register("category")}>
          <option value={"Laptop"}>Laptop</option>
          <option value={"Mobile"}>Mobile</option>
          <option value={"PC"}>PC</option>
        </select>
        {errors.category && <span className="text-danger">{errors.category.message}</span>}
      </div>
      
      {/* Submit Button */}
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Đang xử lý...' : buttonLabel}
      </button>
    </form>
  );
};