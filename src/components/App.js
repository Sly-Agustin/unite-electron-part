import React, { useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  redirect
} from "react-router-dom";
import AllGames from "./AllGames";
import Login from "./Login"
import Logout from "./Logout";
import Register from "./RegisterAccount"
import SpecificGame from "./SpecificGame";
import Mod from "./Mod";
import UploadMod from "./UploadMod";
import Navbar from "./Navbar";

export const AuthContext = createContext(null);

const App = () => {
  const [isLoggedOn, setIsLoggedOn] = useState(localStorage.getItem('logged'));
  
  return(  
    <AuthContext.Provider value={{isLoggedOn, setIsLoggedOn}}>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} loader={async() => { if(localStorage.getItem('logged')) {return redirect("/games");} }}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/games" element={<AllGames />}></Route>
            <Route path="/games/:id" element={<SpecificGame />}></Route>
            <Route path="/games/:id/upload" element={<UploadMod />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/mod/:id" element={<Mod />}></Route>
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;