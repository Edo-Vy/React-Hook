//rfc
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

let timeout = null;
export default function Search(props) {
  const [arrProduct, setArrProduct] = useState([]);
  // searchParams : giá trị ban đầu, có thể chấm được nhiều giá trị, chứ không phải 1 giá trị ~ params ,
  // searchParams.get('tên params ') : lấy dữ liệu từ url về
  // setSearchParams : gán, đưa dữ liệu lên url
  const [searchParams, setSearchParams] = useSearchParams(); // TH1

  // const [keyword, setKeyWord] = useState(searchParams.get("q")); // navigate(`/search?q=${keyword}`);

  const getApiProductByKeyword = async () => {
    // call api ( B1 : Kích lần 1)
    // call api (B2: gọi api sau khi load trang)
    try {
      if (searchParams.get("q") !== null) {
        // gõ trên thanh search (Header) trước sẽ ra dữ liệu trước
        const result = await axios({
          url: `https://shop.cyberlearn.vn/api/Product?keyword=${searchParams.get(
            "q"
          )}`,
          method : "GET",
        });
        // B3 : Sau khi lấy api thành công  về -> state thay đổi -> giao diện render lại ( kết thúc lần 1)
        setArrProduct(result.data.content);
        // Lần 2 ( B6)
        console.log(result.data.content);
      }
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
    // const { id, value } = e.target;
    // B4 : khi người dùng gõ phím trên thanh Search  thì lấy ra giá trị value gán vào thanh url
    const { value } = e.target;
    // setKeyWord(value);
    // khi người dùng gõ phím setSearchParams thực thi  => function được render lại để kích useEffect chạy

    setSearchParams({
      // làm thay đổi ?q trên thanh url đồng thời kích useEffect chạy lần 2
      // q: keyword, // q : tên url  - keyword : state  // navigate(`/search?q=${keyword}`);
      q: value, // q : tham số gán trên url  - keyword : state  // navigate(`/search?q=${keyword}`);
    });
  };

  useEffect(() => {
    // search (form)
    /**
     *  Khi người dùng thay đổi state thì nó cũng setKeyWord hoặc thay đổi keyword cũng setKeyWord lại
     */
    // setKeyWord(searchParams.get("q")); // TH1
    // getApiProductByKeyword();
    // Lần 1 (B1 : Khi load trang thì hàm này gọi api 1 lần)
    timeout = setTimeout(() => {
      // lần 2 ( B5) :

      // setSearchParams({
      //   q: keyword, // q : tên url  - keyword : state  // navigate(`/search?q=${keyword}`);
      // });

      // Vừa search vừa gọi api
      getApiProductByKeyword();
    }, 1000); // đợi 1s mới setState chứ ko set liền - tới ưu per

    return () => {
      // B5 : kết quả clear sau khi gọi api
      if (timeout !== null) {
        clearTimeout(timeout); // B7 : clear
      }
    };
  }, [searchParams.get("q")]); // TH1 //  Khi params trên url thay đổi thì hàm này sẽ kích hoạt

  useEffect(() => {
    // TH2
    // Nếu state thay đổi thì link params (?q) trên url thay đổi theo
    // setSearchParams : là hàm bất đồng bộ cho nên nó set và sau đó  gọi api là chuyện bình thường,
    // ko thấy độ trễ nhiều lắm còn nếu kĩ có thể để asyn...await
    // timeout = setTimeout(() => {
    //   // setSearchParams({
    //   //   q: keyword, // q : tên url  - keyword : state  // navigate(`/search?q=${keyword}`);
    //   // });
    //   // Vừa search vừa gọi api
    //   getApiProductByKeyword();
    // }, 1000); // đợi 1s mới setState chứ ko set liền - tới ưu per
    // }, [keyword]);
  }, []);

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
            value={searchParams.get("q")}
            // value={keyword} // navigate(`/search?q=${keyword}`); //TH1
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
                  <NavLink className="btn btn-success" to={`/detail/${item.id}`}>View detail</NavLink>
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

// kỹ thuật debounce search : gõ xong sau 1s thì mới gọi
