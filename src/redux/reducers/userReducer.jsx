// rxslice
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACCESS_TOKEN, setCookie, setStore } from "../../util/config";
const initialState = {
  userLogin: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
});

export const {} = userReducer.actions;

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
      setCookie(result.data.content, 30, ACCESS_TOKEN);

      console.log(result);

    } catch (erro) {
      console.log(erro);
    }
  };
};

/*
  Email : khaido@gmail.com - pass : 123
*/
