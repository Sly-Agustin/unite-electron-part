import React, { Fragment, useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom'
import noimage from '../assets/no-image-icon.png'
import loadingGif from '../assets/loading.gif'

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
        <div className="container d-flex justify-content-center align-content-center">
          <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
        </div>
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
                  <img src={`${process.env.REACT_APP_HOST}/mod/${mod._id}/picture`} onError=
                  {
                    (currentTarget) => {
                      currentTarget.target.onerror = null;
                      currentTarget.target.src = noimage;
                    }
                  } width={200} height={200}></img>
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