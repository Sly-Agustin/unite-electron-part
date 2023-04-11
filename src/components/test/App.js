import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Inicio from './Inicio'

const App = () => {

  return(
    <Router>
      <div className="container">
        <div className="btn-group">
          <Link to="/" className="btn btn-dark">Inicio</Link>
          <Link to="/user" className="btn btn-dark">user</Link>
        </div>
        <hr />
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/user"></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;