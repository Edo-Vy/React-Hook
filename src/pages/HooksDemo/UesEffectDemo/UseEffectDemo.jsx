// rfc
import React, { useEffect, useState } from "react";
// call api
import axios from "axios";

/**
 *  ? Khai báo bên ngoài :
 * Vì khi khai báo biến bên trong thì mỗi lần setState sẽ gọi lại nguyên hàm export -> hết,
 * trừ những cái hook thôi, cho nên những biến const sẽ tự tạo lại
 * => tạo bên ngoài để quản lý setInterval
 * Khi render lại sẽ ko tạo lại timeout -> setInterval nữa
 * => timeout mới lưu giữ được giá trị của setTimeOut
 */
let timeout = {};
export default function UseEffectDemo() {
  const [arrProduct, setArrproduct] = useState([]);
  const [count, setCount] = useState(60);

  const getApi = () => {
    let promise = axios({
      url: "https://shop.cyberlearn.vn/api/Product",
      method: "GET",
    });

    promise.then((result) => {
      //   console.log("Kết Quả :", result.data.content);
      setArrproduct(result.data.content);
    });
    promise.catch((err) => {
      console.log(err);
    });
  };

  const renderProduct = () => {
    console.log(arrProduct); // chạy 2 lần  : lần 1 :[] : lần 2: chạy vô  useEffect render ra dữ liệu
    return arrProduct.map((item, index) => {
      return (
        <div className="col-4 my-3" key={index}>
          <div className="card">
            <img src={item.image} alt="" className="w-100" />
          </div>
          <div
            className="card-body bg-dark text-white"
            style={{ height: "200px" }}
          >
            <h3>{item.name}</h3>
            <p>{item.price}$</p>
            <div className="card-des">
              <button className="btn btn-success">Add to cart</button>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(()=>{

    /** Callback function này sẽ chạy 1 lần đầu tiên và  các lần sau thì phụ thuộc vào dependency
     * thứ 2 của hàm useEffect ( Giống DidUpDate)
     * Khi nào count thay đổi thì mới chạy hàm callback này tiếp, còn state khác thay đổi thì hàm này
     * không chạy nhé!
     * ? Ý nghĩa của hàm dependency thứ 2 là gì ?
     * --? Khi mà giá trị dependency thứ 2 mà thay đổi thì cái hàm đó sẽ kích hoạt
     */
  },[count]);

  // lifecycle - useEffect là lệnh gọi hàm, ko phải là khai báo hàm, tự chạy hàm bên trong nó
  useEffect(() => {
    // Chạy 1 lần sau khi render ( ~ hệt componentDidMount bên class component )

    getApi();

  timeout =  setInterval(() => { // setInterval
      setCount((count) => { // Cách 2: dùng hàm
        return count - 1;
      });
      console.log('123');
    }, 1000);

    return () =>{
        /**
         *  function return trong useEffect sẽ được kích hoạt trước khi component này mất khỏi giao diện 
         * giống như componentWillUnMount bên react class
         */

        clearInterval(timeout); // ko cần chạy ngầm khi chuyển link
    }
  }, []); // chạy 1 lần []

  return (
    <div className="container">
      <h3 style={{ color: "red" }}>UseEffectDemo</h3>
      <div className="mx-3">
        <h4>ComponentDidMount</h4>
        <p>Sử dụng cho việc load 1 lần sau render, thường dùng để call api</p>
      </div>
      <div className="mx-3">
        <h4>ComponentWillUnMount</h4>
        <p>Count : {count}</p>
      </div>
      <hr />
      <div className="shoes_shop mt-3">
        <h3>Shoes Shop</h3>
        <div className="row">{renderProduct()}</div>
      </div>
    </div>
  );
}
