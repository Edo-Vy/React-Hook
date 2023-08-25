/**
 *  rfc  khác rafc
 * rafc : là arrfun ko hỗ trợ con trỏ this => nên sử dụng -> vì react component ko xài this
 * rfc : đôi lúc hỗ trợ con trỏ this
 */

// rafc
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../../redux/reducers/facebookReducer";

export const DemoFaceBookApp = (props) => {
  // Lấy dữ liệu về
  const { arrComment } = useSelector((state) => state.facebook); // bóc tách phần tử

  const userComment = useRef({ name: "", content: "" });
  // Đưa dữ liệu lên
  const dispatch = useDispatch();
  const renderComment = () => {
    return arrComment.map((item, index) => {
      return (
        <div className="d-flex" key={index}>
          <div className="avatar" style={{ width: 50 }}>
            <img
              src={`https://i.pravatar.cc?${item.name}`}
              alt=""
              className="w-100"
            />
          </div>
          <div className="content mx-3">
            <h5 className="text-danger">{item.name}</h5>
            <p>{item.content}</p>
          </div>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    userComment.current[id] = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // chặn sự kiện reload browser
    // Gửi dữ liệu lên redux
    let newComment = { ...userComment.current }; // clone ra trước khi push lên
    const action = addComment(newComment);
    /**
     *  action = {
     *        type :'facebookReducer'
     *        payload : { name: "", content: "" }
     * }
     */
    dispatch(action);
  };
  return (
    <form className="container mt-2" onSubmit={handleSubmit}>
      <h3> Demo FaceBook App</h3>
      <div className="card mt-3">
        <div className="card-header">
            {renderComment()}
        </div>
        <div className="card-body">
          <div className="form-group">
            <p>Name</p>
            <input className="form-control" id="name" onChange={handleChange} />
          </div>
          <div className="form-group">
            <p>Content</p>
            <input
              className="form-control"
              id="content"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <button className="btn btn-success" type="submit">
              Send
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

/**
 *  name và content ko có Validation nên có thể dùng useRef thay cho useState
 * img + name + content sẽ đem lên redux store lưu trữ => reducer ( slice)
 */

/**
 *  Bản chất useRef ko tạo mới sau mỗi lần render -> arrComment trong mảng vs bên ngoài là 1
 * ob là prevent value nên khi push vô ( push 2 nhưng chỉ có 1) => ko có thay đổi gì hết, vẫn thêm
 * dữ liệu UseRef nhưng là của {} trước => clone ra trước khi push
 */
