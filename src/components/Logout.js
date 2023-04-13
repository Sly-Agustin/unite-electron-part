import React, { Fragment, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false); 
  
  const logOut = useEffect(()=>{
    const serverLogout = async () => {
      const logout = await fetch(`${process.env.REACT_APP_HOST}/auth/signout`, {
        method: "POST",
        credentials: 'include',
      })
      if(logout.ok){
        localStorage.removeItem('logged')
        localStorage.removeItem('userId')
        setLoggedOut(true);
      }
    }
  
    serverLogout();
  }, [])

  return(
  <Fragment>
    <p>Logging out...</p>
    {loggedOut && <Navigate replace to="/" />}
  </Fragment>)
}

export default Logout