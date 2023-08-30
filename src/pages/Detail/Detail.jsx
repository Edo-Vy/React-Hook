// rfc
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getApiProductDetailAction } from "../../redux/reducers/productReducer";

export default function Detail(props) {
  // const [proDetail, setProDetail] = useState({});
  // Lấy từ redux về
  const {proDetail} = useSelector(state => state.productReducer)

  const params = useParams();
  const dispatch = useDispatch();

  // const getApiProductDetail = async () => {
  //   try {
  //     // bắt lỗi
  //     let result = await axios({
  //       url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + params.id,
  //       method: "GET",
  //     });
  //     console.log("Kết Quả", result.data.content);

  //     // Sau khi lấy kết quả từ api về đưa vào state proDetail
  //     setProDetail(result.data.content);
  //     console.log(proDetail);
  //   } catch (erro) {
  //     console.log(erro);
  //   }
  // };
// action
  const getApiProductDetail = () => {
   
    const actionThunk = getApiProductDetailAction(params.id);
    dispatch(actionThunk);
    
  };

  useEffect(() => {
    /**
     *  Chạy 2 trường hợp :
     *    - Lần đầu tiên load page
     *    - Và khi params.id thay đổi thì hàm này sẽ chạy
     */

    getApiProductDetail();
  }, [params.id]); // từ chính nó link lại chính nó
  return (
    <div className="container mt-3">
      <h3>View Detail</h3>
      <div className="row mt-3">
        <div className="col-4">
          <img src={proDetail.image} alt="" className="w-100" />
        </div>
        <div className="col-8">
          <h4>{proDetail.name}</h4>
          <p>{proDetail.description}</p>
          <div className="card-des">
            <button className="btn btn-success">Add to cart</button>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h3>Related Product</h3>
        <div className="row mt-3">
          {/* ? : toán tử optional chaining : Nếu có thuộc tính đó thì mới chấm tiếp phương thức
            hoặc thuộc tính tiếp theo được, không có thì bỏ qua
            Nếu ko có ? : thì sẽ báo lỗi -> lifecycle
         */}
          {proDetail.relatedProducts?.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="card">
                  <div className="card-img">
                    <img src={item.image} alt="" className="w-100" />
                  </div>
                  <div className="card-body bg-dark text-light">
                    <h4 style={{ height: 80 }}>{item.name}</h4>
                    <p>{item.price}$</p>
                    <div className="card-des">
                      <NavLink className="btn btn-success" to={`/detail/${item.id}`}>View Detail</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * useParams : truyền tham số từ link này qua link khác 
 * Id : {params.id}  : id (  path=':id' element={<Detail/>)
 */
