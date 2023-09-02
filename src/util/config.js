//fie lưu chung của dự án 
// lưu lại token
// localStore
export const configs = {

    setStore: (name, values) => {

        localStorage.setItem(name, values)
    },
    getStore: (name) => {

        return localStorage.getItem(name)

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
    ACCESS_TOKEN: 'accessToken',
    USER_LOGIN: 'userLogin'

}


export const { setStore, getStore, setStoreJSON, getStoreJSON, setCookie, getCookie, ACCESS_TOKEN, USER_LOGIN } = configs;
/** Hàm có thể gọi bất cứ đâu
 *  Hook chỉ gọi được trong FCC
 */