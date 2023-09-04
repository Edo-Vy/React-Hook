// rfc
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminTemplates(props) {  // props.component
  return (
    <div>
        <h3 style={{backgroundColor :'gray', color:'white', height:'50px'}}>Admin Template</h3>
        <div className='d-flex'>
            <div className='dashboard w-25 bg-dark' style={{minHeight: '100vh'}}>
                <img src='https://i.pravatar.cc?u=9' alt='' width={50} height={50}
                 className ="rounded-circle" style={{objectFit:'cover'}}/>
                <nav className='mt-5'>
                    <div>
                        <NavLink to='/products'>Product Management</NavLink>
                        <br/>
                        <NavLink to='/users'>User Management</NavLink>
                    </div>
                </nav>
            </div>
            <div className='component-content w-75'>
                <props.Component/>
            </div>
        </div>
    </div>
  )
}
