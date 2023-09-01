// rfc
import React, { useState } from "react";
import DemoChonXe from "./DemoChonXe";

export default function UseStateDemo() {
  const [number, setNumber] = useState(1);

  const [like, setLike] = useState(1);
  console.log(like);

  const handleClick = () => {
    // setNumberlàm 2 nhiệm vụ là thay đổi giá trị number = giá trị mới, và gọi lại function component chạy lại
    setNumber(number + 1);
  };
  return (
    <div className="container mt-2">
      <h3>Number: {number}</h3>
      <button
        className="btn btn-success"
        onClick={() => {
          handleClick();
        }}
      >
        +
      </button>
      <div className="card w-25 mt-2">
        <img src="https://i.pravatar.cc" alt="" />
        <div className="card-body">
          <h3>Name : Minh Minh</h3>
          <p>Age : 18</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              setLike(like + 1);
            }}
          >
            {like} <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
      <hr/>
      <DemoChonXe/>
    </div>
  );
}

/**
 * import {useState} : thư viện này gọi là hook => import React,{useState} from 'react'
 * Hook : hàm do react làm ra thay thế những khái niệm của class => phải có từ khóa khai báo biến
 */
/** == Cách dùng {useState}
 * Truyền cho nó tham số mặc định_useState(1) : khi gọi hàm này sẽ trả về 1 mảng có 2 phần tử
 *
 * + const result = useState(1) ===> thường sẽ ko viết theo cách này
 *      => phần tử thứ nhất là state ban đầu useSate(1)
 *      => phần tử thứ 2 là hàm set lại state đó
 *      Để binding ra - <h3> Number {result[0]}</h3> => lấy ra đk số Number : 1
 * // Dùng hàm bóc tách phần tử
 * +  const [number,setNumber] = useState(1);
 * number : biến đầu tiên, giá trị ban đầu (1)
 * setNumber : hàm, nhận vào 1 giá trị mới (~setState) thay thế giá trị cũ, đồng thời render lại giao diện
 */
