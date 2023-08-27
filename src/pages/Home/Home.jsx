// rfc
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Home(props) {
  const [arrProduct, setArrProduct] = useState([]);

  const getApiProduct = async () => {
    try {
      // bắt lỗi
      let result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      console.log("Kết Quả", result.data.content);

      // Sau khi lấy kết quả từ api về đưa vào state arrProduct
      setArrProduct(result.data.content);
    } catch (erro) {
      console.log(erro);
    }
  };
  // render ra giao diện

  const renderProduct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="col-3 mt-3"  key={index}>
          <div className="card">
            <div className="card-img">
              <img src={item.image} alt="" className="w-100" />
            </div>
            <div className="card-body bg-dark text-light" >
              <h4 style={{height:75}}>{item.name}</h4>
              <p>{item.price}$</p>
              <div className="card-des">
                {/* <button className="btn btn-success">View detail</button> */}
                <NavLink to = {`/detail/${item.id}`} className ="btn btn-success">View Detail</NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    // ~ componentDidMount
    // Sau khi giao diện load xong thì gọi api, ko cần bấm vô đâu
    getApiProduct();
  }, []);

  return (
    <div className="container mt-2">
      <h3>Shoes App</h3>
      <p>(useParams)</p>
      <div className="row">
          {/* render */}
          {renderProduct()}
      </div>
    </div>
  );
}

/**
 *  Use Params
 *
 * ? khi nào nên sử dụng Promise, khi nào sử dụng asyn..await
 */
