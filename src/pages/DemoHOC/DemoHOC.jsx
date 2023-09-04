// rfc
import React from "react";
import HocModal from "../../HOC/HocModal";
import ModalHOC from "../../HOC/ModalHOC";
import UseStateDemo from "../HooksDemo/UseStateDemo/UseStateDemo";
import Login from "../Login/Login";

// Tạo ra Component từ HOC
let WrapFormLoginModal = ModalHOC(Login, 'Login');
let WrapUseStateDemoModal = ModalHOC(UseStateDemo, 'UseState');
export default function DemoHOC() {

  return <div>
      {/* ModalHOC.jsx */}
      {/* <WrapFormLoginModal/>
      <WrapUseStateDemoModal/> */}

      {/* ======= HocMoad.jsx */}
      <HocModal Component = {Login} id="modal-1" title = {
          <h1 className="text-danger">Login</h1>
      }/>
      
      <HocModal Component = {UseStateDemo}  id="modal-2"  title = {
          <h1 className="text-danger">UseState</h1>
      }/>
  </div>;
}

/** Muốn sử dụng HOC
 *  - Tạo ra Component từ HOC
 */

/**
 * Function.Rc ( React function component ) => <props.Component/>
 * JSXElement : <Login/>, <Component..../> => {props.Component}
 */