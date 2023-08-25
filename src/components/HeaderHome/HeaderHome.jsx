// rfc
import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderHome(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          React Hook
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#" aria-current="page">
                Home <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hooks
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <NavLink className="dropdown-item" to="/usestate">
                  UseState Demo
                </NavLink>
                <NavLink className="dropdown-item" to="/useeffect">
                  UseEffect Demo
                </NavLink>
                <NavLink className="dropdown-item" to="/usecallback">
                  UseCallBack Demo
                </NavLink>
                <NavLink className="dropdown-item" to="/usememo">
                  UseMemo Demo
                </NavLink>
                <NavLink className="dropdown-item" to="/useref">
                  UseRef Demo
                </NavLink>
              </div>
            </li>
            {/* === */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Redux
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <NavLink className="dropdown-item" to="/demonumber">
                  Redux Number
                </NavLink>
                <NavLink className="dropdown-item" to="/reduxfacebook">
                  Redux Facebook
                </NavLink>
              </div>
            </li>
            {/* === */}
          </ul>
          <form className="d-flex my-2 my-lg-0">
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

/**
 * RFC không có state, ko có extend từ 1 lớp đối tượng nào hết
 * => ko có thuộc tính state, props
 * => có tham số đầu vào là props ~ this.props : có thể dùng hay ko dùng - nhưng mà cứ khai báo sẵn
 */
