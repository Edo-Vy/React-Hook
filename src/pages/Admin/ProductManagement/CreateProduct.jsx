// rfc
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setSubmitAction } from "../../../redux/reducers/modalReducer";
export default function CreateProduct() {
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      price: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const dispatch = useDispatch();
  // Ngay tại lúc create user - có lifecycle sau khi giao diện render xong => useEffect
  // Mỗi lần form open lên thì render giao diện đồng thời chạy vào useEffect
  // Phải bắt ở lifecycle, ko bắt ở component UserProductMagement được vì trên giao diện đó không chứa hàm submit, 
  // phải bắt ở đây onload lên, khi onload lên sẽ bắt được sự kiện submit của form
  useEffect(() => {
    const action = setSubmitAction(formik.handleSubmit);
    dispatch(action);
  }, []);

  return (
    <form>
      <div className="form-group" onSubmit={formik.handleSubmit}>
        <p>Id</p>
        <input
          className="form-control"
          id="id"
          name="id"
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-group">
        <p>Name</p>
        <input
          className="form-control"
          id="name"
          name="name"
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-group">
        <p>Price</p>
        <input
          className="form-control"
          id="price"
          name="price"
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <button className="btn btn-success">Create</button>
      </div>
    </form>
  );
}
