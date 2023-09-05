// rfc
import React from "react";
import { useDispatch } from "react-redux";
import { setModalAction } from "../../../redux/reducers/modalReducer";
import Login from "../../Login/Login";
import CreateProduct from "./CreateProduct";

export default function ProductManagement(props) {

  const dispatch = useDispatch();
  return (
    <div className="container">
      <h3>ProductManagement</h3>
      <button
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#idmodal`}
        onClick = {()=>{

          const action = setModalAction({
            // Component : Login, // Có thể tạo ra 1 component và có thể truyền component lên redux
            Component : CreateProduct,

            title : 'Create Product'
          })
          // dispatch action lên redux
          dispatch(action);
        }}
      >
        Create Product
      </button>
    </div>
  );
}

// Templates - Admin
// phải tạo action (rxslice - trước - để có mới dispatch lên)
// ? Lúc nào là save của form - lúc nào lad save của create product