import React, { Fragment, useContext } from "react";
import {
  Link,
} from "react-router-dom";
import { AuthContext } from "./App";

const Navbar = () => {
  const valContext = useContext(AuthContext);
  const {isLoggedOn, setIsLoggedOn} = useContext(AuthContext);
  console.log('value of valContext? '+valContext.isLoggedOn);
  console.log('value of valContext with useContext? '+isLoggedOn);
  return(
    <Fragment>
      <div className="btn-group">
        <Link to="/" className="btn btn-dark">Index</Link>
        <Link to="/games" className="btn btn-dark">Games</Link>
        <Link to="/register" className="btn btn-dark">Register</Link>
        <Link to="/login" className="btn btn-dark">Login</Link>
        {isLoggedOn && <Link to="/logout" className="btn btn-dark">Logout</Link>}
      </div>
      <hr />   
    </Fragment>
  )
}

export default Navbar