// rfc
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApiProductAction, setArrProductAction } from "../../redux/reducers/productReducer";
export default function Home(props) {
  // const [arrProduct, setArrProduct] = useState([]);

  // Gọi api từ config store
  const { arrProduct } = useSelector((state) => state.productReducer); // bóc tách phần tử

  const dispatch = useDispatch();

  // const getApiProduct = async () => {
  //   try {
  //     // bắt lỗi
  //     let result = await axios({
  //       url: "https://shop.cyberlearn.vn/api/Product",
  //       method: "GET",
  //     });
  //     console.log("Kết Quả", result.data.content);

  //     // Sau khi lấy kết quả từ api về đưa vào state arrProduct
  //     // setArrProduct(result.data.content);

  //     // dispatch lên redux   (producteducer.jsx)

  //     const action = setArrProductAction(result.data.content);
  //     /*
  //         action : {
  //             type: 'productReducer/setArrProductAction',
  //             payload : result.data.content
  //         }
  //     */

  //     dispatch(action);
  //   } catch (erro) {
  //     console.log(erro);
  //   }
  // };
  /** Action  có 2 dạng : - Sau khi cái redux-toolkit sẽ có thêm action kiểu 2
   *    - Action dạng 1 :
   *            action : {
   *                          type : ' action_name ',
   *                          payload : data
   *                      }
   *   - Action dạng 2 ( thunk ) :
   *            action = (dispatch2, getState) =>{
   *              // Logic code xử lý ở đây, sau đó có dữ liệu sẽ dùng tham số dispatch2
   *                  để đưa lên redux hoặc thực hiện tiếp 1 logic khác
   *               }
   */
// viết kiểu 2 có thể tách thành file riêng
  const getApiProduct = async () => {
    // const actionLoai2 = async (dispatch2) => { // action loại 2 là hàm chứ không phải object nữa
    //   try {
    //     // bắt lỗi
    //     let result = await axios({
    //       url: "https://shop.cyberlearn.vn/api/Product",
    //       method: "GET",
    //     });
    //     console.log("Kết Quả", result.data.content);
    //     // dispatch lên redux   (producteducer.jsx)
    //     const action = setArrProductAction(result.data.content);
    //     /*
    //         action : {
    //             type: 'productReducer/setArrProductAction',
    //             payload : result.data.content
    //         }
    //     */
    //    // sau khi thực thi có dữ liệu -> dispatch 2 -> đưa lên redux
    //     dispatch2(action); // đưa kết quả lên redux
    //   } catch (erro) {
    //     console.log(erro);
    //   }
    // };

    const actionLoai2 = getApiProductAction; // import ...../redux/reducers/productReducer"

    // dispatch action thunk
    dispatch(actionLoai2);
  };
  // render ra giao diện

  const renderProduct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="col-3 mt-3" key={index}>
          <div className="card">
            <div className="card-img">
              <img src={item.image} alt="" className="w-100" />
            </div>
            <div className="card-body bg-dark text-light">
              <h4 style={{ height: 75 }}>{item.name}</h4>
              <p>{item.price}$</p>
              <div className="card-des">
                {/* <button className="btn btn-success">View detail</button> */}
                <NavLink to={`/detail/${item.id}`} className="btn btn-success">
                  View Detail
                </NavLink>
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
// useDispatch chỉ dùng được trong component funtion, không dùng trong các hàm
