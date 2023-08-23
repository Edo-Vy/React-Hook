// rfc
import React,{memo} from "react";

function Comment(props) {
  console.log("comment");
  return (
    <div>
      {/* {props.renderNotify()} */}
      {/* <p>Bạn đã thả like : {props.like}</p> */}
      {props.renderLike()}
      <br />
      <textarea className="w-50 form-control"></textarea>
       <br />
      <button>Gửi</button>
    </div>
  );
}

export default memo(Comment);