import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  redirect
} from "react-router-dom";
import AllGames from "./AllGames";
import Login from "./Login"
import Register from "./RegisterAccount"
import SpecificGame from "./SpecificGame";
import Mod from "./Mod";

const App = () => {
  return(
    <Router>
      <div className="container">
        <div className="btn-group">
          <Link to="/" className="btn btn-dark">Inicio</Link>
          <Link to="/games" className="btn btn-dark">Juegos</Link>
          <Link to="/register" className="btn btn-dark">Registrarse</Link>
        </div>
        <hr />
        <Routes>
          <Route path="/login" element={<Login />} loader={async() => { if(localStorage.getItem('logged')) {return redirect("/games");} }}></Route>
          <Route path="/games" element={<AllGames />}></Route>
          <Route path="/games/:id" element={<SpecificGame />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/mod/:id" element={<Mod />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;