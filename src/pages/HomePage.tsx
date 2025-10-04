import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import request from '../api/request';
import { IProduct } from './type';


//State quản lý dữ liệu động của trang, bao gồm danh sách sản phẩm, điều hướng trang, và tìm kiếm.
const HomePage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const limit = 8;

  const [activeSearch, setActiveSearch] = useState<string>('');


  // Hàm fetchData để lấy danh sách sản phẩm từ API.
  const fetchData = async (page: number, search: string = '') => {
    try {
      let url = `/products?_page=${page}&_limit=${limit}`;
      if (search) {
        url += `&name_like=${search}`;
      }

      const {data, headers} = await request.get(url)
      setProducts(data)

      const totalCount = headers['x-total-count'];
      if (totalCount) {
        setTotalPages(Math.ceil(totalCount / limit));
      }
    } catch (error) {
      console.log(error)
    }
  }
  // hàm useEffect: Tự động tải dữ liệu khi người dùng chuyển trang hoặc tìm kiếm
  useEffect(() => {
    fetchData(currentPage, activeSearch);
  }, [currentPage, activeSearch])

  //Chuyển đổi trang bằng cách cập nhật currentPage.
  //Scroll mượt mà lên đầu trang để người dùng dễ theo dõi.
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  //Ngăn form reload trang (e.preventDefault()).
  //Reset trang về 1 và áp dụng searchTerm vào activeSearch để kích hoạt tìm kiếm.
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchTerm);
  }


  //Xóa từ khóa tìm kiếm (searchTerm, activeSearch) và reset trang về 1.
  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveSearch('');
    setCurrentPage(1);
  }

  return (
    <div>
      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Danh sách sản phẩm</h2>
          </div>
        </div>

        {/* Search Box */}
        <div className="row mb-4">
          <div className="col-12">
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm theo tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary text-nowrap">
                <i className="fas fa-search"></i> Tìm kiếm
              </button>
              {activeSearch && (
                <button type="button" className="btn btn-secondary text-nowrap" onClick={handleClearSearch}>
                  <i className="fas fa-times"></i> Xóa
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Search Results Info */}
        {activeSearch && (
          <div className="row mb-3">
            <div className="col-12">
              <div className="alert alert-info">
                Kết quả tìm kiếm cho: <strong>"{activeSearch}"</strong>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="row">
          {products.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted">Không có sản phẩm nào</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text flex-grow-1">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <p className="text-muted mb-1">{product.brand}</p>
                      <h5 className="text-primary">${product.price}</h5>
                      <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm w-100">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="row mt-4">
            <div className="col-12">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Trước
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Sau
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;