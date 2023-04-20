import React, { Fragment, useContext } from "react";
import {
  Link,
} from "react-router-dom";
import { AuthContext } from "./App";
import joystick from "../assets/joystickInverted.png"
import home from "../assets/home.svg"
import joystickGames from "../assets/joystickGames.svg"
import signin from "../assets/signin.svg"
import signout from "../assets/signout.svg"
import register from "../assets/register.svg"

const Navbar = () => {
  const {isLoggedOn} = useContext(AuthContext);
  return(
    <Fragment>
      <hr />   
      <div className="d-flex flex-column flex-shrink-0" style={{width: 6.5+'rem'}}>
        <a href="/" className="d-block p-3 link-dark text-decoration-none" >
          <img src={joystick} width={70} height={70}></img>
        </a>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li className="nav-item"><Link to="/" className="btn btn-dark"><img src={home} width={40} height={40}></img></Link></li>
          <li className="nav-item"><Link to="/games" className="btn btn-dark"><img src={joystickGames} width={40} height={40}></img></Link></li>
          <li className="nav-item">{!isLoggedOn && <Link to="/register" className="btn btn-dark"><img src={register} width={40} height={40}></img></Link>}</li>
          <li className="nav-item">{!isLoggedOn && <Link to="/login" className="btn btn-dark"><img src={signin} width={40} height={40}></img></Link>}</li>
          <li className="nav-item">{isLoggedOn && <Link to="/logout" className="btn btn-dark"><img src={signout} width={40} height={40}></img></Link>}</li>
        </ul>
      </div>
      <div class="vr border border-light " style={{'min-height': 100+'vh'}}></div>
    </Fragment>
  )
}

export default Navbar