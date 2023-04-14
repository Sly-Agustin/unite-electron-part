import React, { Fragment, useContext } from "react";
import {
  Link,
} from "react-router-dom";
import { AuthContext } from "./App";

const Navbar = () => {
  const {isLoggedOn} = useContext(AuthContext);
  return(
    <Fragment>
      <div className="btn-group">
        <Link to="/" className="btn btn-dark">Index</Link>
        <Link to="/games" className="btn btn-dark">Games</Link>
        {!isLoggedOn && <Link to="/register" className="btn btn-dark">Register</Link>}
        {!isLoggedOn && <Link to="/login" className="btn btn-dark">Login</Link>}
        {isLoggedOn && <Link to="/logout" className="btn btn-dark">Logout</Link>}
      </div>
      <hr />   
    </Fragment>
  )
}

export default Navbar