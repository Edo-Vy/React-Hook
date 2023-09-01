// rfc
import React from "react";
import { useFormik } from "formik";
// import yup
import * as Yup from "yup";
import { signinApi } from "../../redux/reducers/userReducer";
import { useDispatch } from 'react-redux'
export default function Login(props) {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      // lấy qua trường name
      email: "",
      password: "",
    },
    // yup
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email không được bỏ trống")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("password không được bỏ trống")
        .min(3, "password từ 3 -32 ký tự")
        .max(32, "password từ 3 -32 ký tự"),
        // .matches(/cyber/,'password phải có cyber')
    }),
    // matches(/cyber/,'password phải có cyber') : regular expression 
    onSubmit: (values) => {
      console.log(values);

      const action = signinApi(values);  // userReducer
      // signinApi : nhận vào giá trị của email và password từ người dùng nhập
      dispatch(action);
    },
  });
  return (
    <div className="container">
      <h3>Demo Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mt-3">
          <p>Email</p>
          <input
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email ? (
            <p className="text text-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}

          {/* onBlur = { formik.handleBlur} : yup khi blur con chuột thì mới hiện ra*/}
        </div>
        <div className="form-group mt-1">
          <p>password</p>
          <input
            className="form-control"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password ? (
            <p className="text text-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-1">
          <button className="btn btn-success" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
/**
 * Thông thường sẽ dùng dùng hàm để định nghĩa handleChange để lấy thông tin từ người dùng nhập vào
 * ipnut ( email, password) và handleSubmit để lấy thông tin nguyên form khi bấm nút submit
 *
 * => dùng formik ( dùng hook của nó )
 * formik sẽ hỗ trợ hàm handleChange và handleSubmit
 */

// https://formik.org/docs/overview
// npm install formik --save
