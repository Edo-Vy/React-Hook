//fie lưu chung của dự án
import axios from "axios";
import { history } from "../index";
// lưu lại token
// localStore

export const configs = {
  setStore: (name, values) => {
    localStorage.setItem(name, values);
  },
  getStore: (name) => {
    return localStorage.getItem(name);
  },
  setStoreJSON: (name, values) => {
    // Biến đổi thành chuỗi
    values = JSON.stringify(values);
    // Lưu vào store
    localStorage.setItem(name, values);
  },
  getStoreJSON: (name) => {
    if (localStorage.getItem(name)) {
      let content = JSON.parse(localStorage.getItem(name));
      return content;
    }
    return null;
  },
  setCookie: (value, days = 30, name) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  clearCookie: (name) => {
    setCookie("", -1, name);
  },
  clearLocalStorage: (name) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
};

export const {
  setStore,
  getStore,
  setStoreJSON,
  getStoreJSON,
  setCookie,
  getCookie,
  clearCookie,
  clearLocalStorage,
  ACCESS_TOKEN,
  USER_LOGIN,
} = configs;
/** Hàm có thể gọi bất cứ đâu
 *  Hook chỉ gọi được trong FCC
 */

/* Cấu hình interceptor ( Cấu hình cho các request : gửi đi và response : lấy về - kết quả trả về )
     - import axios
     - tạo ra đối tượng http : sẽ có thuộc tính 
        + baseURL : `url`, : nếu như có đổi domain thì không cần phải đi fix lại từng file
        + timeout : thời gian thực hiện request tối đa : mili giây (ms)
 */

export const http = axios.create({
  baseURL: `https://shop.cyberlearn.vn/api`,
  timeout: 6000, // sau 6s
});

/** Cấu hình request
 * http.interceptors.request.use sẽ có 2 hàm
 *    - configs : kết quả, sẽ bao gồm có body(payload), data, headers gửi đi, cấu hình cho tất cả api
 *    - err : lỗi
 */

http.interceptors.request.use(
  (configs) => {
    // Cấu hình tất cả headers add thêm thuộc tính  Authorization

    configs.headers = {
      ...configs.headers,
      ["Authorization"]: `Bearer ${getStore(ACCESS_TOKEN)}`,
    };

    return configs;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/** Cấu hình response
 * statuscode : mã kết quả trả về do backend quy định
 *  - 200 (Success) : kết quả trả về thành công
 *  - 201 (Created) : tạo giá trị thành công trên server ( thường dùng 200 )
 *  - 400 (Bad Resquest) : không tồn tại đường dẫn
 *  - 404 (Not Found) : không tìm thấy dữ liệu
 *  - 401 (UnAuthorization) : không có quyền truy cập vào api
 *  - 403 (Forbiden) : Token chưa đủ quyền truy cập
 *  - 500 (Error in Server) : lỗi xảy ra trên server ( Nguyên nhân do FE hoặc BE tùy tình huống )
 * ......
 */

http.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    // const originalRequest = err.configs;
    console.log(err.response.status);
    if (err.response.status === 400 || err.response.status === 404) {
      history.push("/");
      return Promise.reject(err);
    }

    if (err.response.status === 401 || err.response.status === 403) {
      alert("Token không hợp lệ - Vui lòng đăng nhập lại !");
      history.push("/login");
      return Promise.reject(err);
    }
  }
);
