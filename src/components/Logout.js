import React, { Fragment, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./App";

const Logout = () => {
  const [hasLoggedOut, setHasLoggedOut] = useState(false); 
  const {setIsLoggedOn} = useContext(AuthContext);
  
  useEffect(()=>{
    const serverLogout = async () => {
      const logout = await fetch(`${process.env.REACT_APP_HOST}/auth/signout`, {
        method: "POST",
        credentials: 'include',
      })
      if(logout.ok){
        localStorage.removeItem('logged')
        localStorage.removeItem('userId')
        setIsLoggedOn(false);
        setHasLoggedOut(true);
      }
    }
  
    serverLogout();
  }, [])

  return(
  <Fragment>
    <p>Logging out...</p>
    {hasLoggedOut && <Navigate replace to="/" />}
  </Fragment>)
}

export default Logout