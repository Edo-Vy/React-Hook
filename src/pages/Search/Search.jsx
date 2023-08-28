//rfc
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

let timeout = null;
export default function Search(props) {
  const [arrProduct, setArrProduct] = useState([]);
  // searchParams : giá trị ban đầu, có thể chấm được nhiều giá trị, chứ không phải 1 giá trị ~ params ,
  // setSearchParams : gán
  const [searchParams, setSearchParams] = useSearchParams(); // TH1

  const [keyword, setKeyWord] = useState(searchParams.get("q")); // navigate(`/search?q=${keyword}`);

  const getApiProductByKeyword = async () => {
    // call api
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
        method: "GET",
      });
      setArrProduct(result.data.content);
    } catch (erro) {
      console.log(erro);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // chặn cơ chế browser reload
    // Gọi api thực thi ( khi bấm nút search)
    getApiProductByKeyword();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setKeyWord(value);
    // khi người dùng gõ phím setKeyWord
  };

  useEffect(() => {
    /**
     *  Khi người dùng thay đổi state thì nó cũng setKeyWord hoặc thay đổi keyword cũng setKeyWord lại
     */
    setKeyWord(searchParams.get("q")); // TH1
    getApiProductByKeyword();
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  }, [searchParams.get("q")]); // TH1

  useEffect(() => {
    // TH2
    // Nếu state thay đổi thì link params (?q) trên url thay đổi theo
    // setSearchParams : là hàm bất đồng bộ cho nên nó set và sau đó  gọi api là chuyện bình thường,
    // ko thấy độ trễ nhiều lắm còn nếu kĩ có thể để asyn...await
    timeout = setTimeout(() => {
      setSearchParams({
        q: keyword, // q : tên url  - keyword : state  // navigate(`/search?q=${keyword}`);
      });
      // Vừa search vừa gọi api
      getApiProductByKeyword();
    }, 1000); // đợi 1s mới setState chứ ko set liền - tới ưu per
  }, [keyword]);
  return (
    <form className="container" onSubmit={handleSubmit}>
      <h3>Search</h3>
      <div className="form-group">
        <p>Nhập từ khoá</p>
        <div className="input-group-prepend">
          <input
            className="form-control"
            id="keyword"
            onChange={handleChange}
            value={keyword} // navigate(`/search?q=${keyword}`); //TH1
          />
          <button className="btn bg-dark text-white mt-3">Search</button>
        </div>
      </div>
      <div className="mt-2">
        <p>Kết quả tìm kiếm</p>
        <div className="row">
          {arrProduct.map((item, index) => {
            return (
              <div className="col-4" key={index}>
                <div className="card">
                  <img src={item.image} alt={"..."} />
                </div>
                <div className="card-body bg-dark text-light">
                  <p>{item.name}</p>
                  <p>{item.price}$</p>
                  <button className="btn btn-success">View detail</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}

/**
 * useSearchParams
 */

// Header onSubmit -> chuyển qua Search

/**
 *  Th1 : lấy dữ  liệu thanh search ( Header) truyền qua thanh search của form ( Search.jsx)
 * Th2 : nhập liệu input search ( Search.jsx ) -> url (http://localhost:3000/search?q= ) thay đổi theo,
 * state thay đổi (keyword) -> setSearchParams => để xét được url không dùng state được, state chỉ xét được
 * ở dưới component => useEffect
 */
