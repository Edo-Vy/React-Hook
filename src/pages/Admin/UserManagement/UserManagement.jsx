// rfc
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux'
import { setModalAction } from '../../../redux/reducers/modalReducer'
import CreateUser from './CreateUser'

export default function UserManagement(props) {

  const dispatch = useDispatch();

 
  return (
    <div className="container">
    <h3>UserManagement</h3>
    <button
      className="btn btn-warning"
      data-bs-toggle="modal"
      data-bs-target={`#idmodal`}
      onClick = {()=>{

        const action = setModalAction({
          
          Component : CreateUser,
          title : 'Create User'
          
        })

        dispatch(action);
      }}
    >
      Create User
    </button>
  </div>
  )
}


// Templates - Admin
// phải tạo action (rxslice - trước - để có mới dispatch lên)