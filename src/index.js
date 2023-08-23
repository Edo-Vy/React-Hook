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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path='' element={<App/>}>
        {/* Đặt thẻ <Outlet/> bên thẻ App.js để link tới path con */}
        <Route path='usestate' element={<UseStateDemo/>}></Route>
        <Route path='useeffect' element={<UseEffectDemo/>}></Route>
        <Route path='usecallback' element={<UseCallBackDemo/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

//  <React.StrictMode> : ràng buộc những nguyên tắc code cho đúng, code hosting dễ gây ra hay báo lỗi