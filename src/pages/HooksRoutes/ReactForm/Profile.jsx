// rfc
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApiProfile } from "../../../redux/reducers/userReducer";

// moment
import moment from "moment";

export default function Profile(props) {
  const { userLogin } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  console.log(userLogin);
  useEffect(() => {
    const action = getApiProfile();

    dispatch(action);
  }, []);

  // ? Optional changing
  // ordersHistory = undefine.map????
  const renderOrderHistory = () => {
    return userLogin.ordersHistory?.map((order, index) => {
      return (
        <div className="orderDetai" key={index}>
          <h3>
            Order Detail {moment(order.date).format("DD/MM/YYYY hh:mm:ss A")}
          </h3>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Img</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetail.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.image} alt="" width={50} />
                    </td>
                    <td>{item.price}$</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };
  return (
    <div className="container">
      <h3>Profile</h3>
      <div className="d-flex">
        <div className="w-25">
          <div className="profile mt-3">
            <img src={userLogin.avatar} height={200} />
            <div> Email : {userLogin.email}</div>
            <div> Name : {userLogin.name}</div>
          </div>
        </div>
        <div className="w-75">
          <h3>Thông Tin Đơn Hàng</h3>
          <div className="row">{renderOrderHistory()}</div>
        </div>
      </div>
    </div>
  );
}

// useNavigate

// Sau khi đăng nhập thành công
