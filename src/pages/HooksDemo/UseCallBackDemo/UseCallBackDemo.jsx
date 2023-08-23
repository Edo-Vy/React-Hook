// rfc
import React, { useCallback, useState } from "react";
import Comment from "./Comment";

export default function UseCallBackDemo() {
  const [like, setLike] = useState(1);
  const [number, setNumber] = useState(1);

  const renderLike = () =>{
    return  <p>Bạn đã thả like : {like}</p>
  }
  /**
   * Hàm useCallBack sẽ cache lại hàm renderLike sau mỗi lần setState render
   * chỉ tạo mới hàm renderLike khi like thay đổi
   */
  const renderLikeCallBack = useCallback(renderLike,[like]);
  return (
    <div className="container">
      <h3>Demo CallBack</h3>
      <div className="m-5">
        Like : {like} ♥ - Member :{number}
        <button
          onClick={() => {
            setNumber(number + 1);
          }}
        >+</button>
        <br />
        <span
          style={{ cursor: "pointer", color: "red", fontSize: 35 }}
          onClick={() => {
            setLike(like + 1);
          }}
        >
          ♥
        </span>
        <br />
        <br />
        {/* <Component renderNotify={renderNotify} /> */}
        {/* <Comment like={like} /> */}
        <Comment renderLike={renderLikeCallBack} />
      </div>
    </div>
  );
}
