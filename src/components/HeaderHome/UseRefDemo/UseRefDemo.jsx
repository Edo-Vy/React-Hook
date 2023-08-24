// rfc
import React, { useRef, useState } from "react";

export default function UseRefDemo() {
  const [useNumber, setNumber] = useState(1);
  console.log(useNumber);
  //   const [userLogin, setUserLogin] = useState({ username: "", password: "" });  // cách 1
  //   console.log(userLogin);// chỉ lấy được 1 thuộc tính nên phải clone ra -- cách 1

  //   let userLogin = { username: "", password: "" }; // cách 2: nhưng có nhiều useSate khác nữa sẽ ko dùng đk
  const useLoginRef = useRef({ username: "", password: "" });

  const handleChaneInput = (e) => {
    const { id, value } = e.target;

    // const { id, value } = e.target; // cách 1
    // setUserLogin({
    //     ...userLogin, // clone để ko bị đè => lấy đk dữ liệu username + password - Cách 1
    //   [id]: value,
    // });

    // const { id, value } = e.target; // Cách 2
    // userLogin[id] = value;  // Cách 2
    // console.log(userLogin);

    useLoginRef.current[id] = value;
    console.log("useRef", useLoginRef.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // chặn sự kiện reload browser

    // console.log(userLogin);
    console.log("useRef", useLoginRef.current);
  };
  return (
    <div className="container">
      <h2>Demo UseRef</h2>
      <div className="number">
        <p>Number : {useNumber}</p>
        <button
          className="btn btn-success"
          onClick={() => {
            setNumber(useNumber + 1);
          }}
        >
          +
        </button>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="form-group">
          <p>username</p>
          <input
            className="form-control"
            id="username"
            onChange={handleChaneInput}
          />
        </div>
        <div className="form-group">
          <p>password</p>
          <input
            className="form-control"
            id="password"
            type="password"
            onChange={handleChaneInput}
          />
        </div>
        <div className="form-group mt-3">
          <button className="btn btn-success" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}


/**
 * useRef : Tương tự useState tuy nhiên khi thay đổi giá trị useRef component không render lại
 * (useRef dùng để lưu giá trị sau mỗi lần render)
 * useref thường sủ dụng cho các form không có Validation hoặc load dữ liệu chỉnh sửa
 */