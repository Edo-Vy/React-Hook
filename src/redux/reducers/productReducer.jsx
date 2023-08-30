// rxslice
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  arrProduct: [],
  proDetail: {},
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setArrProductAction: (state, action) => {
      // Lấy dữ liệu từ payload component dispatch lên
      const arrProducts = action.payload;
      // Cập nhật lại state
      state.arrProduct = arrProducts;
    },
    setProDetailAtion : (state, action) =>{
       // Lấy dữ liệu từ payload component dispatch lên
       const productDetails = action.payload;
       // Cập nhật lại state
       state.proDetail = productDetails;
    }
  },
});

export const { setArrProductAction, setProDetailAtion } = productReducer.actions; // nhớ export setArrProductAction ra

export default productReducer.reducer;

//------------------------ action api-------------
export const getApiProductAction = async (dispatch2) => {
  // action loại 2 là hàm chứ không phải object nữa
  try {
    // bắt lỗi
    let result = await axios({
      url: "https://shop.cyberlearn.vn/api/Product",
      method: "GET",
    });
    console.log("Kết Quả", result.data.content);
    // dispatch lên redux   (producteducer.jsx)
    const action = setArrProductAction(result.data.content);
    /*
          action : {
              type: 'productReducer/setArrProductAction',
              payload : result.data.content
          }
      */
    // sau khi thực thi có dữ liệu -> dispatch 2 -> đưa lên redux
    dispatch2(action); // đưa kết quả lên redux
  } catch (erro) {
    console.log(erro);
  }
};

//---------- action có chứa tham số ----- Detail
// closure function
export const getApiProductDetailAction = (idProduct) => {
  return async (dispatch) => {
    // logic api gọi tại đây
    try {
      // bắt lỗi
      let result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id= ${idProduct}` ,
        method: "GET",
      });
      console.log("Kết Quả", result.data.content);

      // Sau khi có dữ liệu gửi lên  action loại 1 đưa lên reducer
      const actionLoai1 = setProDetailAtion( result.data.content);
      dispatch(actionLoai1);
      
    } catch (erro) {
      console.log(erro);
    }
  };
};
// middleware
