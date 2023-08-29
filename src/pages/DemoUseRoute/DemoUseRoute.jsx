// rfc
import React from "react";
import useCookie from "../../hooks/useCookie";
import useRoute from "../../hooks/useRoute";

export default function DemoUseRoute() {
  const {
    navigate,
    params,
    searchPrams: [search, setSearch],
  } = useRoute(); // import useRoute from '../../hooks/useRoute'

  console.log({
    navigate,
    params,
    searchPrams: [search, setSearch],
  });
  // useCookie
  const [setCookie, getCookie] = useCookie('my-cookie', '');
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    console.log(username, password);
    setCookie(username, 30);
  };
  return (
    <div className="container">
      <h3>Demo UseRoute</h3>
      <hr />
      <form className="login-cookie mt-3" onSubmit={handleSubmit}>
        <h3>Login Cookie</h3>
        <div className="form-group">
          <p>Nhập vào username</p>
          <input className="form-control" id="username" />
        </div>
        <div className="form-group mt-2">
          <p>Nhập vào password</p>
          <input className="form-control" id="password" type={"password"} />
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
 *  Nguyên tắc dùng useRoute
 * - Đặt chữ use__ đầu tiên ( useRoute )
 * - sử dụng ở đầu component
 * - không sử dụng if...else
 * - không để trong các hàm khác
 *
 */

/** DemoCookie */
