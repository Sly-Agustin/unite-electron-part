import React, { Fragment, useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom'

const SpecificGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mods, setMods] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const location = useLocation();
  const { id, name } = location.state;

  useEffect(() => {
    const getMods = async() => {
      try{
        const response = await fetch(`http://localhost:5001/mod/game/${id}`, {
          credentials: 'include'
        });
        const modsJson = await response.json(); 
        setMods(modsJson);
        setIsLoading(false);
      }
      catch(err){
        console.log('Something bad happened, try again later')
        setIsLoading(false);
      }
    }

    if (localStorage.getItem('logged')) {
      setIsLogged(true);
    }

    getMods();
  }, [])
  
  if(isLoading){
    return(
      <Fragment>
        <p>Specific game page</p>
        <p>Name: {name}</p>
        <p>Loading...</p>
      </Fragment>
    )

  }

  return (
    <Fragment>
      <p>Specific game page</p>
      <p>Name: {name}</p>
      {isLogged && <p>Want to upload your mod? <Link className="btn btn-primary" to={`upload`}>yes</Link></p>}
      <div className="container">
        {
          mods.map((mod) => 
            <Link to={`/mod/${mod._id}`}>
              <div className="card" key={mod._id} style={{width: "18rem"}}> 
                <div className="card-body">
                  <h5 className="card-title">{mod.name}</h5> 
                </div>
              </div>
            </Link>
          )
        }
      </div>
    </Fragment>
  )
}

export default SpecificGame;