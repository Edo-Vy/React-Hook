// rxslice
import { createSlice } from "@reduxjs/toolkit";

const ComponentDefault = (props) => {
  return <div>Default Value</div>;
};
const initialState = {
  // Dữ liệu ở đây không phải là {}, [] nữa mà là component
  Component: ComponentDefault,
  title: "title",
  submitForm: () => {
    alert("Submit form");
  },
};

const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    setModalAction: (state, action) => {
      // payload : Component, title

      // Lấy state từ payload ra
      const { Component, title } = action.payload;
      state.Component = Component;
      state.title = title;
    },
    setSubmitAction: (state, action) => {
      // payload : action submit form
      state.submitForm = action.payload;
    },
  },
});

export const { setModalAction, setSubmitAction } = modalReducer.actions; // nhớ export ra

export default modalReducer.reducer;

// component : có thể là 1 file, hàm

/** Bản chất component không thể nhìn qua được devtool - redux devtool
 * Vì : redux devtool chỉ nhìn được những dữ liệu : ob, arr còn function không nhìn được , nó
 * giống như localStorage ( không thể nhìn thấy nhưng mà bản chất nó vẫn có )
 * component là 1 function
 */
