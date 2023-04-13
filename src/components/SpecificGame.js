import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import noimage from '../assets/no-image-icon.png'
import loadingGif from '../assets/loading.gif'

const SpecificGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mods, setMods] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [gameName, setGameName] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getMods = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_HOST}/mod/game/${id}`, {
          credentials: 'include'
        });
        const modsJson = await response.json(); 
        setMods(modsJson);    
        const responseGame = await fetch(`${process.env.REACT_APP_HOST}/games/${id}`, {
          credentials: 'include'
        });
        const gameJson = await responseGame.json();
        setGameName(gameJson.name);
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
        
        <div className="container d-flex justify-content-center align-content-center">
          <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
        </div>
      </Fragment>
    )

  }

  return (
    <Fragment>
      <p>Specific game page</p>
      <p>Name: {gameName}</p>
      {isLogged && <p>Want to upload your mod? <Link className="btn btn-primary" to={`upload`}>yes</Link></p>}
      <div className="container">
        {
          mods.map((mod) => 
            <Link to={`/mod/${mod._id}`}>
              <div className="card" key={mod._id} style={{width: "18rem"}}> 
                <div className="card-body">
                  {mod.picture && <img src={`${process.env.REACT_APP_HOST}/mod/${mod._id}/picture`} width={200} height={200} alt="couldn't get image"></img>}
                  {!mod.picture && <img src={noimage} width={200} height={200} alt="couldn't get image"></img>}
                  
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