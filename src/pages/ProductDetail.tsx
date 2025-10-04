import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import request from '../api/request';
import { IProduct } from './type';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await request.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <p>Không tìm thấy sản phẩm</p>
        <Link to="/" className="btn btn-primary">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Chi tiết sản phẩm
          </li>
        </ol>
      </nav>

      {/* Product Detail */}
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-3">{product.name}</h2>

              <div className="mb-3">
                <span className="badge bg-secondary">{product.brand}</span>
              </div>

              <h3 className="text-primary mb-4">${product.price}</h3>

              <div className="mb-4">
                <h5>Mô tả sản phẩm:</h5>
                <p className="text-muted">{product.description}</p>
              </div>

              <div className="mb-3">
                <h5>Thông tin:</h5>
                <ul className="list-unstyled">
                  <li><strong>Mã sản phẩm:</strong> #{product.id}</li>
                  <li><strong>Thương hiệu:</strong> {product.brand}</li>
                  <li><strong>Tình trạng:</strong> <span className="text-success">Còn hàng</span></li>
                </ul>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg">
                  <i className="fas fa-shopping-cart me-2"></i>Thêm vào giỏ hàng
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fas fa-heart me-2"></i>Yêu thích
                </button>
              </div>

              <div className="mt-4">
                <Link to="/" className="btn btn-outline-secondary">
                  <i className="fas fa-arrow-left me-2"></i>Quay lại danh sách
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Thông tin chi tiết</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5>Đặc điểm nổi bật:</h5>
                  <ul>
                    <li>Chip A17 Pro mạnh mẽ</li>
                    <li>Camera 48MP chuyên nghiệp</li>
                    <li>Màn hình Super Retina XDR 6.7 inch</li>
                    <li>Khung titan cao cấp</li>
                    <li>Pin sử dụng cả ngày</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Chính sách:</h5>
                  <ul>
                    <li><i className="fas fa-check text-success me-2"></i>Bảo hành 12 tháng</li>
                    <li><i className="fas fa-check text-success me-2"></i>Đổi trả trong 7 ngày</li>
                    <li><i className="fas fa-check text-success me-2"></i>Miễn phí vận chuyển</li>
                    <li><i className="fas fa-check text-success me-2"></i>Hỗ trợ trả góp 0%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;