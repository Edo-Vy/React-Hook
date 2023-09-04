// HOC : higher order component

//rfc
import React from "react";

export default function ModalHOC(Component, idModal) {
  // nhận vào tham số là component
  /* Thay vì return về JSX thì sẽ return về function (props) trong function đó là component nên sẽ nhận vào
   props và sau đó return (trả về ) về JSX 
  */
  //   return (
  //     <div>ModalHOC</div>
  //   )

  return function (props) {
    return (
      <div>
        <div>
          {/* Modal trigger button */}
          <button
            type="button"
            className="btn btn-primary btn-lg"
            data-bs-toggle="modal"
            data-bs-target={`#${idModal}`}
          >
            Launch
          </button>
          {/* Modal Body */}
          {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
          <div
            className="modal fade"
            id={idModal}
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
                  <h5 className="modal-title" id="modalTitleId">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                {/* Hiện ra Modal */}
                <div className="modal-body">
                    <Component/>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Optional: Place to the bottom of scripts */}
        </div>
      </div>
    );
  };
}


// Component này không có Route vì chỉ để tái sử dụng lại thôi
// Tái sử dụng lại 1 giao diện 