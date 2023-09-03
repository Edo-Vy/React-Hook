// rxslice
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJSON,
  http,
  setCookie,
  setStore,
  setStoreJSON,
  USER_LOGIN,
} from "../../util/config";
import { history } from "../../index";
const initialState = {
  // lấy ra khi load trang (vì khi reload lại trang userLogin sẽ mất, nên sẽ lấy dữ liệu lưu ở Local),
  // khi vừa load trang sẽ đi vào localStorage lấy store fill vào redux
  //userLogin: getStoreJSON(USER_LOGIN) : null : khi chưa đăng nhập => ?. để 
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
// Thay axios -> http (config.js)

export const signinApi = (userLogin) => {
  // userLogin = {email:'', password:''}

  return async (dispatch) => {
    try {
      // let result = await axios({
      //   url: "https://shop.cyberlearn.vn/api/Users/signin",
      //   method: "POST",
      //   data: userLogin, // userLogin = {email:'', password:''}
      // });
      let result = await http.post('/Users/signin', userLogin);

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

      // Sau khi verify tài khoản thành công, lưu vào localStorage -> đúng -> chuyển hướng
      // import history (index.js)
      history.push('/profile'); // chuyển hướng -> trang .... :  history.push('route')
    } catch (erro) {
      console.log(erro);
      alert('Tài khoản - Mật khẩu không đúng !');
      // Verify tài khoản không thành công -> chuyển trang 
      history.push('/login')
    }
  };
};

// call api getProfile
// export const getApiProfile = () => {
//   return async (dispatch) => {
//     try {
//       let result = await axios({
//         url: "https://shop.cyberlearn.vn/api/Users/getProfile",
//         method: "POST",
//         // data : 'Dữ liệu người dùng nhập, chọn, thay đổi'
//         headers: {
//           Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`, // Nhập vào Bearer [token]
//         },
//       });
//       console.log("Result", result.data.content);

//       // Tạo ra actioncreator => dispatch lên redux
//       const action = setUserLoginAction(result.data.content);
//       dispatch(action);
//     } catch (erro) {

//       // Token không hợp lệ
//       alert(' Đăng nhập để vào trang này !');
//       // 
//       history.push('/login');
//       console.log(erro);

//     }
//   };
// };

//==== Thay vì dùng axios -> http (config.js)
export const getApiProfile = () => {
  return async (dispatch) => {
    try {
      let result = await http.post('/Users/getProfile'); //http.method('/url chuỗi phía sau', data)
      
      console.log("Result", result.data.content);

      // Tạo ra actioncreator => dispatch lên redux
      const action = setUserLoginAction(result.data.content);
      dispatch(action);
    } catch (erro) {

      // Token không hợp lệ
      alert(' Đăng nhập để vào trang này !');
      // 
      history.push('/login');
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

/** Để can thiệp vào chuyển hướng trang ở 1 file mà không phải component thì bắt
 * buộc phải cấu hình lại <BrowserRouter> (index.js)
 *
 * ex: Verify tài khoản Login (Login.jsx) sau khi đăng nhập Api ( userReducer.jsx - getApiProfile :
 * là 1 file action, 1 hàm bình thường nhưng mình muốn chuyển trang thì ntn ???  ). Thông thường sẽ
 * dùng hook useNavigate : useNavigate chỉ dùng trong RFC.
 * -> userReducer.jsx - getApiProfile : chỉ là 1 action, hàm nên không dùng useNavigate được
 * => cài thư viện history
 * ===> Sau khi cài (npm i history) thành công -> tạo ra 1 biến để quản lý chuyển hướng trang  ( index.js), biến này
 * không phải là hook, mà là biến bình thường, giúp chuyển hướng trang trong react. Biến này có thể
 * chuyển hướng trang được ở những trang (file) không phải là component
 * */

// npm i history
