// rfc
import React, { useState } from "react";

export default function DemoChonXe() {
  const [imgSrc, setImgSrc] = useState("./img/products/red-car.jpg");

  const handleChangeColor = (color) => {
    setImgSrc(`./img/products/${color}-car.jpg`);
  };
  return (
    <div>
      <h3> Demo Chọn Xe</h3>
      <div className="row">
        <div className="col-6">
          <img src={imgSrc} className="w-100" />
        </div>
        <div className="col-6 mt-5">
          <button
            className="btn btn-danger mx-2"
            onClick={() => {
              handleChangeColor("red");
            }}
          >
            Red
          </button>
          <button
            className="btn btn-dark mx-2"
            onClick={() => {
              handleChangeColor("black");
            }}
          >
            Black
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={() => {
              handleChangeColor("silver");
            }}
          >
            Silver
          </button>
          <button
            className="btn btn-warning mx-2"
            onClick={() => {
              handleChangeColor("steel");
            }}
          >
            Steel
          </button>
        </div>
      </div>
    </div>
  );
}
