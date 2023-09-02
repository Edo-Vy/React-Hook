// rxslice
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJSON,
  setCookie,
  setStore,
  setStoreJSON,
  USER_LOGIN,
} from "../../util/config";
const initialState = {
  // lấy ra khi load trang (vì khi reload lại trang userLogin sẽ mất, nên sẽ lấy dữ liệu lưu ở Local),
  // khi vừa load trang sẽ đi vào localStorage lấy store fill vào redux
  userLogin: getStoreJSON(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLoginAction: (state, action) => {
      let userLogin = action.payload;
      state.userLogin = userLogin;
    },
  },
});

export const { setUserLoginAction } = userReducer.actions;

export default userReducer.reducer;

/**-----------action api ( Thunk ) */

export const signinApi = (userLogin) => {
  // userLogin = {email:'', password:''}

  return async (dispatch) => {
    try {
      let result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signin",
        method: "POST",
        data: userLogin, // userLogin = {email:'', password:''}
      });

      // thành công
      // lưu lại token
      setStore(ACCESS_TOKEN, result.data.content.accessToken);
      // setCookie
      setCookie(result.data.content.accessToken, 30, ACCESS_TOKEN);

      // console.log(result);
      // Lưu email ( vì khi reload lại trang userLogin sẽ mất, nên sẽ lấy dữ liệu lưu ở Local )
      setStoreJSON(USER_LOGIN, result.data.content); // ( tên, lưu) -- config

      // Đưa userLogin thành công lên reducer
      // result.data.content = { email : '' , accessToken : ''}

      const action = setUserLoginAction(result.data.content);
      dispatch(action);
    } catch (erro) {
      console.log(erro);
    }
  };
};

// call api getProfile
export const getApiProfile = () => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getProfile",
        method: "POST",
        // data : 'Dữ liệu người dùng nhập, chọn, thay đổi'
        headers: {
          Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`, // Nhập vào Bearer [token]
        },
      });
      console.log("Result", result.data.content);

      // Tạo ra actioncreator => dispatch lên redux
      const action = setUserLoginAction(result.data.content);
      dispatch(action);
    } catch (erro) {
      console.log(erro);
    }
  };
};
/*
  Email : khaido@gmail.com - pass : 123
*/

/** Có 2 phần dữ liệu :
 * - Một : dữ liệu người dùng nhập liệu, chọn, thay đổi trên giao diện ( event, click)
 * => Thông thường những phần đó us sẽ đưa vào phần body (data)
 * - Hai : dữ liệu mặc định ( FE gửi đi : token, sẽ không bắt người dùng nhập vào token)
 * => sẽ để vào phầ headers
 * header : là những gì mà dev muốn client tự gửi ( âm thầm gửi )
 */
