import React from 'react'
import authservice from '../../appwrite/auth'
import {useDispatch} from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router'

function LogoutBtn() {
    const dispatch=useDispatch()  
   const navigate=useNavigate()


   

 const logoutHandler=()=>{
    authservice.logout().then(()=>{
                   
        dispatch(logout());
        navigate("/")
    },
    console.log("dispatched logout at logoutbtn")
    ).catch((err)=>{
        console.error(" error loging out : ",err)
    })
         
 }



// the mistake was i call the dispath immediately inside the then without any callback fn.

// In the LogoutBtn component, the logoutHandler function currently dispatches the logout action immediately after calling authservice.logout(), without waiting for authservice.logout() to complete. To ensure that dispatch(logout()) only runs after authservice.logout() finishes, you should use .then() or await with async to handle the asynchronous behavior properly.

// Here’s the corrected component with await syntax and an attached onClick to the button:

  // const logoutHandler = async () => {
  //       try {
  //         await authservice.logout();
  //         dispatch(logout());
  //       } catch (error) {
  //         console.error("Error logging out:", error);
  //       }
  //     };  


  return (
   <button className='inline-block px-6 py-2 text-white duration-200 hover:bg-blue-700 rounded-full' onClick={logoutHandler}>logout</button>
  )
}

export default LogoutBtn
