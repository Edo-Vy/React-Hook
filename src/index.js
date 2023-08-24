import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Cấu hình BrowserRouter
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UseStateDemo from './pages/HooksDemo/UseStateDemo/UseStateDemo';
import UseEffectDemo from './pages/HooksDemo/UesEffectDemo/UseEffectDemo';
import UseCallBackDemo from './pages/HooksDemo/UseCallBackDemo/UseCallBackDemo';
import UseMemoDemo from './pages/HooksDemo/UseMemoDemo/UseMemoDemo';
import UseRefDemo from './components/HeaderHome/UseRefDemo/UseRefDemo';
// setup redux
import { Provider } from 'react-redux'
import { store } from './redux/configStore';
import DemoUseNumber from './pages/HooksDemo/UseRedux/DemoUseNumber/DemoUseNumber';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />}>
          {/* Đặt thẻ <Outlet/> bên thẻ App.js để link tới path con */}
          <Route path='usestate' element={<UseStateDemo />}></Route>
          <Route path='useeffect' element={<UseEffectDemo />}></Route>
          <Route path='usecallback' element={<UseCallBackDemo />}></Route>
          <Route path='usememo' element={<UseMemoDemo />}></Route>
          <Route path='useref' element={<UseRefDemo />}></Route>
          <Route path='demonumber' element={<DemoUseNumber/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();

//  <React.StrictMode> : ràng buộc những nguyên tắc code cho đúng, code hosting dễ gây ra hay báo lỗi