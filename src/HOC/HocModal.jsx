// Viết HOC đơn giản hơn - container component

import React from "react";
import { useSelector } from "react-redux";

export default function HocModal(props) {
  // Lấy dữ liệu từ redux thông qua useSelector
  const { title, Component, submitForm } = useSelector((state) => state.modalReducer);
  return (
    <div>
      <div>
        {/* Modal trigger button */}
        {/* <button
          type="button"
          className="btn btn-primary btn-lg"
          data-bs-toggle="modal"
          // data-bs-target={`#${props.id}`}
          data-bs-target={`#idmodal`}
        >
          Launch
        </button> */}
        {/* Modal Body */}
        {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
        <div
          className="modal fade"
          // id={props.id}
          id="idmodal"
          tabIndex={-1}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                {/* props JSX */}
                <h5 className="modal-title" id="modalTitleId">
                  {/* {props.title} */}
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              {/* truyền Component */}
              <div className="modal-body">
                {/* <props.Component /> */}
                <Component />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={submitForm}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Optional: Place to the bottom of scripts */}
      </div>
    </div>
  );
}
